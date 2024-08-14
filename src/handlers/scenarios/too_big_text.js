import { logInfo, logError } from '../../utils/logger.js';
import User from '../../models/User.js';
import setScenarioWithPriority from "../../scenarios/scenarioManager.js";

const tooBigText = {
    "Russian": ["Слишком длинный текст", "Пожалуйста, сократите ваше сообщение"],
    "English": ["Text is too long", "Please shorten your message"]
};

const tooBigTextHandler = async (ctx) => {
    try {
        const user = ctx.state.user;
        const language = user.interfaceLanguage;

        

        const texts = tooBigText[language] || tooBigText["English"];
        const randomText = texts[Math.floor(Math.random() * texts.length)];
        
        await ctx.replyWithMarkdownV2(randomText);
        setScenarioWithPriority(user, "regular");
        await User.updateOne({ chatId: user.chatId }, user, { upsert: true });
        logInfo(`User ${user.chatId} saved to the database`);
    } catch (error) {
        await logError(`Error in tooBigTextHandler: ${error}`);
    }
};

export default tooBigTextHandler;