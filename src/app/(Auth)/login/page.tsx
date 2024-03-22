import PageSection from "@/components/PageSection";
import LoginPageText from "@/langs/AR/pages/login.json"
import LoginCard from "./_components/LoginCard";
import getServerAuth from "@/auth/server";
import { redirect } from "next/navigation";


export default async function LogInPage() {
    // see if the user is loggedIn 
    const user = await getServerAuth()

    if(user.isAuthenticated){
        // if the user exists we redirect the user to the home page
       return redirect('/')
    }

    return (<PageSection className="flex justify-center">

        <LoginCard  text={LoginPageText} />

    </PageSection>);


} 