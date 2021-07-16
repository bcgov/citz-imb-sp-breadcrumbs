import { Breadcrumb, IBreadcrumbItem } from '@fluentui/react/lib/Breadcrumb'
import { useEffect, useState } from 'react'
import { GetList } from '../Api'

export const App = () => {
  const [breadCrumbItems, setBreadCrumbItems] = useState<IBreadcrumbItem[]>([])

  const getSites = async () => {
    if (
      _spPageContextInfo.siteAbsoluteUrl === _spPageContextInfo.webAbsoluteUrl
    ) {
      //root site
      return [
        {
          key: 'root',
          text: _spPageContextInfo.webTitle,
          href: _spPageContextInfo.siteAbsoluteUrl,
        },
      ]
    } else {
      console.log('_spPageContextInfo :>> ', _spPageContextInfo)
      return [
        {
          key: 'site1',
          text: 'Site 1',
          href: '#/controls/web/breadcrumb',
          as: 'a',
        },
        {
          key: 'site2',
          text: 'Site 2',
          href: '#/controls/web/breadcrumb',
          as: 'a',
        },
      ]
    }
  }

  const getList = async () => {
    const list = await GetList(_spPageContextInfo.pageListId, {
      expand: 'ParentWeb,RootFolder',
    })

    if (list.EntityTypeName === 'SitePages') {
      return []
    } else {
      console.log('list :>> ', list)
      return [
        {
          key: 'list',
          text: 'list',
          href: '#/controls/web/breadcrumb',
          as: 'a',
        },
      ]
    }
  }

  const getFolders = async () => {
    const urlParams = new URLSearchParams(window.location.search)

    let rootFolder = urlParams.get('RootFolder')
    let folders = []

    let baseUrl = _spPageContextInfo.webServerRelativeUrl

    if (rootFolder) {
      rootFolder = rootFolder.replace(baseUrl, '')
      folders = rootFolder.split('/')
      //remove first blank element
      folders.shift()

      //remove 'Lists'
      if (folders[0] === 'Lists') {
        baseUrl = `${baseUrl}/${folders.shift()}`
      }

      //remove the list / library name
      baseUrl = `${baseUrl}/${folders.shift()}`

      return folders.map((folder, index) => {
        baseUrl = `${baseUrl}/${folder}`
        return {
          key: `folder_${index}`,
          text: folder,
          href: baseUrl,
        }
      })
    } else {
      return []
    }
  }

  const getPage = async () => {
    const href = window.location.href
    const page = href.split('/').pop()?.split('.')[0] ?? ''

    return [
      {
        key: 'page',
        text: page,
        href,
        isCurrentItem: true,
      },
    ]
  }

  const getBreadcrumb = async () => {
    const sites = await getSites()
    const list = await getList()
    const folders = await getFolders()
    const page = await getPage()

    setBreadCrumbItems([...sites, ...list, ...folders, ...page])
  }

  useEffect(() => {
    getBreadcrumb()
  }, [])

  return (
    <div>
      <Breadcrumb
        items={breadCrumbItems}
        // maxDisplayedItems={3}
        // ariaLabel="Breadcrumb with items rendered as links"
        // overflowAriaLabel="More links"
      />
    </div>
  )
}
