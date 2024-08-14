import { logInfo, logError } from "../utils/logger.js";
import setScenarioWithPriority from "../scenarios/scenarioManager.js";

const blockCheckMiddleware = async (ctx, next) => {
    try {
        const user = ctx.state.user;

        if (user && user.blockedUntil && new Date() < new Date(user.blockedUntil)) {
            setScenarioWithPriority(user, "blocked"); // No priority
        } else {
            logInfo(`User ${user.chatId} is not blocked.`);
        }
    } catch (error) {
        logError(`Error in blockCheckMiddleware: ${error}`);
    }

    await next();
};

export default blockCheckMiddleware;