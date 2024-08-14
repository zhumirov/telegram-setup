import { logError } from "../utils/logger.js";
import setScenarioWithPriority from "../scenarios/scenarioManager.js";

const checkTextSizeMiddleware = async (ctx, next) => {
    try {
        const MAX_TEXT_SIZE = parseInt(process.env.MAX_TEXT_SIZE, 10);
        const user = ctx.state.user;

        // If the message text exceeds the MAX_TEXT_SIZE, update the scenario with priority
        if (ctx.message?.text && ctx.message.text.length > MAX_TEXT_SIZE) {
            setScenarioWithPriority(user, "too_big_text"); // setting priority 1
        }
    } catch (error) {
        logError(`Error in checkTextSizeMiddleware: ${error}`);
    }

    await next();
};

export default checkTextSizeMiddleware;