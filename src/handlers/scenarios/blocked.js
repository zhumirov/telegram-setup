import { logInfo, logError } from '../../utils/logger.js';
import User from '../../models/User.js';
import setScenarioWithPriority from "../../scenarios/scenarioManager.js";

const blockedTexts = {
    "Russian": ["val1", "val2", "val3"],
    "English": ["val4", "val5"]
};

const blockedHandler = async (ctx) => {
    try {
        const user = ctx.state.user;
        const language = user.interfaceLanguage;

        const texts = blockedTexts[language] || blockedTexts["English"];
        const randomText = texts[Math.floor(Math.random() * texts.length)];

        await ctx.replyWithMarkdownV2(randomText);
        setScenarioWithPriority(user, "regular", 0);
        await User.updateOne({ chatId: user.chatId }, user, { upsert: true });
        logInfo(`User ${user.chatId} saved to the database`);
        
    } catch (error) {
        await logError(`Error in blockedHandler: ${error}`);
    }
};

export default blockedHandler;