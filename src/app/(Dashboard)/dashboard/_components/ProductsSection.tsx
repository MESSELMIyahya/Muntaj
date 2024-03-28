'use client'

import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import ProductRowItem from "./ProductRowItem";
import { testProds } from "@/lib/products";
import { HiPlus } from "react-icons/hi";
import { useMemo, useState } from "react";
import CreateProductDialog from "./CreateProductDialog";
import { ProductType } from "@/types/types";
import UpdateProductDialog from "./UpdateProductDialog";
import DeleteProductDialog from "./DeleteProductDialog";






const TableHeaderProduct = () => (
    <TableHeader>
        <TableRow>
            <TableCell className="font-medium">
                ID
            </TableCell>
            <TableCell className="font-medium">
                اسم
            </TableCell>
            <TableCell className="font-medium">
                صنف
            </TableCell>
            <TableCell className="font-medium">
                تقييم
            </TableCell>
            <TableCell className="font-medium">
                تعليقات
            </TableCell>
            <TableCell className="font-medium text-end">
                إجراء
            </TableCell>
        </TableRow>
    </TableHeader>
)


type ProductUpdateType = {
    id: string;
    description: string;
    image: string;
    name: string;
    category: string,
}


interface Props {
    refetch: () => Promise<void>;
    products: ProductType[];
}

export default function ProductsSection({ products, refetch }: Props) {
    const [createProductToggle, setCreateProductToggle] = useState(false);
    const [updateProductToggle, setUpdateProductToggle] = useState(false);
    const [prodToUpdate, setProdToUpdate] = useState<ProductUpdateType | null>(null);
    const [deleteProductToggle,setDeleteProductToggle] = useState(false)
    const [idToDelete,setIdToDelete] = useState('');

    const handleUpdateProd = (id: string) => {
        const prod = products.find(e => e._id == id)
        if (!prod) {
            setProdToUpdate(null);
            return;
        }
        setProdToUpdate({
            category:prod.category,
            description:prod.description,
            id:prod._id,
            image:prod.primaryImage,
            name:prod.name
        });
        setUpdateProductToggle(true);
    };

    const handleDeleteProd =  (id:string)=>{
        setIdToDelete(id);
        setDeleteProductToggle(true);
    }

    return (<><div className="w-full">
        <div className="w-full flex items-center justify-between mb-4">
            <div className="text-xl font-medium text-accent-foreground">
                المنتجات
            </div>

            <Button onClick={() => setCreateProductToggle(true)} className="flex items-center gap-2">
                <HiPlus className="size-4" />
                اضافة منتج
            </Button>

        </div>
        <div className="md:w-full rounded-md border">
            <Table dir="rtl" className="w-[40em] md:w-full">
                <TableHeaderProduct />
                {
                    products.length == 0 ?
                        <TableCaption className="pb-2">لا توجد منتجات هنا</TableCaption>
                        :
                        null
                }
                <TableBody>
                    {
                        products.map((e, i) =>
                            <ProductRowItem
                                handleDelete={handleDeleteProd}
                                handleUpdate={handleUpdateProd}
                                key={e._id}
                                id={e._id}
                                listNum={i + 1}
                                category={e.category}
                                rating={e?.rating || 0}
                                comments={e?.comments?.length || 0}
                                name={e.name}
                            />
                        )
                    }
                </TableBody>
            </Table>
        </div>
    </div>
        {/* create product dialog */}
        <CreateProductDialog refetch={refetch} toggle={createProductToggle} setToggle={setCreateProductToggle} />
        {/* update product dialog */}
        {
            prodToUpdate ?  
                <UpdateProductDialog   refetch={refetch} product={prodToUpdate}  toggle={updateProductToggle} setToggle={setUpdateProductToggle}  />
            :null
        }
        {
            idToDelete ?  
                <DeleteProductDialog   refetch={refetch} id={idToDelete} toggle={deleteProductToggle} setToggle={setDeleteProductToggle}  />
            :null
        }
    </>);
}
