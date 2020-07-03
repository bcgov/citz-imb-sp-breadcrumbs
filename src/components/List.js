import { GetList } from 'citz-imb-sp-utilities'

export const List = () => {
	return new Promise((resolve, reject) => {
		if (typeof _spPageContextInfo.pageListId !== 'undefined') {
			GetList({
				listGUID: _spPageContextInfo.pageListId,
			}).then((response) => {
				if(response.Title.toLowerCase() === "site pages" || response.Title.toLowerCase() === "pages"){
					resolve()
				} else {
					resolve({
						Title: response.Title,
						Url: response.RootFolder.ServerRelativeUrl,
					})
				}
			})
		} else {
			resolve()
		}
	})
}
