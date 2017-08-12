import { Environment } from 'relay-runtime'
import { DefaultNetwork } from './Network'
import { DefaultStore } from './Store'


/*
* EnvironmentManager has a _instances of Environment
*
*
*/
class EnvironmentManager {
  constructor() {
    this._instances = {}
  }

  init() {
    this.setEnvironment("baseEnvironment")
  }

  setEnvironment(environmentName, network, store) {
    if(!environmentName) {
      console.error("EnvironmentManager.setEnvironment(environmentName) need an unique name for new environment.");
      return
    }
    const newEnvironment = new Environment({
      network: network || DefaultNetwork,
      store: store || DefaultStore,
    });

    this._instances[environmentName] = newEnvironment
  }

  getEnvironmentInstance(environmentName) {
    return this._instances[environmentName] ? this._instances[environmentName] : this._instances["baseEnvironment"]
  }

  getEnvironmentInstances() {
    return this._instances
  }
}

function managerFactory() {
  let manager = null
  return function() {
    if(manager === null) {
      manager = new EnvironmentManager()
      manager.init()
    }
    return manager
  }
}

export default {
  getManager: managerFactory()
}
