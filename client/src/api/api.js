import axios from 'axios';


const api = axios.create({
  withCredentials: true,
  baseURL: "http://localhost:5000",
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  }
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = token;
  }
  return config;

}, error => {
  return Promise.reject(error);
});

api.interceptors.response.use((response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401) {
      
      const refreshToken = document.cookie.replace(/(?:(?:^|.*;s*)refreshToken*\=s*([^;]*).*$)|^.*$/, "$1");

      if (refreshToken) {
        const refreshedToken = await api.post('/api/profile/refresh_token', { refresh_token: refreshToken });
        localStorage.setItem('token', refreshedToken.data.tokens.accessToken);
        originalRequest.headers.Authorization = `${refreshedToken.data.tokens.accessToken}`;  
        return api(originalRequest);
      }
    }

    return Promise.reject(error);
  }
);

export default api;