import useAuth from "@/auth/hooks/useAuth"
import AxiosReq from "@/lib/axios"
import { useState } from "react"



interface dataToUpdateType {
    userName?:string;
    lastName?:string;
    firstName?:string;
    profileImage?:File
}


interface ReturnedType {
    isLoading:boolean
    updateData:(d:dataToUpdateType)=>Promise<void>
}


type useUserType = ()=> ReturnedType 

const useUser : useUserType = ()=>{
    const { methods:{update} } = useAuth()
    const [isLoading,setIsLoading] = useState(false);

    async function  updateData (data:dataToUpdateType){
        setIsLoading(true)
        try{    
            await AxiosReq.put('api/v1/user/me',data)
            await update()
        }catch{
            throw new Error('some thing went wrong,try again')
        }
        setIsLoading(false)
    }
    return {isLoading,updateData}
}

export default useUser ;