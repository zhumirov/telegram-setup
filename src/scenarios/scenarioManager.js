import { basicScenarios, commandScenarios, callbackScenarios } from '../scenarios/configPriority.js';

const allScenarios = { ...basicScenarios, ...commandScenarios, ...callbackScenarios };

const setScenarioWithPriority = (user, newScenario, priority = -1) => {
    console.log(allScenarios[newScenario]);
    var newPriority = -1;
    if(allScenarios[newScenario] >= 0){
        newPriority = allScenarios[newScenario]
    } else {
        newPriority = allScenarios[newScenario] = priority;
    }
    const currentPriority = user.scenario.priority || -1; // Default priority to 0 if not set

    if (newPriority == 0) {
        user.scenario = { value: newScenario, priority: newPriority };
    }

    if (newPriority >= currentPriority) {
        user.scenario = { value: newScenario, priority: newPriority };
    }
};

export default setScenarioWithPriority;