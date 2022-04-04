import axios from 'axios'
import config from '../config'

const { apiUrl } = config

const source = axios.CancelToken.source()

export const MenuRequest = {

  cancelRequest: () => {
    source.cancel()
  },

  getMenuList: () => {
    return axios({
      method: 'get',
      baseURL: apiUrl,
      url: '/api/Menu/GetWebMenu',
    })
  }

}
