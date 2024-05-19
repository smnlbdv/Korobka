import axios from 'axios';

const api = axios.create({
  withCredentials: true,
  baseURL: "http://localhost:5000",
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  }
});


api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response.status === 401 && error.config && !error.config._isRetry) {
      error.config._isRetry = true;
      await api.get('/api/profile/token/refresh');
    } else if (error.response.status === 422 && error.config && !error.config._isRetry) {
      error.config._isRetry = true;
      localStorage.clear();
      const redirectUrl = error.response.data.redirectTo;
      if (redirectUrl) {
        window.location.replace(redirectUrl);
      }
    } else {
      return Promise.reject(error);
    }
  }
);

export default api;