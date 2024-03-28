import { ContactContext, ContactContextType } from "@/contexts/contactContext";
import { useContext } from "react";


type useContactHookType = () => ContactContextType ;

const useContact : useContactHookType = ()=>{
    return useContext(ContactContext);
}


export default useContact ;