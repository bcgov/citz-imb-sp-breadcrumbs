//import { GetFormDigestValue } from '../GetFormDigestValue/GetFormDigestValue';
import { FetchHandler } from './FetchHandler'

export interface PrepareFetchOptions extends RequestInit {
  /**
   * A string to set request's method.
   */
  method?: 'get' | 'post' | 'merge' | 'patch' | 'delete'
}

/**
 *
 * @param endPoint - SharePoint Rest <a href='https://docs.microsoft.com/en-us/sharepoint/dev/sp-add-ins/determine-sharepoint-rest-service-endpoint-uris?tabs=csom' target='_blank'>endpoint</a> without the url
 * @param options - Request options
 * @returns
 */
export const Fetch = async (
  endPoint: string,
  options: PrepareFetchOptions = {}
): Promise<unknown> => {
  const { method = 'get', body, headers, cache } = options

  const webAbsoluteUrl = _spPageContextInfo.webAbsoluteUrl

  //   let options = { method: method }

  // console.log('typeof body :>> ', typeof body)
  //if (typeof body !== 'string') body = JSON.stringify(body)

  //   if (headers) {
  //     options.headers = headers
  //   } else {
  // headers = {
  // Accept: 'application/json;odata=verbose',
  // 'content-type': 'application/json;odata=verbose',
  // }
  //   }
  //   if (cache) {
  //     options.cache = cache
  //   } else {
  //     if (method === 'get') {
  //       options.headers['Cache-Control'] = 'no-cache'
  //       options.headers['Pragma'] = 'no-cache'
  //     }
  //   }

  //   let fetchResponse
  //   let formDigestValue

  switch (method.toLowerCase()) {
    case 'get':
      //!no additional processing
      break
    case 'post':
      // formDigestValue = await GetFormDigestValue(webAbsoluteUrl)
      // options.headers['X-RequestDigest'] = formDigestValue
      break
    case 'merge':
      // formDigestValue = await GetFormDigestValue(webAbsoluteUrl)
      // options.headers['X-RequestDigest'] = formDigestValue
      // options.headers['X-HTTP-Method'] = 'MERGE'
      // options.headers['If-Match'] = '*'
      // options.method = 'post'
      break
    case 'patch':
      // formDigestValue = await GetFormDigestValue(webAbsoluteUrl)
      // options.headers['X-RequestDigest'] = formDigestValue
      // options.headers['X-HTTP-Method'] = 'PATCH'
      // options.headers['If-Match'] = '*'
      // options.method = 'post'
      break
    case 'delete':
      // formDigestValue = await GetFormDigestValue(webAbsoluteUrl)
      // options.headers['X-RequestDigest'] = formDigestValue
      // options.headers['X-HTTP-Method'] = 'DELETE'
      // options.headers['If-Match'] = '*'
      // options.method = 'post'
      break
    default:
      console.warn(
        `method '${options.method}' does not have a case handler in RestCall`
      )
  }

  const response = await FetchHandler<{ d: unknown }>(
    `${webAbsoluteUrl}${endPoint}`
  )

  if (response) {
    return response.d
  } else {
    return null
  }
}
