import { getServers, getServerDetails } from './pterodactylAPI';
import { sftpOperation } from './sftpClient';
import { config } from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';

config();

const HIERARCHY_MASTER_DIR = process.env.HIERARCHY_MASTER_DIR;

export async function fetchAndUpdateServers() {
    const servers = await getServers();

    for (const server of servers) {
        const serverDetails = await getServerDetails(server.id);
        const hierarchyId = serverDetails.external_id;

        if (isValidHierarchyId(hierarchyId)) {
            const localFolder = getLocalFolderForHierarchyId(hierarchyId);
            await updateServerFiles(serverDetails, localFolder);
        }
    }
}

function isValidHierarchyId(hierarchyId: string): boolean {
    // A hierarchyId is considered valid if it doesn't start with a period
    return !hierarchyId.startsWith('.');
}

function getLocalFolderForHierarchyId(hierarchyId: string): string {
    // Maps hierarchyId to a local folder by joining it with the HIERARCHY_MASTER_DIR
    return path.join(HIERARCHY_MASTER_DIR, hierarchyId);
}

async function updateServerFiles(serverDetails: any, localFolder: string) {
    await sftpOperation(serverDetails.sftp_details.ip, serverDetails.sftp_details.port, serverDetails.identifier, async (sftp) => {
        // Recursively uploads the files in the localFolder to the server's SFTP path
        await uploadDirectory(serverDetails, localFolder, serverDetails.sftp_path);
    });
}

// @ts-ignore I imported the lib idk why it's complaining
async function uploadDirectory(sftp: Client.SFTPWrapper, localFolder: string, remoteFolder: string): Promise<void> {
    if (!fs.existsSync(localFolder)) {
        throw new Error(`Local folder not found: ${localFolder}`);
    }

    const files = fs.readdirSync(localFolder);

    for (const file of files) {
        const localPath = path.join(localFolder, file);
        const remotePath = path.join(remoteFolder, file);
        const stats = fs.statSync(localPath);

        if (stats.isFile()) {
            await new Promise<void>((resolve, reject) => {
                sftp.fastPut(localPath, remotePath, (err) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve();
                    }
                });
            });
        } else if (stats.isDirectory()) {
            try {
                await new Promise<void>((resolve, reject) => {
                    sftp.mkdir(remotePath, (err) => {
                        if (err && err.code !== 4) {
                            reject(err);
                        } else {
                            resolve();
                        }
                    });
                });
            } catch (error) {
                console.error(`Error creating remote directory ${remotePath}:`, error);
            }

            await uploadDirectory(sftp, localPath, remotePath);
        }
    }
}
