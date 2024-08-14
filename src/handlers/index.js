import { logInfo, logError, notifyAdminTelegram } from "../utils/logger.js";
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config();

const MODE = process.env.MODE;

// Function to dynamically import all scenarios
const importScenarios = async () => {
    const scenarios = {};
    const scenariosPath = path.resolve('src/handlers/scenarios');
    const files = fs.readdirSync(scenariosPath);

    for (const file of files) {
        if (file.endsWith('.js')) {
            const scenarioName = path.basename(file, '.js');
            scenarios[scenarioName] = (await import(`../handlers/scenarios/${file}`)).default;
        }
    }

    return scenarios;
};

const handleMessage = async (ctx) => {
    const stateMessage = JSON.stringify(ctx.state, null, 2);
    if (MODE === "local") {
        await notifyAdminTelegram(`State: ${stateMessage}`);
    }

    try {
        const user = ctx.state.user;

        // Dynamically import all scenarios
        const scenarios = await importScenarios();

        // Get the current scenario handler
        const scenarioHandler = scenarios[user.scenario.value];

        // Execute the scenario handler if it exists
        if (scenarioHandler) {
            await scenarioHandler(ctx);
        } else {
            logError(`No handler found for scenario: ${user.scenario.value}`);
        }

    } catch (error) {
        await logError(`Error in handleMessage: ${error}`);
    }
};

export default handleMessage;