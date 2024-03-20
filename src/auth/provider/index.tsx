import AuthContextProvider from "../contexts/authProvider";

export default function AuthProvider ({children}:{children:React.ReactNode}){
    return (<AuthContextProvider preAuth={false}>{children}</AuthContextProvider>)
}