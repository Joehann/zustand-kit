import type { ZustandKit } from '../types'
import setApiResponse from './setApiResponse'
import setStore from './setStore'

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

export default processAsyncRequest
