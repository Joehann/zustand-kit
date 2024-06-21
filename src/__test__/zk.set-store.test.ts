import _zk from '..'

describe('setStore', () => {
  it('should set data at specified path', () => {
    const mockMutator = jest.fn((callback) => callback({}))
    const path = 'user.name'
    const data = 'John Doe'

    _zk.setStore(mockMutator)(path, data)
    expect(mockMutator).toHaveBeenCalled()
    expect(mockMutator.mock.calls[0][0]({})).toEqual({
      user: { name: 'John Doe' },
    })
  })
})
