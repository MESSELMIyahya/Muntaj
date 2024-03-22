import { cn } from "@/lib/utils";
import { IconBaseProps } from "react-icons/lib";
import { LuLoader } from "react-icons/lu";


type iconType = IconBaseProps ;

interface Props extends iconType {} 

function LoadingIcon ({className,...props}:Props){

    return <LuLoader className={cn('w-5 h-5 text-white animate-spin',className)} {...props} />
}


export default LoadingIcon