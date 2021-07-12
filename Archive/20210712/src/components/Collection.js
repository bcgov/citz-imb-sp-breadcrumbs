import { GetSite } from 'citz-imb-sp-utilities'

export const Collection = () => {
	return new Promise((resolve, reject) => {
		GetSite({ baseurl: _spPageContextInfo.siteAbsoluteUrl }).then(
			(response) => {
				resolve({
					Title: response.Title,
					Url: response.Url,
				})
			}
		)
	})
}
