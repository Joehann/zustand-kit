import _zk from '..'

describe('setApiResponse', () => {
  it('should correctly set API response status and message', () => {
    const setStore = jest.fn()
    const path = 'api.status'
    const status = 'error'
    const message = 'Something went wrong'

    _zk.setApiResponse(setStore)(path, status, message)
    expect(setStore).toHaveBeenCalledWith(path, { status, message })
  })
})
