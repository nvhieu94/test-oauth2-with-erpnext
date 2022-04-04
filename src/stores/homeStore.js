import { action, observable } from 'mobx';
import { HomeRequest } from '../requests/HomeRequest';

class HomeStore {

  @observable files = {};
  @observable fileDetail = {};
  @observable documentsByFileId ={};
  @observable congno = [];


  @action getCongNoTaiSan = ()=> {
    return new Promise((resolve, reject) => {
        HomeRequest.getCongNoTaiSan().then(response => {
        this.congno = response.data
        resolve(response.data)
      }).catch(error => {
        reject(error)
      })
    })
  }

}
export default new HomeStore()