import PageContainerStore from './pageContainer'

class RootStore {
  pageContainer: PageContainerStore

  constructor() {
    this.pageContainer = new PageContainerStore()
  }
}

export default RootStore
