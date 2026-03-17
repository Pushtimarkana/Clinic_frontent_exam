import axios from "axios";
// import jwtDecode from "jwt-decode";

const api=axios.create({
    baseURL:"https://cmsback.sampaarsh.cloud",
    headers:{
        "Content-Type":"application/json"
    }
})

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


export default api