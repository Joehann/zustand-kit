import type { ZustandKit } from '../types'

const setApiResponse: ZustandKit.SetApiResponse =
  (setStore) =>
  (path, status, message = '') => {
    setStore(path, {
      status,
      message,
    })
  }

export default setApiResponse
