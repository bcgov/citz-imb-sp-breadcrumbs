import { Fetch, isGuid } from '../Fetch'
import { GetOptions } from '../index'

export const GetList = async (
  listName: string,
  { expand, filter, select }: GetOptions = {}
): Promise<Record<string, unknown>> => {
  let endPoint = ''

  if (isGuid(listName)) {
    endPoint = `/_api/web/Lists('${listName}')`
  } else {
    endPoint = `/_api/web/Lists/getByTitle('${listName}')`
  }

  let endPointParameters = []

  if (expand) endPointParameters.push(`$expand=${expand}`)
  if (filter) endPointParameters.push(`$filter=${filter}`)
  if (select) endPointParameters.push(`$select=${select}`)

  if (endPointParameters.length)
    endPoint = `${endPoint}?${endPointParameters.join('&')}`

  try {
    const response = await Fetch(endPoint)

    if (response) {
      return response
    } else {
      return {}
    }
  } catch (error) {
    console.error('GetList error :>> ', {
      listName,
      expand,
      filter,
      select,
    })
    return {}
  }
}
