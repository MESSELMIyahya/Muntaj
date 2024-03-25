import SectionPart from "../SectionPart";
import { Button } from "../ui/button";
import CategoryItem from "../CategoryItem";
import { IconType } from "react-icons/lib";
import Link from "next/link";


type ItemType = {
    Icon: IconType;
    title: string;
    link: string;
}


interface Props {
    items: ItemType[]
}


export default function CategoriesSection({ items }: Props) {
    return (<SectionPart className="w-full flex justify-center">

        <div className="w-full sm:w-4/3 md:w-2/3 flex justify-center gap-6 flex-wrap">

            {
                items.map(e =>

                    <div className="max-w-fit flex flex-col gap-1 md:gap-2 items-center">

                        <Button asChild variant='ghost' className="w-fit h-fit p-0 rounded-full">
                            <Link href={e.link}>
                                <CategoryItem size="lg" Icon={e.Icon} />
                            </Link>
                        </Button>
                        <p className="text-sm md:text-base font-medium text-accent-foreground">{e.title}</p>
                    </div>
                )
            }

        </div>

    </SectionPart>)
}