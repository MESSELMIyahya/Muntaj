'use client'

import SectionPart from "@/components/SectionPart"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import ProductsSection from "./ProductsSection";
import SettingSection from "./settingSection";
import useDashboard from "@/hooks/useDashboard";
import { Skeleton } from "@/components/ui/skeleton";



type TabType = 'sett' | 'prod';


export default function TabsSection() {
    const { isLoading,store,refetch ,products } = useDashboard()
    const [tab, setTab] = useState<TabType>('prod');
    

    return (<div className="w-full">

        <SectionPart className="w-full pb-2">

            <div className="w-full flex justify-start gap-2 bg-card border-b pt-3 mb-6">
                <Tabs onValueChange={e => setTab(e as TabType)} defaultValue='prod' className="bg-card rounded-none">
                    <TabsList className="gap-2 bg-card rounded-none">
                        <TabsTrigger value="sett" className="data-[state=active]:shadow-none data-[state=active]:text-primary data-[state=active]:bg-primary/20 bg-accent">الإعدادات</TabsTrigger>
                        <TabsTrigger value="prod" className="data-[state=active]:shadow-none data-[state=active]:text-primary data-[state=active]:bg-primary/20 bg-accent">المنتجات</TabsTrigger>
                    </TabsList>
                </Tabs>
            </div>

        {   
            isLoading  || !store || !products ? 
            <Skeleton className="w-full h-[40em]" />
            :
            tab == 'prod' ?
            <ProductsSection products={products} refetch={refetch} /> :
            <SettingSection refetch={refetch} store={store} />
        }

        </SectionPart>


    </div>);
}