export const Folders = () => {
	/*
    list: ?RootFolder=%2Fsites%2FDEV%2Fscott%2Fprojects%2FLists%2FAccomplishments%2FList%20Folder%201%2FList%20Folder%202&FolderCTID=0x01200043C9524CAFD77E48B282068C39285518&View=%7B69A7B83D-2538-457E-9108-865D0116E0BF%7D
    library: ?RootFolder=%2Fsites%2FDEV%2Fscott%2Fprojects%2FSiteAssets%2FFolder%201%2FFolder%202&FolderCTID=0x01200016636BC176506C45805D15C12E1A16B7&View=%7B373F29F3-1D6A-4DDB-8861-04C9084899ED%7D
*/

	return new Promise((resolve, reject) => {
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

			resolve(
				folders.map((folder, index) => {
					baseUrl = `${baseUrl}/${folder}`
					return { Title: folder, Url: baseUrl, Id: index }
				})
			)
		} else {
			resolve([])
		}
	})
}
