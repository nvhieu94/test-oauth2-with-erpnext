import axios from 'axios'
import config from '../config'

const { apiUrl } = config

const source = axios.CancelToken.source()

export const CommonRequest = {

  cancelRequest: () => {
    source.cancel()
  },

  getDocumentFileContent: (payload) => {
    return axios({
      method: 'post',
      baseURL: apiUrl,
      url: '/fe/documents/DocumentFileContent',
      responseType: 'blob',
      headers:{
        'Content-Type': 'application/json',
        'Accept': 'application/pdf'
      },
      data:payload
    })
  },




}
