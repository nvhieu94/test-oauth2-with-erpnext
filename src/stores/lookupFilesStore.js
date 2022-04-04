import { action, observable } from 'mobx';
import { LookupFilesRequest } from '../requests/LookupFilesRequest';

class LookupFilesStore {

  @observable files = {};
  @observable fileDetail = {};
  @observable documentsByFileId ={};
  @observable congno = [];

  @action getFiles = (payload)=> {
    return new Promise((resolve, reject) => {
      LookupFilesRequest.getFiles(payload).then(response => {
        this.files = response.data
        resolve(response.data)
      }).catch(error => {
        reject(error)
      })
    })
  }

  @action getFileDetail = (payload)=> {
    return new Promise((resolve, reject) => {
      LookupFilesRequest.getFileDetail(payload).then(response => {
        this.fileDetail = response.data
        resolve(response.data)
      }).catch(error => {
        reject(error)
      })
    })
  }

  @action getGetDocumentsByFileId = (payload)=> {
    return new Promise((resolve, reject) => {
      LookupFilesRequest.getGetDocumentsByFileId(payload).then(response => {
        this.documentsByFileId = response.data
        resolve(response.data)
      }).catch(error => {
        reject(error)
      })
    })
  }

  @action getCongNoTaiSan = ()=> {
    return new Promise((resolve, reject) => {
      LookupFilesRequest.getCongNoTaiSan().then(response => {
        this.congno = response.data
        resolve(response.data)
      }).catch(error => {
        reject(error)
      })
    })
  }

}
export default new LookupFilesStore()