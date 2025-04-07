'use server';

// import { deleteProductById } from '@/lib/db';
import { revalidatePath } from 'next/cache';

export async function deleteProduct(formData: FormData) {
  // let id = Number(formData.get('id'));
  // await deleteProductById(id);
  // revalidatePath('/');

}

export async function sendUserDataToWebhook(userData: { name: string, email: string }): Promise<boolean> {
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
