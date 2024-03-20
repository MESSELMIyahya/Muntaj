

// register

interface RegisterUserBodyType {
    name:string;
}   

export type registerFunctionType = (body:RegisterUserBodyType)=> Promise<boolean>


// authenticate type
export type authenticateFunctionType = ()=> Promise<void>


// authenticate type
export type logoutFunctionType = ()=> Promise<void>


// login type 
interface LoginUserBodyType {
    email:string;
    password:string;
}

export type loginFunctionType = (body:LoginUserBodyType) => Promise<boolean>