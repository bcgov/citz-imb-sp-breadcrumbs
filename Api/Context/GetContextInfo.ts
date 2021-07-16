import { FetchHandler } from '../Fetch/FetchHandler'

export const GetContextInfo = async () => {
  const siteAbsoluteUrl = _spPageContextInfo.siteAbsoluteUrl

  const endPoint = `${siteAbsoluteUrl}/_api/contextinfo`

  try {
    const response = await FetchHandler<{d:{GetContextWebInformation:{}}}>(endPoint, {
      method: 'post',
      headers: {
        Accept: 'application/json;odata=verbose',
        'content-type': 'application/json;odata=verbose',
      },
    })
    console.log(`response`, response)
    if (response) {
      return response.d.GetContextWebInformation
    } else {
      return {}
    }
  } catch (error) {
    console.error('GetList error :>> ', endPoint)
  }
}
