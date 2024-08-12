import { logInfo } from "../utils/logger.js";

const logMessageContentMiddleware = async (ctx, next) => {
    // Iterate over each key in the ctx object
    // logInfo(`Entire ctx: 
    //     -----------------------------${JSON.stringify(ctx)}---------------------------------`)
    logInfo(`ctx = {'chat': ${JSON.stringify(ctx['chat'])}, 'message': ${JSON.stringify(ctx['message'])}, 'callbackQuery': ${JSON.stringify(ctx['callbackQuery'])},'update': ${JSON.stringify(ctx['update'])}}`);

    await next();
};


export default logMessageContentMiddleware;