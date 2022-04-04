import axios from 'axios'
import config from '../config'

const { apiUrl } = config

const source = axios.CancelToken.source()

export const AuthenticationRequest = {
  cancelRequest: () => {
    source.cancel()
  },
  userLogin: (payload) => {
    axios.defaults.withCredentials = true;
    return axios({
      method: 'get',
      baseURL: apiUrl,
      url: 'api/method/login',
      headers: {
        'Content-Type': 'application/json'
      },
      exposedHeaders: ["Set-Cookie"],
      params: payload,
      crossDomain: true,
      withCredentials: true
    })
  },
}
