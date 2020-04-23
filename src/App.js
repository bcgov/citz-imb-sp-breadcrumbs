import React, { useState, useEffect } from 'react'
import './App.css'
import { Breadcrumbs, Link, Typography } from '@material-ui/core'
import {
	GetCollection,
	GetSite,
	GetList,
	GetListViews,
} from 'citz-imb-sp-utilities'

function App() {
	const [webs, setWebs] = useState([])
	const [collectionName, setCollectionName] = useState()
	const [collectionHref, setCollectionHref] = useState()
	const [listName, setListName] = useState()
	const [listHref, setListHref] = useState()
	const [folders, setFolders] = useState([])
	const [pageName, setPageName] = useState()

	// eslint-disable-next-line
	const collRelUrl = _spPageContextInfo.siteServerRelativeUrl
	// eslint-disable-next-line
	const collUrl = _spPageContextInfo.siteAbsoluteUrl
	// eslint-disable-next-line
	const siteRelUrl = _spPageContextInfo.webServerRelativeUrl
	// eslint-disable-next-line
	const pageListId = _spPageContextInfo.pageListId
	const urlParams = new URLSearchParams(window.location.search)
	const rootFolderParam = urlParams.get('RootFolder')

	const recurseSites = (collRelUrl, siteRelUrl, index = 0) => {
		if (index > 10) return Promise.reject('too deep')
		return new Promise((resolve) => {
			if (collRelUrl === siteRelUrl) {
				return resolve()
			} else {
				return GetSite(siteRelUrl).then((response) => {
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

	const getPageName = () => {
		const urlPath = document.location.pathname
		const pageTitleEl = document.getElementById('pageTitle')
		const titleEl = document.getElementById(
			'DeltaPlaceHolderPageTitleInTitleArea'
		)

		if (urlPath.includes('SitePages') || urlPath.includes('Pages')) {
			return window.location.href.split('/').slice(-1)[0].split('.')[0]
		} else if (urlPath.includes('_layouts')) {
			switch (titleEl.children.length) {
				case 0:
					return pageTitleEl.children[0].innerText.trim()
				case 1:
					if (urlPath.includes('settings')) {
						return pageTitleEl.children[0].innerText.trim()
					} else {
						setFolders([
							{
								Title: pageTitleEl.children[0].children[0].children[0].children[0].innerText.trim(),
								RelativeUrl:
									pageTitleEl.children[0].children[0]
										.children[0].children[0].href,
							},
						])
						return pageTitleEl.children[0].children[0].children[2].innerText.trim()
					}
				case 2:
					if (
						urlPath.includes('people') ||
						urlPath.includes('SiteDataAlerts')
					) {
						return pageTitleEl.children[0].children[1].innerText.trim()
					} else {
						setFolders([
							{
								Title: pageTitleEl.children[0].children[0].innerText.trim(),
								RelativeUrl:
									pageTitleEl.children[0].children[0].href,
							},
						])
						return pageTitleEl.children[0].childNodes[4].textContent.trim()
					}
				default:
					return
			}
		} else {
			return ''
		}
	}

	useEffect(() => {
		GetCollection().then((response) => {
			setCollectionName(response.Title)
			setCollectionHref(response.Url)
		})

		recurseSites(collRelUrl, siteRelUrl)

		if (getPageName() === '') {
		} else {
			setPageName(getPageName())
		}

		if (pageListId) {
			GetList({ listGUID: pageListId }).then((response) => {
				if (
					response.Title !== 'Site Pages' &&
					response.Title !== 'Pages'
				) {
					setListHref(response.RootFolder.ServerRelativeUrl)
					setListName(response.Title)
				}

				if (rootFolderParam) {
					let folders = rootFolderParam
						.replace(
							response.RootFolder.ServerRelativeUrl + '/',
							''
						)
						.split('/')
					let folderUrl = response.RootFolder.ServerRelativeUrl

					for (let i = 0; i < folders.length; i++) {
						folderUrl = `${folderUrl}/${folders[i]}`
						setFolders((prevState) => {
							prevState.push({
								Title: folders[i],
								RelativeUrl: folderUrl,
							})

							return [...prevState]
						})
					}
				}
			})
		}

		return () => {}
	}, [])

	return (
		<nav id='breadcrumb-app'>
			<Breadcrumbs>
				<Link href={collectionHref}>{collectionName}</Link>
				{webs.map((site, index) => (
					<Link href={site.RelativeUrl}>{site.Title}</Link>
				))}
				{listName && <Link href={listHref}>{listName}</Link>}

				{folders.map((folder, index) => (
					<Link href={folder.RelativeUrl}>{folder.Title}</Link>
				))}
				<Typography>{pageName}</Typography>
			</Breadcrumbs>
		</nav>
	)
}

export default App
