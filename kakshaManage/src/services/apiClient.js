import axios from "axios";
const api = axios.create({ baseURL: "http://localhost:5000/backend", headers: {"Content-Type":"application/json"}});
api.interceptors.request.use(r=>{const t=localStorage.getItem("token");if(t)r.headers.Authorization="Bearer "+t;return r;});
export default api;
