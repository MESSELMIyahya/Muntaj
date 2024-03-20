import { useContext } from "react";
import { AuthContext, AuthContextType } from "../contexts/authProvider";



type useAuthHookType = () => AuthContextType ;

const useAuth : useAuthHookType = ()=>{
    return useContext(AuthContext);
}


export default useAuth ;