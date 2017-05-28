export default (state={}, action) =>{
    switch (action.type){
        case "LOGIN":
            return state;
        case "LOGIN_SUCCESS":
            return {
                ...state,
                user: action.data
            }
        case "RETURN_URL":
            return {
                ...state,
                returnUrl: action.data
            }
        case "LOGOUT":
            return state;
        case "LOGOUT_SUCCESS":
            return {
                ...state,
                user: ""
            }
        case "CHECK_USER":
            return state;
        case "CHECK_USER_SUCCESS":
            return {
                ...state,
                user:action.data
            }
        default:
            return state;
    }
}