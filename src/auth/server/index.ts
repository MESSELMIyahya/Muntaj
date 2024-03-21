'use server';
import AxiosReq from "@/lib/axios";
import { UserDataType } from "..";
import { cookies } from "next/headers"

interface ReturnedData {
    user:UserDataType|null,
    isAuthenticated:boolean;
}

// this function will get the cookies from the client then send them to the server to authenticate the app from the server

type getServerAuthType = ()=> Promise<ReturnedData>

const getServerAuth :getServerAuthType = async ()=>{
    try{
        // get tokens 
        const ac_to = cookies().get('ac_to') ;
        const re_to = cookies().get('re_to') ;

        if(!ac_to||!re_to){
            return {
                user:null,
                isAuthenticated:false
            }
        };
        const cookieString = `${ac_to.name}=${ac_to.value}; ${re_to.name}=${re_to.value};`;

        const res = await AxiosReq.get('auth/is-authenticated',{headers:{Cookie:cookieString}});
        
        if (res.status == 200 && res.data.authenticated && res.data.user) {
            return {
                user:res.data.user,
                isAuthenticated:true
            }
        }else {
            throw Error('unauthenticated')
        }

    }catch{
        return {
            user:null,
            isAuthenticated:false
        }
    }
}


export default getServerAuth ;