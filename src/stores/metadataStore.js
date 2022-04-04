import { action, observable } from 'mobx'
import { MetadataRequest } from '../requests/MetadataRequest'

class MetadataStore {

  @observable departments = []
  @observable warehouses = []
  @observable phongLookup = []
  @observable physicalStateList = []
  @observable warrantyList = []
  @observable documentCategories = []
  @observable formList = []
  @observable userList = []
  @observable roleList = []
  @observable confidentialityList = []
  @action getDepartments = () => {
    return new Promise((resolve, reject) => {
      MetadataRequest.getDepartments().then(response => {
        this.departments = response.data
        resolve(response.data)
      }).catch(error => {
        reject(error)
      })
    })
  }

  @action getWarehouses = () => {
    return new Promise((resolve, reject) => {
      MetadataRequest.getWarehouses().then(response => {
        this.warehouses = response.data
        resolve(response.data)
      }).catch(error => {
        reject(error)
      })
    })
  }

  @action getPhongLookup = () => {
    return new Promise((resolve, reject) => {
      MetadataRequest.getPhongLookup().then(response => {
        this.phongLookup = response.data
        resolve(response.data)
      }).catch(error => {
        reject(error)
      })
    })
  }

  @action getPhysicalState = () => {
    return new Promise((resolve, reject) => {
      MetadataRequest.getPhysicalState().then(response => {
        this.physicalStateList = response.data
        resolve(response.data)
      }).catch(error => {
        reject(error)
      })
    })
  }
  @action getWarranty = () => {
    return new Promise((resolve, reject) => {
      MetadataRequest.getWarranty().then(response => {
        this.warrantyList = response.data
        resolve(response.data)
      }).catch(error => {
        reject(error)
      })
    })
  }

  @action getDocumentCategories = () => {
    return new Promise((resolve, reject) => {
      MetadataRequest.getDocumentCategories().then(response => {
        this.documentCategories = response.data
        resolve(response.data)
      }).catch(error => {
        reject(error)
      })
    })
  }

  @action getForms = () => {
    return new Promise((resolve, reject) => {
      MetadataRequest.getForms().then(response => {
        this.formList = response.data
        resolve(response.data)
      }).catch(error => {
        reject(error)
      })
    })
  }

  @action getUsers = () => {
    return new Promise((resolve, reject) => {
      MetadataRequest.getUsers().then(response => {
        this.userList = response.data
        resolve(response.data)
      }).catch(error => {
        reject(error)
      })
    })
  }

  @action getRoles = () => {
    return new Promise((resolve, reject) => {
      MetadataRequest.getRoles().then(response => {
        this.roleList = response.data
        resolve(response.data)
      }).catch(error => {
        reject(error)
      })
    })
  }

  @action getConfidentialities = () => {
    return new Promise((resolve, reject) => {
      MetadataRequest.getConfidentialities().then(response => {
        this.confidentialityList = response.data
        resolve(response.data)
      }).catch(error => {
        reject(error)
      })
    })
  }

}

export default new MetadataStore()