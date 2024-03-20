'use client';
import { createContext, useEffect, useState } from "react";
import { UserDataType } from "..";
import { registerFunctionType, authenticateFunctionType, loginFunctionType, logoutFunctionType } from './type'
import AxiosReq from "@/lib/axios";



export interface AuthContextType {
    isAuthenticated: boolean,
    isLoading: boolean
    data: {
        user: UserDataType | null
    };

    // methods 

    methods: {
        authenticate: authenticateFunctionType;
        login: loginFunctionType,
        logout:logoutFunctionType
        register:registerFunctionType
    }
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);


interface PropsType {
    children: React.ReactNode;
    preAuth: boolean;
    data?: {
        user: UserDataType | null
    }
    serverAuthenticated?: boolean
}


// context provider
function AuthContextProvider({ children, serverAuthenticated, preAuth, data }: PropsType) {
    const [isAuthenticated, setIsAuthenticated] = useState(serverAuthenticated || false);
    const [isLoading, setIsLoading] = useState(false);
    const [userData, setUserData] = useState<UserDataType | null>(preAuth && data ? data?.user : null);

    // auth 
    useEffect(() => {
        (async () => {
            setIsLoading(true);
            try {
                const res = await AxiosReq.get('auth/is-authenticated')
                if (res.status == 200 && res.data.authenticated && res.data.user) {
                    setIsAuthenticated(true);
                    console.log(res.data.user);
                    setUserData(res.data.user);
                }
            } catch (err) {
                setIsAuthenticated(false);
                setUserData(null);
                console.log(err);
            }
            setIsLoading(false)
        })()
    }, []);


    // # utils 
    
    // authenticate
    const authenticate: authenticateFunctionType = async () => {
        setIsLoading(true);
        try {
            const res = await AxiosReq.get('auth/is-authenticated')
            if (res.status == 200 && res.data.authenticated && res.data.user) {
                setIsAuthenticated(true);
                setUserData(res.data.user);
            }
        } catch (err) {
            setIsAuthenticated(false);
            setUserData(null);
            console.log(err);
        }
        setIsLoading(false)
    }

    // Login
    const login: loginFunctionType = async (body) => {
        if (isAuthenticated) return true;
        try {
            await AxiosReq.post('auth/login',{...body});
            await authenticate();
            return true;
        } catch (err) {
            setUserData(null);
            setIsAuthenticated(false);
            throw err;
        }
    }

    // Logout
    const logout: logoutFunctionType = async () => {
        try {
            await AxiosReq.delete('auth/logout');
            setIsAuthenticated(false);
            setUserData(null);
        } catch (err) {
            setIsAuthenticated(false);
            setUserData(null);
            throw err;
        }
    }

    // Register
    const register: registerFunctionType = async (body) => {
        if (isAuthenticated) return true;
        try {
            await AxiosReq.post('auth/register', body);
            return true;
        } catch (err) {
            setIsAuthenticated(false);
            throw err;
        }
    }

    return (<AuthContext.Provider value={{
        data: { user: userData },
        isAuthenticated,
        isLoading,
        methods: {
            authenticate,
            register,
            login,
            logout
        }
    }}>{children}</AuthContext.Provider>)
}

export default AuthContextProvider ; 