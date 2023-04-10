import { Client } from 'ssh2';
import { config } from 'dotenv';

config();

const PTERODACTYL_USERNAME = process.env.PTERODACTYL_USERNAME;
const PTERODACTYL_PASSWORD = process.env.PTERODACTYL_PASSWORD;

export async function sftpOperation(sftp_host: string, sftp_port: number, identifier: string, operation: (sftp: Client.SFTPWrapper) => Promise<void>): Promise<void> {
    return new Promise((resolve, reject) => {
        const client = new Client();
        client.on('ready', () => {
            client.sftp(async (err, sftp) => {
                if (err) {
                    reject(err);
                } else {
                    try {
                        await operation(sftp);
                        resolve();
                    } catch (error) {
                        reject(error);
                    } finally {
                        client.end();
                    }
                }
            });
        }).connect({
            host: sftp_host,
            port: sftp_port,
            username: PTERODACTYL_USERNAME + '.' + identifier, // TODO: this looks silly?
            password: PTERODACTYL_PASSWORD,
        });
    });
}
