import User from "../models/User.js";
import { logInfo, logError, notifyAdminTelegram } from "../utils/logger.js";
import setScenarioWithPriority from "../scenarios/scenarioManager.js";

const setUserMiddleware = async (ctx, next) => {
    try {
        const chatId = String(ctx.chat.id);
        let user = await User.findOne({ chatId });

        if (!user) {
            user = new User({ chatId });
            // setScenarioWithPriority(user, "start", 0); 
            // notifyAdminTelegram(`We have a new user: ${JSON.stringify(user)}`);
            await user.save();
        }

        ctx.state.user = user;
        logInfo(`User retrieved or created: ${chatId}`);
    } catch (error) {
        logError(`Error in setUserMiddleware: ${error}`);
    }

    await next();
};

export default setUserMiddleware;