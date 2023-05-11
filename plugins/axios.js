
export default ({ $axios}) => {
  $axios.onRequest(config => {
    config.headers.common['Accept'] = 'application/json';
    config.headers.common['Content-Type'] = 'application/json';
   const token = localStorage.getItem("token");
    config.headers.Authorization = `Bearer ${token}`;
  });
}

  
    // config.headers['Authorization'] = `application/json`;
    // config.headers['Accept'] = `application/json`;
    // config.headers['Content-Type'] = `application/json`;