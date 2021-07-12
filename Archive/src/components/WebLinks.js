import React, { useState, useEffect, Fragment } from 'react'
import { GetSite } from 'citz-imb-sp-utilities'
import { Link } from '@material-ui/core'

export const WebLinks = () => {
	const [webs, setWebs] = useState([])
	// eslint-disable-next-line
	const collRelUrl = _spPageContextInfo.siteServerRelativeUrl
	// eslint-disable-next-line
	const collUrl = _spPageContextInfo.siteAbsoluteUrl
	// eslint-disable-next-line
	const siteRelUrl = _spPageContextInfo.webServerRelativeUrl

	const recurseSites = (collRelUrl, siteRelUrl, index = 0) => {
		if (index > 5) return Promise.reject()
		return new Promise((resolve) => {
			if (collRelUrl === siteRelUrl) {
				return resolve()
			} else {
				return GetSite(collUrl + siteRelUrl).then((response) => {
					setWebs((prevState) => {
						prevState.unshift({
							Title: response.Title,
							RelativeUrl: response.ServerRelativeUrl,
						})

						return [...prevState]
					})

					index++
					recurseSites(
						collRelUrl,
						response.ParentWeb.ServerRelativeUrl,
						index
					).then((response) => {
						resolve()
					})
				})
			}
		})
	}

	useEffect(() => {
		recurseSites(collRelUrl, siteRelUrl)
		return () => {}
	}, [])

	return (
		<Fragment>
			{webs.map((site, index) => (
				<Link key={index} href={site.RelativeUrl}>{site.Title}</Link>
			))}
		</Fragment>
	)
}
