import AuthProvider from './provider'

export interface UserDataType {
    email:string;
    pic:string;
    username:string;
    id:string;
    store:{
        image:string;
        name:string;
        id:string;
    }|null
    role:'admin'|'user'
}

export default AuthProvider ;