import { logError } from "../utils/logger.js";
import setScenarioWithPriority from "../scenarios/scenarioManager.js";
import callbackToScenarioMap from "../scenarios/callbackToScenarioMap.js";

const callbackHandlerMiddleware = async (ctx, next) => {
    try {
        if (!ctx.callbackQuery) {
            return next();
        }

        const [callback, ...valueParts] = ctx.callbackQuery.data.split(' ');
        const value = valueParts.join(' ');
        const user = ctx.state.user;

        const scenario = callbackToScenarioMap[callback] || { value: 'incorrect_callback' };
        setScenarioWithPriority(user, scenario.value);

        // Optionally, you can add the callback and value to the state
        ctx.state.callback = callback;
        ctx.state.callbackValue = value;

    } catch (error) {
        logError(`Error in callbackHandlerMiddleware: ${error}`);
    }

    await next();
};

export default callbackHandlerMiddleware;