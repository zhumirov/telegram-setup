import Message from "../models/Message.js";
import { logInfo, logError } from "../utils/logger.js";

const constructMessageMiddleware = async (ctx, next) => {
    try {
        const user = ctx.state.user;
        const chatId = user.chatId;
        const messageType = ctx.state.messageType; // Use the message type from state

        let content = '';
        if (ctx.message) {
            content = ctx.message.text || ctx.message.caption || '';
        } else if (ctx.callbackQuery) {
            content = ctx.callbackQuery.data;
        } else if (ctx.update.my_chat_member) {
            content = JSON.stringify(ctx.my_chat_member);
        }

        const messageId = ctx.message?.message_id || ctx.callbackQuery?.message?.message_id || null;        
        const date = ctx.message?.date || ctx.update.my_chat_member?.date || Date.now();
        const fileSize = ctx.message?.photo?.[ctx.message?.photo.length - 1]?.file_size ||
                         ctx.message?.video?.file_size ||
                         ctx.message?.audio?.file_size ||
                         ctx.message?.document?.file_size ||
                         ctx.message?.voice?.file_size ||
                         ctx.message?.animation?.file_size ||
                         null;
        const fileId = ctx.message?.photo?.[ctx.message?.photo.length - 1]?.file_id ||
                        ctx.message?.video?.file_id ||
                        ctx.message?.audio?.file_id ||
                        ctx.message?.document?.file_id ||
                        ctx.message?.voice?.file_id ||
                        ctx.message?.animation?.file_id ||
                        null;

        const fileName = ctx.message?.photo?.[ctx.message?.photo.length - 1]?.file_name ||
                        ctx.message?.video?.file_name ||
                        ctx.message?.audio?.file_name ||
                        ctx.message?.document?.file_name ||
                        ctx.message?.voice?.file_name ||
                        ctx.message?.animation?.file_name ||
                        null;

        const fileMimeType = ctx.message?.photo?.[ctx.message?.photo.length - 1]?.mime_type ||
                        ctx.message?.video?.mime_type ||
                        ctx.message?.audio?.mime_type ||
                        ctx.message?.document?.mime_type ||
                        ctx.message?.voice?.mime_type ||
                        ctx.message?.animation?.mime_type ||
                        null;

        const message = new Message(chatId, messageType, messageId, content, date);
        message.fileSize = fileSize;
        message.fileId = fileId;
        message.fileName = fileName;
        message.fileMimeType = fileMimeType;


        // Add keyboard info if it exists
        if (ctx.callbackQuery && ctx.callbackQuery.message) {
            const callbackMessageContent = ctx.callbackQuery.message.text || '';
            const inlineKeyboard = ctx.callbackQuery.message.reply_markup?.inline_keyboard || [];
            ctx.state.callbackMessage = {
                content: callbackMessageContent,
                inlineKeyboard: inlineKeyboard
            };
        }

        ctx.state.message = message;

        logInfo(`Constructed message for ${chatId}: ${JSON.stringify(message)}`);
    } catch (error) {
        logError(`Error in constructMessageMiddleware: ${error}`);
    }

    await next();
};

export default constructMessageMiddleware;