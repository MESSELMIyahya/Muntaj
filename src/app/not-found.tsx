import PageSection from "@/components/PageSection";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";




export default function Page404 (){


    return (<PageSection className="flex justify-center h-[70vh]">
    
    <Card className="w-full sm:w-[20em] py-4 h-fit">
        <div className="w-full text-center mb-4">
            <h1 className="text-8xl font-bold text-primary mb-3">404</h1>
            <div className="text-xl text-secondary-foreground">
                لا يوجد شيئ هنا
            </div>
        </div>
        <div className="flex justify-center">
            <Button asChild>
                <Link href="/">
                    صفحة الرئيسية
                </Link>
            </Button>
        </div>
    </Card>
    
    
    </PageSection>)
}