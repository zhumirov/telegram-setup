import { logError } from "../utils/logger.js";
import setScenarioWithPriority from "../scenarios/scenarioManager.js";
import commandToScenarioMap from "../scenarios/commandToScenarioMap.js";

const commandHandlerMiddleware = async (ctx, next) => {
    try {
        if (ctx.state.messageType !== 'command') {
            return next();
        }

        const [command, ...valueParts] = ctx.message.text.split(' ');
        const value = valueParts.join(' ');
        const user = ctx.state.user;

        const scenario = commandToScenarioMap[command] || { value: 'incorrect_command' };
        setScenarioWithPriority(user, scenario.value);

        // Optionally, you can add the command and value to the state
        ctx.state.command = command;
        ctx.state.commandValue = value;

    } catch (error) {
        logError(`Error in commandHandlerMiddleware: ${error}`);
    }

    await next();
};

export default commandHandlerMiddleware;