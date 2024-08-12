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

        const messageId = ctx.message ? ctx.message.message_id : null;        
        const date = ctx.message?.date || ctx.update.my_chat_member?.date || Date.now();
        const fileSize = ctx.message?.photo?.[ctx.message?.photo.length - 1]?.file_size ||
                         ctx.message?.video?.file_size ||
                         ctx.message?.audio?.file_size ||
                         ctx.message?.document?.file_size ||
                         ctx.message?.voice?.file_size ||
                         ctx.message?.animation?.file_size ||
                         null;

        const message = new Message(chatId, messageType, messageId, content, date);
        message.fileSize = fileSize;

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