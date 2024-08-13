import setScenarioWithPriority from "../utils/scenarioManager.js";

const determineMessageType = (ctx) => {

    const user = ctx.state.user;

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
    if (ctx.update.my_chat_member.new_chat_member.status === "kicked") {
        setScenarioWithPriority(user, "deactivate"); 
        return 'left';
    }
    if (ctx.update.my_chat_member.new_chat_member.status === "member") {
        setScenarioWithPriority(user, "activate"); 
        return 'started';
    }
    return 'unknown';
};

const setMessageTypeMiddleware = async (ctx, next) => {
    try {
        ctx.state.messageType = determineMessageType(ctx);
    } catch (error) {
        console.error(`Error in setMessageTypeMiddleware: ${error}`);
    }
    await next();
};

export default setMessageTypeMiddleware;