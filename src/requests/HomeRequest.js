import axios from 'axios'
import config from '../config'

const { apiUrl } = config

const source = axios.CancelToken.source()

export const HomeRequest = {

  cancelRequest: () => {
    source.cancel()
  },

  getCongNoTaiSan: () => {
    axios.defaults.withCredentials = true;
    var request = axios({
      baseURL: apiUrl,
      url: 'api/resource/HLGas_CongNoTaiSan',
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      },
      exposedHeaders: ["Set-Cookie"],
      crossDomain: true,
      withCredentials: true
    });
  },

  getDocumentDetail: (payload) => {
    return axios({
      method: 'post',
      baseURL: apiUrl,
      headers:{
        'Content-Type': 'application/json'
      },
      url: '/fe/documents/retrieve',
      data:payload
    })
  },


}
