import axios from "axios";

//request interceptor to add the auth token header to requests
axios.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers["x-auth-token"] = accessToken;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

//response interceptor to refresh token on receiving token expired error
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  function (error) {
    const originalRequest = error.config;
    let refreshToken = localStorage.getItem("refreshToken");
    if (
      refreshToken &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      return axios
        .post(`${baseUrl}/refresh_token`, { refreshToken: refreshToken })
        .then((res) => {
          if (res.status === 200) {
            localStorage.setItem("accessToken", res.data.accessToken);
            console.log("Access token refreshed!");
            return axios(originalRequest);
          }
        });
    }
    return Promise.reject(error);
  }
);


const signup = (body) => {
  return new Promise((resolve, reject)=> {
    axios.post(
      import.meta.env.VITE_APP_REST_API_BASE_URL + "/signup",
      body,
      {
        validateStatus: function (status) {
          return status === 400 || status === 409 || status === 200; // Resolve only if the status code is less than 500
        }
      }
    ).then((response) => {
      resolve(response);
    }).catch(error => {
      reject(error);
    })
  })
}

const login= async (body) => {
  return await axios.post(
    import.meta.env.VITE_APP_REST_API_BASE_URL + "/login",
    body
  );
}

const resetPassword= async (body) => {
  return await axios.post(
    import.meta.env.VITE_APP_REST_API_BASE_URL + "/reset-password",
    body
  );
}

const forgotPassword= async (body) => {
  return await axios.post(
    import.meta.env.VITE_APP_REST_API_BASE_URL + "/forgot-password",
    body
  );
}

export {axios}

export default { signup, login, resetPassword, forgotPassword};
