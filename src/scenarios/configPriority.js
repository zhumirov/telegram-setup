const basicScenarios = {
    blocked: 10,
    too_big_text: 7,
    limited: 5,
    deactivate: 100,
    activate: 100,
    // Add other basic scenarios and their priorities here
};

const commandScenarios = {
    start: 1,
    profile: 1,
    incorrect_command: 1,
    // Add other command scenarios and their priorities here
};

const callbackScenarios = {
    incorrect_callback: 1,
    start_callback: 1,
    jobs_today: 1,
    // Add other callback scenarios and their priorities here
};

export { basicScenarios, commandScenarios, callbackScenarios };