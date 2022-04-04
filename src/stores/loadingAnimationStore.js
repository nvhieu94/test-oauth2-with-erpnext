import { action, autorun, observable } from 'mobx'

class LoadingAnimationStore {

  constructor() {
    autorun(() => {
      this.isVisible = this.loadingQueue.length !== 0
    })
  }

  /** Loading queue */
  @observable loadingQueue = []

  /** Loading spinner state */
  @observable isVisible = false
  @action showSpinner = state => {
    state
      ? this.loadingQueue.push(1)
      : this.loadingQueue.pop()
  }

  /** Clear data */
  @action clearStore = () => {
    this.isVisible = false
    this.loadingQueue.length = 0
  }

}

export default new LoadingAnimationStore()
