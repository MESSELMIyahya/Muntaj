import { ProductType } from "@/types/types";

const testImg = 'https://m.media-amazon.com/images/I/51-TFGHQE2L._AC_SX569_.jpg';


const testProds : ProductType[] = [
    {   
        _id:'f093hf93fh0',
        category:'ct4',
        country:'dz',
        images:[],
        primaryImage:testImg,
        description:'ساعة ذكية احترافية مصنعة ومنتجة في الجزائر تحتوي على الكثير من المزايا',
        store:{
            country:'dz',
            _id:'092hf903fh',
            name:"TechDz",
            photo:'',
            rating:5
        },
        name:"ساعة ذكية واحترافية  مصنعة في الجزائر",
        videoURL:'',
        rating:100,
        colors:[],
        comments:[]
    }   
]


async function getProducts(n:number=10) : Promise<ProductType[]> {
    return [...testProds,...testProds,...testProds]
}


export default getProducts ;