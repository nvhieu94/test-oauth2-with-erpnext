import { action, observable } from 'mobx';
import { BorrowAndReturnFilesRequest } from '../requests/BorrowAndReturnFilesRequest';

class BorrowAndReturnFilesStore {

  @observable files = {};
  @observable fileDetail = {};
  @observable documentsByFileId = {};

  @action getFiles = (payload) => {
    return new Promise((resolve, reject) => {
      BorrowAndReturnFilesRequest.getFiles(payload).then(response => {
        this.files = response.data
        resolve(response.data)
      }).catch(error => {
        reject(error)
      })
    })
  }

  @action getFileDetail = (payload) => {
    return new Promise((resolve, reject) => {
      BorrowAndReturnFilesRequest.getFileDetail(payload).then(response => {
        this.fileDetail = response.data
        resolve(response.data)
      }).catch(error => {
        reject(error)
      })
    })
  }




  @action createRental = (payload) => {
    return new Promise((resolve, reject) => {
      BorrowAndReturnFilesRequest.createRental(payload).then(response => {

        resolve(response.data)
      }).catch(error => {
        reject(error)
      })
    })
  }

  @action updateRental = (payload) => {
    return new Promise((resolve, reject) => {
      BorrowAndReturnFilesRequest.updateRental(payload).then(response => {

        resolve(response.data)
      }).catch(error => {
        reject(error)
      })
    })
  }

  @action deleteRental = (payload) => {
    return new Promise((resolve, reject) => {
      BorrowAndReturnFilesRequest.deleteRental(payload).then(response => {

        resolve(response.data)
      }).catch(error => {
        reject(error)
      })
    })
  }
  @action deleteMultipleRental = (payload) => {
    return new Promise((resolve, reject) => {
      BorrowAndReturnFilesRequest.deleteMultipleRental(payload).then(response => {
        resolve(response.data)
      }).catch(error => {
        reject(error)
      })
    })
  }

  @action getExcelList = (payload) => {
    return new Promise((resolve, reject) => {
      BorrowAndReturnFilesRequest.getExcelList(payload).then(response => {
        resolve(response.data)
      }).catch(error => {
        reject(error)
      })
    })
  }

}
export default new BorrowAndReturnFilesStore()