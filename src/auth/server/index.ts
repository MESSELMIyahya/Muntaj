'use server';
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
        const baseURL = 'https://muntaj-server.onrender.com';

        const res = await fetch(baseURL+'/auth/is-authenticated',{cache:"no-store",headers:{Cookie:cookieString}})
        const databack = await res.json() 

        
        if (databack.authenticated && databack.user) {
            return {
                user:databack.user,
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