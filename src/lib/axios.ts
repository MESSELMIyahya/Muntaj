import axios , {CreateAxiosDefaults} from 'axios';

interface aXType extends CreateAxiosDefaults  {
    cache:string
}

const axiosConfig : aXType = {
    withCredentials:true,
    baseURL:process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:5000',
    // headers: {'Access-Control-Allow-Origin': '*'},
    // @ts-ignore
	credentials: 'include',
    cache: 'no-store',
}

const AxiosReq =  axios.create(axiosConfig);

export default AxiosReq 