

// register

interface RegisterUserBodyType {
    firstName:string;
    lastName:string;
    password:string;
    userName:string;
    email:string;
}   

export type registerFunctionType = (body:RegisterUserBodyType)=> Promise<boolean>


// authenticate type
export type authenticateFunctionType = ()=> Promise<void>


// authenticate type
export type logoutFunctionType = ()=> Promise<void>

// update function type
export type updateFunctionType = ()=> Promise<boolean>


// login type 
interface LoginUserBodyType {
    email:string;
    password:string;
}

export type loginFunctionType = (body:LoginUserBodyType) => Promise<boolean>


type providers = 'google';
export type loginOAuthFunctionType = (pro:providers) => Promise<void>
