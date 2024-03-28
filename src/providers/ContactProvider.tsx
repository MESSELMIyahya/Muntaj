import { ContactContextProvider } from "@/contexts/contactContext"

interface Props {
    children:React.ReactNode
}

export default function ContactProvider ({children}:Props){
    return(<ContactContextProvider>{children}</ContactContextProvider>)
}