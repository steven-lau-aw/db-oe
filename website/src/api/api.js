import axios from 'axios'

let url = ''

if (window.location.href.includes('localhost')) {
  // url = "http://chope2-api.localhost/api";
  url = 'http://127.0.0.1:8000/api'
} else {
  url = 'http://api.db-oe.com/api'
}

const BaseApi = axios.create({
  // //baseURL: "http://localhost:8000/api",
  // env === "production"
  //     ? ""
  //     : env === "staging"
  //     ? "http://chopeshiftweb2.sghachi.com/application/public/api"
  //     : "http://localhost:8000/api"
  baseURL: url,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

const Api = () =>
  //   const token = Store.state.token;
  //   if (token != null) {
  //     BaseApi.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  //   }
  BaseApi

BaseApi.interceptors.response.use(
  function (response) {
    return response.data
  },
  function (error) {
    if (error.response.status === 401) {
      return error.response
    }
    if (error.response.status === 429) {
      console.log('Too many requests.')
      window.location.href = '/login'
    }
    if (error.response.status === 403) {
      // window.location.href = "/login";
    }
    if (error.response.status === 404) {
      // store.dispatch("Auth/logout");
      // router.push({ path: '/dashboard' }, () => { })
    }
    if (error.response.status === 500) {
      //   notify(error.response.statusText);
    }
    if (error.response.status === 422) {
      return error.response
    }
    return Promise.reject(error.response)
  },
)

export default Api
