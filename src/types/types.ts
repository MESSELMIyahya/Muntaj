



export interface ProductType {
    name: string
    description: string
    country:string;
    category: string // => Each category  has an id 
    images: string[] // => Images URLs 
    primaryImage: string
    videoURL: string;
    _id:string;
    store: {
        _id: string // => Id of the store 
        country: string // => The number of the country
        photo: string // => URl of owner's profile photo
        name: string // => Store's name
        rating: number;
    }
    rating?: number // => from 1  to  5

    colors: string[] // => red

    sizes?: {
        sm: boolean
        md: boolean
        lg: boolean
        xl: boolean
    };

    comments: {

        owner: {
            id: number // => Id of the owner
            photo: string // => Profile image of the owner
            name: string // => Name of the owner
        }

        text: string;
    }[]
}


export interface StoreType {
  
  name:string
  storeImage:string;
  storeCoverImage:string;
  rating:number;
  
  location:{
    country:number
    address:string
  };
  
  owner:{
    _id:number // => Id of the owner
    photo:string // => Profile image of the owner
    name:string // => Name of the owner
  }
  
  contact:{
    phoneNumbers:string[]
    email:string;
    website?:string; // => this is optional 
    socialMedia:{  // all of the sm account are optional
      facebook?:string;
      instagram?:string;
      linkedIn?:string;
      twitter?:string;
      youtube?:string
    }
    
  }
 
  products:ProductType[]
}
