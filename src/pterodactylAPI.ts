import axios from 'axios';

const PTERODACTYL_API_KEY = process.env.PTERODACTYL_API_KEY;
const PTERODACTYL_PANEL_URL = process.env.PTERODACTYL_PANEL_URL;

const api = axios.create({
    baseURL: PTERODACTYL_PANEL_URL,
    headers: {
        'Authorization': `Bearer ${PTERODACTYL_API_KEY}`,
        'Content-Type': 'application/json',
        'Accept': 'application/vnd.pterodactyl.v1+json',
    },
});

export async function getServers(): Promise<any[]> {
    try {
        const response = await api.get('/api/application/servers');
        return response.data.data;
    } catch (error) {
        console.error('Error fetching servers:', error);
        throw error;
    }
}

export async function getServerDetails(serverId: string): Promise<any> {
    try {
        const response = await api.get(`/api/application/servers/${serverId}`);
        return response.data.attributes;
    } catch (error) {
        console.error(`Error fetching server details for server id ${serverId}:`, error);
        throw error;
    }
}
