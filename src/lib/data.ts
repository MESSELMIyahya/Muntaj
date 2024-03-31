

// ## these are function for fetching will be used in React Query 

import AxiosReq from "./axios";


// fetch products (home page)

const getProductsData = ()=> AxiosReq.get('/api/v1/product').then(e=>e.data.data)



export {getProductsData};