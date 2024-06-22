import { set, cloneDeep } from 'lodash'
import type { ZustandKit } from './types'

const setStore: ZustandKit.SetStore = (mutator) => (path, data) => {
  mutator((state) => set(cloneDeep(state), path, data))
}

const setApiResponse: ZustandKit.SetApiResponse =
  (setStore) =>
  (path, status, message = '') => {
    setStore(path, {
      status,
      message,
    })
  }

const processAsyncRequest: ZustandKit.ProcessAsyncRequest =
  (mutator, subpath = 'httpResponse') =>
  async (path, fetchFunction) => {
    const handleSetStore = setStore(mutator)
    const handleApiResponse = setApiResponse(handleSetStore)
    try {
      handleApiResponse(`${path}.${subpath}`, 'loading')
      const res = await fetchFunction()

      handleSetStore(`${path}.data`, res)
      handleApiResponse(`${path}.${subpath}`, 'success')
    } catch (error) {
      if (error instanceof Error) {
        handleApiResponse(`${path}.${subpath}`, 'error', error.message)
      } else {
        handleApiResponse(
          `${path}.${subpath}`,
          'error',
          'An unknown error occurred'
        )
      }
    }
  }

const httpResponse: ZustandKit.HttpResponse = {
  status: null,
  message: null,
}

const _zk = {
  setStore,
  setApiResponse,
  processAsyncRequest,
  httpResponse,
}

export default _zk
