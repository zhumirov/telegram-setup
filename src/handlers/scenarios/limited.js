import { logInfo, logError } from '../../utils/logger.js';
import User from '../../models/User.js';
import setScenarioWithPriority from "../../scenarios/scenarioManager.js";

const limitedText = {
    "Russian": ["Вы достигли лимита сообщений", "Попробуйте позже"],
    "English": ["You have reached the message limit", "Try again later"]
};

const limitedHandler = async (ctx) => {
    try {
        const user = ctx.state.user;
        const language = user.interfaceLanguage;

        const texts = limitedText[language] || limitedText["English"];
        const randomText = texts[Math.floor(Math.random() * texts.length)];

        await ctx.replyWithMarkdownV2(randomText);
        console.log(user)
        setScenarioWithPriority(user, "regular");
        console.log(user)
        await User.updateOne({ chatId: user.chatId }, user, { upsert: true });
        logInfo(`User ${user.chatId} saved to the database`);
        
    } catch (error) {
        await logError(`Error in limitedHandler: ${error}`);
    }
};

export default limitedHandler;