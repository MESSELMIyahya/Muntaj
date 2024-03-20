import AuthProvider from './provider'

export interface UserDataType {
    email:string;
    pic:string;
    username:string;
    id:string;    
    role:'admin'|'user'
}

export default AuthProvider ;