import axios , {CreateAxiosDefaults} from 'axios';



const axiosConfig : CreateAxiosDefaults = {
    withCredentials:true,
    baseURL:process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:5000',
}

const AxiosReq =  axios.create(axiosConfig);


// // add middleware that runs before any req and verifies the auth to create new access token

// // this function  gets ran before any request t  verify the auth 
// AxiosReq.interceptors.request.use(async function(config){
//     const url = config.baseURL ;
//     try{
//         console.log('ran  here');
//         await axios.post(url+'/auth/new-access-token',{},{withCredentials:true});
//     }catch(err){
//     }
//     return  config  ;
// })



export default AxiosReq 