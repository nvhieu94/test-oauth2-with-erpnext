import { action, observable } from 'mobx';
import { MenuRequest } from '../requests/MenuRequest';

class MenuStore {

  @observable menuList = [];

  @action getMenuList = () => {
    return new Promise((resolve, reject) => {
      MenuRequest.getMenuList().then(response => {
        this.menuList = response?.data
        resolve(response.data)
      }).catch(error => {
        reject(error)
      })
    })
  }
}
export default new MenuStore()