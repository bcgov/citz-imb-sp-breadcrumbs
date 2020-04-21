import React, { useState } from 'react'
import { GetSite, GetSiteParent } from 'citz-imb-sp-utilities'

export const WebLinks = () => {
    const [webs, setWebs] = useState([])

	GetSite().then((response) => {
		console.log(`response`, response)

		let parent = response.ParentWeb
		console.log(`parent`,parent)

		GetSiteParent(parent).then(response2=>{
			console.log(`response2`, response2)
		})


	})

	return <div>Webs</div>
}
