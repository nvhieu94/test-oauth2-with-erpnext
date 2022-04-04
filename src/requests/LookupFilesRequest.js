import axios from 'axios'
import config from '../config'

const { apiUrl } = config

const source = axios.CancelToken.source()

export const LookupFilesRequest = {

  cancelRequest: () => {
    source.cancel()
  },

  getFiles: (payload) => {
    return axios({
      method: 'post',
      baseURL: apiUrl,
      headers:{
        'Content-Type': 'application/json'
      },
      url: '/fe/files/List',
      data:payload
    })
  },

  getFileDetail: (payload) => {
    return axios({
      method: 'post',
      baseURL: apiUrl,
      headers:{
        'Content-Type': 'application/json'
      },
      url: '/fe/files/retrieve',
      data:payload
    })
  },

  getGetDocumentsByFileId: (payload) => {
    return axios({
      method: 'post',
      baseURL: apiUrl,
      headers:{
        'Content-Type': 'application/json'
      },
      url: '/fe/documents/list',
      data:payload
    })
  },

  getCongNoTaiSan: () => {
    axios.defaults.withCredentials = true;
    return axios({
      baseURL: apiUrl,
      url: 'api/resource/HLGas_CongNoTaiSan',
      method: 'get',
      headers: {
        'Content-Type': 'application/json'
      },
      exposedHeaders: ["Set-Cookie"],
      crossDomain: true,
      withCredentials: true
    })
  },


}
