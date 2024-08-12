const determineMessageType = (ctx) => {
    if (ctx.message?.text) 
        return ctx.message.text.startsWith('/') ? 'command' : 'text';
    if (ctx.message?.photo) 
        return 'photo';
    if (ctx.message?.video) 
        return 'video';
    if (ctx.message?.audio) 
        return 'audio';
    if (ctx.message?.sticker) 
        return 'sticker';
    if (ctx.message?.document) {
        if (ctx.message.document.mime_type.includes('application/pdf')) 
            return 'pdf';
        if (ctx.message.document.mime_type.includes('application/vnd.openxmlformats-officedocument.wordprocessingml.document')) 
            return 'docx';
        return 'document';
    }
    if (ctx.message?.voice) 
        return 'voice';
    if (ctx.message?.animation) 
        return 'animation'; 
    if (ctx.message?.location) 
        return 'location';
    if (ctx.callbackQuery) 
        return 'callback';
    if (ctx.my_chat_member) 
        return 'system';

    return 'unknown';
};

const setMessageTypeMiddleware = async (ctx, next) => {
    try {
        ctx.state.messageType = determineMessageType(ctx);
        if (ctx.state.messageType === 'system') {
            ctx.state.user.scenario = "systemMessage";
            if (ctx.state.user?.save) await ctx.state.user.save();
        }
    } catch (error) {
        console.error(`Error in setMessageTypeMiddleware: ${error}`);
    }
    await next();
};

export default setMessageTypeMiddleware;