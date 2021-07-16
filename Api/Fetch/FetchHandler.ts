/**
 *  performs the fetch, processes and returns the response
 * @param url - the fully formed url with endpoint
 * @param options - Request options
 * @returns
 */
export const FetchHandler = async <T>(
  url: string,
  options: RequestInit = {}
): Promise<T | null> => {
  options.headers = {
    ...options.headers,
    Accept: 'application/json;odata=verbose',
    'content-type': 'application/json;odata=verbose',
  }

  try {
    const response = await fetch(url, options)

    if (response.ok) {
      if (response.status === 204) return null

      if (response.status === 304)
        console.warn(`${response.status} ${response.statusText} ${url}`)

      return response.json()
    }

    return null
  } catch (error) {
    console.groupCollapsed(error.name)
    console.error(error.message)
    console.groupEnd()
    return null
  }
}
