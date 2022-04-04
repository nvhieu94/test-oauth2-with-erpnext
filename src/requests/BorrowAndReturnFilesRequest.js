import axios from 'axios'
import config from '../config'

const { apiUrl } = config

const source = axios.CancelToken.source()

export const BorrowAndReturnFilesRequest = {

  cancelRequest: () => {
    source.cancel()
  },

  getFiles: (payload) => {
    return axios({
      method: 'post',
      baseURL: apiUrl,
      headers: {
        'Content-Type': 'application/json'
      },
      url: '/fe/callcards/List',
      data: payload
    })
  },

  getFileDetail: (payload) => {
    return axios({
      method: 'post',
      baseURL: apiUrl,
      headers: {
        'Content-Type': 'application/json'
      },
      url: '/fe/callcards/retrieve',
      data: payload
    })
  },


  createRental: (payload) => {
    return axios({
      method: 'post',
      baseURL: apiUrl,
      headers: {
        'Content-Type': 'application/json'
      },
      url: '/fe/callcards/Create',
      data: payload
    })
  },

  updateRental: (payload) => {
    return axios({
      method: 'post',
      baseURL: apiUrl,
      headers: {
        'Content-Type': 'application/json'
      },
      url: '/fe/callcards/Update',
      data: payload
    })
  },

  deleteRental: (payload) => {
    return axios({
      method: 'post',
      baseURL: apiUrl,
      headers: {
        'Content-Type': 'application/json'
      },
      url: '/fe/callcards/Delete',
      data: payload
    })
  },

  deleteMultipleRental: (payload) => {
    return axios({
      method: 'post',
      baseURL: apiUrl,
      headers: {
        'Content-Type': 'application/json'
      },
      url: '/fe/callcards/DeleteMultiple',
      data: payload
    })
  },

  getExcelList: (payload) => {
    return axios({
      method: 'post',
      baseURL: apiUrl,
      headers: {
        'Content-Type': 'application/json'
      },
      url: '/fe/callcards/ListExcel',
      data: payload
    })
  },

}
