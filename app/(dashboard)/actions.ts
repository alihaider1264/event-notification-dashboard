'use server';

// import { deleteProductById } from '@/lib/db';
import { revalidatePath } from 'next/cache';


export async function sendUserDataToWebhook(userData: { name: string; email: string }): Promise<boolean> {
 
    const WEBHOOK_URL = process.env.WEBHOOK_URL;

    if (!WEBHOOK_URL) {
        console.error('WEBHOOK_URL environment variable is not set.');
        return false;
    }

    try {
        const response = await fetch(WEBHOOK_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData)
        });
        return response.ok;
    } catch (error) {
        console.error('Error sending user data to webhook:', error);
        return false;
    }
}

export async function getMembersFromWebhook(): Promise<any[]> {
    const MEMBERS_WEBHOOK_URL = process.env.MEMBERS_WEBHOOK_URL;
    try {
        const response = await fetch(MEMBERS_WEBHOOK_URL as string);
        if (!response.ok) {
            console.error('Error fetching members from webhook:', response.status, response.statusText);
            return [];
        }
        const data = await response.json();
        if (!Array.isArray(data)) {
            console.error('Invalid response format from webhook:', data);
            return [];
        }
        return data.map((item: any) => ({
            id: item[0],
            name: item[1],
            email: item[2],
            status: item[3] === "0" ? 'inactive' : item[3] === "1" ? 'active' : 'archived',
        }));
    } catch (error: any) {
        console.error('Error fetching members from webhook:', error);
        return [];
    }
    
}
