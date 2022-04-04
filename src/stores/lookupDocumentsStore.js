import { action, observable } from 'mobx'
import { LookupDocumentsRequest } from '../requests/LookupDocumentsRequest'

class LookupDocumentsStore {

  @observable documents = {}
  @observable documentsInfo = {}

  @action getDocuments = (payload) => {
    return new Promise((resolve, reject) => {
      LookupDocumentsRequest.getDocuments(payload).then(response => {
        this.documents = response.data
        resolve(response.data)
      }).catch(error => {
        reject(error)
      })
    })
  }

  @action getDocumentDetail = (payload) => {
    return new Promise((resolve, reject) => {
      LookupDocumentsRequest.getDocumentDetail(payload).then(response => {
        this.documentsInfo = response.data
        resolve(response.data)
      }).catch(error => {
        reject(error)
      })
    })
  }


}

export default new LookupDocumentsStore()