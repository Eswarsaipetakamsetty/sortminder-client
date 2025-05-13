export const host = "http://127.0.0.1:8000/"

export const routes = {
    //authentication
    REGISTER : `${host}/users/register/`,
    LOGIN : `${host}/users/login/`,

    //challenges

    START_CHALLENGE : `${host}/challenges/start_challenge/`,
    RUN_CODE : `${host}/challenges/run_code/`,
    SUBMIT_CODE : `${host}/challenges/submit_code/`,

    //profile

    PROFILE : `${host}/users/profile/`,

    //discussionforum

    DISCUSSION_FORUM : `${host}/discussionforum`,

    LEADERBOARD: `${host}/users/leaderboard`,

    USER_PROFILE: `${host}/userprogress/score-progress/`

}