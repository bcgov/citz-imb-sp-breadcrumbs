export const Node = () => {
	return new Promise((resolve, reject) => {
		const page = window.location.pathname
			.split('/')
			.pop()
			.split('.')
			.shift()
			.toLowerCase()

		const siteSettings = {
			Url: `${_spPageContextInfo.webAbsoluteUrl}/_layouts/15/settings.aspx`,
			Title: 'Site Settings',
		}
		const siteContents = {
			Url: `${_spPageContextInfo.webAbsoluteUrl}/_layouts/15/viewlsts.aspx`,
			Title: 'Site Contents',
		}

		let resolution = []

		if (window.location.pathname.includes('_layouts')) {
			switch (page) {
				case 'settings':
					resolution.push(siteSettings)
					break

				//pattern: site settings -> page -> group
				case 'people':
					resolution.push(siteSettings)
					resolution.push({
						Url: window.location.pathname,
						Title: document
							.getElementById(
								'DeltaPlaceHolderPageTitleInTitleArea'
							)
							.childNodes[0].nodeValue.trim(),
					})
					resolution.push({
						Url: '',
						Title: document
							.getElementById(
								'ctl00_PlaceHolderPageTitleInTitleArea_LabelGroupName'
							)
							.childNodes[0].nodeValue.trim(),
					})
					break

				//pattern: site contents -> page
				case 'viewlsts':
					resolution.push(siteContents)
					break
				case 'addanapp':
					resolution.push(siteContents)
					resolution.push({
						Url: '',
						Title: document.getElementById(
							'DeltaPlaceHolderPageTitleInTitleArea'
						).childNodes[1].childNodes[2].textContent,
					})
					break

				//pattern: page
				case '':
					resolution.push({
						Url: '',
						Title: document
							.getElementById(
								'DeltaPlaceHolderPageTitleInTitleArea'
							)
							.childNodes[0].nodeValue.trim(),
					})
					break
				//pattern: site settings -> page (alternate)
				case 'sitenavigationsettings':
				case 'designwelcomepage':
					resolution.push(siteSettings)
					resolution.push({
						Url: '',
						Title: document
							.getElementById(
								'DeltaPlaceHolderPageTitleInTitleArea'
							)
							.textContent.trim(),
					})
					break
				//pattern: site settings -> page (alternate)
				case 'areanavigationsettings':
					resolution.push(siteSettings)
					resolution.push({
						Url: '',
						Title: document
							.getElementById(
								'DeltaPlaceHolderPageTitleInTitleArea'
							)
							.childNodes[4].nodeValue.trim(),
					})
					break

				//pattern: site settings -> page
				default:
					resolution.push(siteSettings)
					resolution.push({
						Title: document.getElementById(
							'DeltaPlaceHolderPageTitleInTitleArea'
						).childNodes[1].childNodes[2].textContent,
					})
			}
		} else {
			resolution.push({
				Title: window.location.pathname
					.split('/')
					.pop()
					.split('.')
					.shift(),
			})
		}
		resolve(resolution)
	})
}
