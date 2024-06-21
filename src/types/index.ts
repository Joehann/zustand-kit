export namespace ZustandKit {
  export type SetStore = (
    mutator: (arg: (state: Record<string, unknown>) => typeof state) => void
  ) => (path: string, data: unknown) => void

  export type SetApiResponse = (
    setStore: ReturnType<SetStore>
  ) => (
    path: string,
    status: HttpResponse['status'],
    message?: HttpResponse['message']
  ) => void

  export type ActionAndStoreWithResHandling = (
    mutator: Parameters<SetStore>[0]
  ) => (path: string, fetchFunction: () => Promise<unknown>) => Promise<void>

  export type HttpResponse = {
    status: 'loading' | 'success' | 'error' | null | undefined
    message?: string | null | undefined
  }

  export type ApiDataWithHandling<T> = {
    data: T
    httpResponse: HttpResponse
  }
}
