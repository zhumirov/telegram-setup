import { logInfo, logError } from "../utils/logger.js";
import setScenarioWithPriority from "../scenarios/scenarioManager.js";

const messageCounterMiddleware = async (ctx, next) => {
    try {
        const user = ctx.state.user;
        const MESSAGE_LIMIT = parseInt(process.env.MESSAGE_LIMIT, 10);

        if (user) {
            const today = new Date().toDateString();
            const lastMessageDate = new Date(user.messageCount.date).toDateString();

            if (lastMessageDate !== today) {
                user.messageCount.date = new Date();    // Update the date to today's date
                user.messageCount.count = 1;            // Reset message count to 1
            } else {
                user.messageCount.count += 1;           // Increment message count by 1
            }

            if (user.messageCount.count > MESSAGE_LIMIT) {
                setScenarioWithPriority(user, "limited"); // setting priority 2
            }

            logInfo(`User ${user.chatId} sent ${user.messageCount.count} messages today.`);
        }
    } catch (error) {
        logError(`Error in messageCounterMiddleware: ${error}`);
    }

    await next();
};

export default messageCounterMiddleware;