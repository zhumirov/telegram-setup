import { basicScenarios, commandScenarios, callbackScenarios } from './configPriority.js';

const allScenarios = { ...basicScenarios, ...commandScenarios, ...callbackScenarios };

const setScenarioWithPriority = (user, newScenario, priority = -1) => {
    const newPriority = allScenarios[newScenario] || priority; // Default priority to 0 if not set
    const currentPriority = user.scenario.priority || -1; // Default priority to 0 if not set

    if (newPriority == 0) {
        user.scenario = { value: newScenario, priority: newPriority };
    }

    if (newPriority >= currentPriority) {
        user.scenario = { value: newScenario, priority: newPriority };
    }
};

export default setScenarioWithPriority;