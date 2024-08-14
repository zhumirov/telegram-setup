import User from '../models/User.js';
import { logInfo, logError, notifyAdminTelegram } from "../utils/logger.js"
import dotenv from 'dotenv';
import setScenarioWithPriority from '../scenarios/scenarioManager.js';

dotenv.config();

const MODE = process.env.MODE;

const handleMessage = async (ctx) => {
    const stateMessage = JSON.stringify(ctx.state, null, 2);
    if(MODE === "local"){
        await notifyAdminTelegram(`State: ${stateMessage}`);
    }
    

    try {
        const user = ctx.state.user;
        setScenarioWithPriority(user, "regular", 0);
        await User.updateOne({ chatId: user.chatId }, user, { upsert: true });
        logInfo(`User ${user.chatId} saved to the database`);
    } catch (error) {
        await logError(`Error saving user in handler: ${error}`);
    }

};




export default handleMessage;