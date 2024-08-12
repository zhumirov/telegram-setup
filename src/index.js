import bot from "./bot.js";
import { logError, logInfo } from "./utils/logger.js";

const launchBot = async () => {
    try {
        await bot.launch();
        logInfo('Bot is up and running');
    } catch (error) {
        logError(`Failed to launch bot: ${error.message}`);
    }
};

// Initial bot launch
launchBot().catch(err => logError(err.message));