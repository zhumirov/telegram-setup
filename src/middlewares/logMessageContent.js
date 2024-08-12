import { logInfo } from "../utils/logger.js";

const logMessageContentMiddleware = async (ctx, next) => {
    logInfo(`Received update: ${JSON.stringify(ctx.update)}`);
    await next();
};

export default logMessageContentMiddleware;