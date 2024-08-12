const setScenarioWithPriority = (user, newScenario, newPriority = 0) => {
    if (!user._priority) {
        user._priority = {}; // Initialize _priority object if not present
    }

    // If newPriority is 0, set the scenario and reset priority
    if (newPriority === 0) {
        user.scenario = newScenario;
        user._priority.scenario = newPriority;
        return;
    }

    const currentPriority = user._priority.scenario || 0; // Default priority to 0 if not set
    if (newPriority >= currentPriority) {
        user.scenario = newScenario;
        user._priority.scenario = newPriority;
    }
};

export default setScenarioWithPriority;