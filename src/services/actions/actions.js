const LOGIN_ACTION = (payload)=>{
    return {
        type : "LOG_IN",
        payload : payload
    }
}
const LOGOUT_ACTION = ()=>{
    return {
        type : "LOG_OUT"
    }
}
export {LOGIN_ACTION , LOGOUT_ACTION}