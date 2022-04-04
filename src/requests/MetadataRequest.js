import axios from 'axios'
import config from '../config'

const { apiUrl } = config

const source = axios.CancelToken.source()

export const MetadataRequest = {

  cancelRequest: () => {
    source.cancel()
  },

  getDepartments: () => {
    return axios({
      method: 'get',
      baseURL: apiUrl,
      url: '/fe/common/departments',
      headers:{
        'Content-Type': 'application/json'
      },
    })
  },

  getWarehouses: () => {
    return axios({
      method: 'get',
      baseURL: apiUrl,
      url: '/fe/common/Warehouses',
      headers:{
        'Content-Type': 'application/json'
      },
    })
  },

  getPhongLookup: () => {
    return axios({
      method: 'get',
      baseURL: apiUrl,
      url: '/fe/common/PhongLookup',
      headers:{
        'Content-Type': 'application/json'
      },
    })
  },

  getPhysicalState: () => {
    return axios({
      method: 'get',
      baseURL: apiUrl,
      url: '/fe/common/PhysicalState',
      headers:{
        'Content-Type': 'application/json'
      },
    })
  },

  getWarranty: () => {
    return axios({
      method: 'get',
      baseURL: apiUrl,
      url: '/fe/common/Warranty',
      headers:{
        'Content-Type': 'application/json'
      },
    })
  },

  getDocumentCategories: () => {
    return axios({
      method: 'get',
      baseURL: apiUrl,
      url: '/fe/common/DocumentCategories',
      headers:{
        'Content-Type': 'application/json'
      },
    })
  },

  getForms: () => {
    return axios({
      method: 'get',
      baseURL: apiUrl,
      url: '/fe/common/Forms',
      headers:{
        'Content-Type': 'application/json'
      },
    })
  },

  getUsers: () => {
    return axios({
      method: 'get',
      baseURL: apiUrl,
      url: '/fe/common/users',
      headers:{
        'Content-Type': 'application/json'
      },
    })
  },
  getRoles: () => {
    return axios({
      method: 'get',
      baseURL: apiUrl,
      url: '/fe/common/roles',
      headers:{
        'Content-Type': 'application/json'
      },
    })
  },

  getConfidentialities: () => {
    return axios({
      method: 'get',
      baseURL: apiUrl,
      url: '/fe/common/Confidentialities ',
      headers:{
        'Content-Type': 'application/json'
      },
    })
  },

}
