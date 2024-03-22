import PageSection from "@/components/PageSection";
import RegisterPageText from "@/langs/AR/pages/register.json"
import RegisterCard from "./_components/RegisterCard";
import getServerAuth from "@/auth/server";
import { redirect } from "next/navigation";


export default async function RegisterPage() {
    // see if the user is loggedIn 
    const user = await getServerAuth()

    if(user.isAuthenticated){
        // if the user exists we redirect the user to the home page
       return redirect('/')
    }

    return (<PageSection className="flex justify-center">

        <RegisterCard  text={RegisterPageText} />

    </PageSection>);


} 