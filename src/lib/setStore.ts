import { set, cloneDeep } from 'lodash'
import type { ZustandKit } from '../types'

const setStore: ZustandKit.SetStore = (mutator) => (path, data) => {
  mutator((state) => set(cloneDeep(state), path, data))
}

export default setStore
