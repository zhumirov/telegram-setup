import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

const TOKEN = process.env.DEBUG_BOT_TOKEN;
const CHAT_ID = process.env.DEV_CHAT_ID;

export const logMessage = (type, message) => {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${type.toUpperCase()}: ${message}`);
};

export const logError = async (message) => {
    logMessage('error', message);
};

export const logErrorToAdminTG = async (message) => {
    logMessage('error', message);
    await notifyAdminTelegram(`ERROR: ${message}`);
};

export const logInfo = (message) => {
    logMessage('info', message);
};

// Function to notify via Telegram
export const notifyAdminTelegram = async (message) => {
    const url = `https://api.telegram.org/bot${TOKEN}/sendMessage`;

    const body = {
        chat_id: CHAT_ID,
        text: message,
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });

        if (!response.ok) {
            throw new Error(`Telegram API error: ${response.statusText}`);
        }
    } catch (error) {
        console.error('Failed to send notification to Telegram:', error);
    }
};