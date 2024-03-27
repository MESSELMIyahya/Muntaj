import { ProductType } from "@/types/types";

const testImg = 'https://m.media-amazon.com/images/I/51-TFGHQE2L._AC_SX569_.jpg';


export const testProds : ProductType[] = [
    {   
        _id:'f093hf93fh0',
        category:'ct4',
        country:'eg',
        images:[testImg,testImg,testImg,testImg],
        primaryImage:testImg,
        description:'ساعة ذكية احترافية مصنعة ومنتجة في مصر تحتوي على الكثير من المزايا',
        store:{
            country:'dz',
            _id:'092hf903fh',
            name:"TechDz",
            photo:testImg,
            rating:5
        },
        name:"ساعة ذكية واحترافية  مصنعة في مصر",
        videoURL:'',
        rating:100,
        colors:[],
        comments:[]
    }   
]


async function getProducts(n:number=10) : Promise<ProductType[]> {
    return [...testProds,...testProds,...testProds]
}


export async function getProduct(id:string):Promise<ProductType>{
    return testProds[0]
}


export default getProducts ;