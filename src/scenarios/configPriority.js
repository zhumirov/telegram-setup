const basicScenarios = {
    blocked: 10,
    too_big_text: 7,
    limited: 5,
    deactivate: 100,
    activate: 100,
    regular: 0
    // Add other basic scenarios and their priorities here
};

const commandScenarios = {
    start: 1,
    profile: 1,
    incorrect_command: 1,
    jobs_today: 1,
    learning_courses: 1
    // Add other command scenarios and their priorities here
};

const callbackScenarios = {
    incorrect_callback: 1,
    profile: 1,
    jobs_today: 1,
    set_occupation: 1,
    set_level: 1,
    set_location: 1,
    set_language: 1,
    dislike_job: 1,
    like_job: 1,
    upload_cv: 1,
    generate_cv: 1,
    generate_cover: 1,
    courses_to_study: 1

    // Add other callback scenarios and their priorities here
};

export { basicScenarios, commandScenarios, callbackScenarios };