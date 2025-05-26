import axios from 'axios';
const URL = import.meta.env.VITE_API_URL;

const API = axios.create({
    baseURL:`${URL}/auth`,
})
API.interceptors.request.use((confiq)=>{
    const token = localStorage.getItem("token");
    if(token){
        confiq.headers.Authorization = `Bearer ${token}`
    }
    return(confiq);
});

export const userInfo =()=>API.get(`/userInfo`);