import _zk from '..'

describe('actionAndStoreWithResHandling', () => {
  it('should handle successful API response', async () => {
    const mutator = jest.fn((callback) => callback({}))
    const fetchFunction = jest.fn().mockResolvedValue('data received')

    await _zk.actionAndStoreWithResHandling(mutator, 'httpResponse')(
      'path',
      fetchFunction
    )

    expect(fetchFunction).toHaveBeenCalled()
    expect(mutator).toHaveBeenCalledTimes(3)
  })

  it('should handle API response failure', async () => {
    const mutator = jest.fn((callback) => callback({}))
    const fetchFunction = jest
      .fn()
      .mockRejectedValue(new Error('Failed to fetch'))

    await _zk.actionAndStoreWithResHandling(mutator, 'httpResponse')(
      'path',
      fetchFunction
    )

    expect(fetchFunction).toHaveBeenCalled()
    expect(mutator).toHaveBeenCalledTimes(2)
  })
})
