import { AlertContextProvider } from "@/contexts/alertContext"

interface Props {
    children:React.ReactNode
}

export default function AlertProvider ({children}:Props){
    return(<AlertContextProvider>{children}</AlertContextProvider>)
}