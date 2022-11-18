
import { AuthAction } from "./AuthAction"



export const AuthReducer=(state,action)=>{
    switch(action.type){
        case AuthAction.LOGIN:return{
            ...state,
            username:action.payload,
            authStatus:true};
        
        case AuthAction.LOGOUT: return{
            ...state,
            username:'',
            authStatus:false};
        default: return state;
    }
            
}