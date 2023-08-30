import axios from "axios";
import { toast } from "react-hot-toast";

const customAxios = axios.create({
    baseURL:process.env.REACT_APP_BASE_API_URL,
    headers: {
		Accept: 'application/json',
	},
    withCredentials:false
})
const requestHandler =(request)=>{
    return request;
}
const responseHandler =(response)=>{
    if(response?.data?.success === 0 && response?.data?.error){
        toast.error(response.data.error);
    }
    return response;
}
const errorHandler = (error)=>{
    if(error?.response?.status === 401){
        toast.error('Session expired.',{
            id :error?.response?.status ?? 'Session expired.'
        });
    }
    return Promise.reject(error);
}

customAxios.interceptors.request.use(
    (request)=> requestHandler(request),
    (error)=> errorHandler(error),
)
customAxios.interceptors.response.use(
    (response)=> responseHandler(response),
    (error)=> errorHandler(error),
)
export default customAxios;
