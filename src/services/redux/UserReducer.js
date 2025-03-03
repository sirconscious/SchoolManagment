const initialeState = {
    user : {} , 
    isAuth : false
}
const UserReducer = (state = initialeState , action)=>{
    switch (action.type) {
        case "LOG_IN":
                return {
                    ...state,
                    user : action.payload,
                    isAuth : true
                }
            break;
        case "LOG_OUT":
                return {
                    ...state,
                    user : {},
                    isAuth : false
                }
            break;
        default:
            return state
            break;
    }
}
export default UserReducer ;