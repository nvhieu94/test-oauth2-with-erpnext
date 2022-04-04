import axios from 'axios'
import config from '../config'

const { apiUrl } = config

const source = axios.CancelToken.source()

export const LookupDocumentsRequest = {

  cancelRequest: () => {
    source.cancel()
  },

  getDocuments: (payload) => {
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
