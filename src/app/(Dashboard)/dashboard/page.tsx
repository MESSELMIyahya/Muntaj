import getServerAuth from "@/auth/server";
import PageSection from "@/components/PageSection";
import { redirect } from "next/navigation";
import TabsSection from "./_components/TabsSection";



export default async function DashboardPage (){
    const { isAuthenticated,user } = await getServerAuth();

    // see if the user is authed and has a store    

    if(!isAuthenticated||!user?.store){
        return redirect('/');
    }

    return (<PageSection>
        
        <div className="w-full h-[5em] md:h-[8em] flex items-center justify-center rounded-xl bg-primary/20  p-2 px-4">
            <h4 className="text-xl md:text-3xl font-semibold text-primary">لوحة تحكم المتجر</h4>
        </div>

        <TabsSection/>
    
    </PageSection>)
} 