import { GetSite } from 'citz-imb-sp-utilities'

export const Sites = () => {
	return new Promise((resolve, reject) => {
		let siteAbsoluteUrl = _spPageContextInfo.siteAbsoluteUrl
		let webAbsoluteUrl = _spPageContextInfo.webAbsoluteUrl

		if (siteAbsoluteUrl === webAbsoluteUrl) {
			resolve([])
		} else {
			let siteTree = webAbsoluteUrl
				.replace(`${siteAbsoluteUrl}/`, '')
				.split('/')
			let currentNode = siteAbsoluteUrl
			let fetchArray = []

			for (let i = 0; i < siteTree.length; i++) {
				currentNode += `/${siteTree[i]}`
				fetchArray.push(GetSite({ baseurl: currentNode }))
			}

			Promise.all(fetchArray).then((response) => {
				resolve(
					response.map((node) => {
						return {
							Title: node.Title,
							Url: node.Url,
						}
					})
				)
			})
		}
	})
}
