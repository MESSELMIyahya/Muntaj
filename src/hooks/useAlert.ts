import { useContext } from "react";
import { AlertContext , AlertContextType } from "@/contexts/alertContext";

type useAuthHookType = () => AlertContextType ;

const useAlert : useAuthHookType = ()=>{
    return useContext(AlertContext);
}


export default useAlert ;