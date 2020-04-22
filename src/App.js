import React, { useState, useEffect, Fragment } from 'react'
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
	const [pageHref, setPageHref] = useState()

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
	const viewParam = urlParams.get('View')

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
		GetCollection().then((response) => {
			setCollectionName(response.Title)
			setCollectionHref(response.Url)
		})

		recurseSites(collRelUrl, siteRelUrl)

		GetList({ listGUID: pageListId }).then((response) => {
			if(response.Title !== 'Site Pages' && response.Title !== 'Pages'){
				setListHref(response.RootFolder.ServerRelativeUrl)
				setListName(response.Title)
			}

			if (rootFolderParam) {
				let folders = rootFolderParam
					.replace(response.RootFolder.ServerRelativeUrl + '/', '')
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

		if (viewParam) {
			GetListViews({ listGUID: pageListId, viewGUID: viewParam }).then(
				(response) => {
					setPageName(response.Title)
				}
			)
		} else {
			setPageName(window.location.href.split("/").slice(-1)[0].split(".")[0])
		}

		return () => {}
	}, [])

	return (
		<nav className='App'>
			<Breadcrumbs>
				<Link href={collectionHref}>{collectionName}</Link>
				{webs.length ? webs.map((site, index) => (
					<Link href={site.RelativeUrl}>{site.Title}</Link>
				)): 'webs'}
				{listname ? <Link href={listHref}>{listName}</Link> : 'list'}

				{folders.map((folder, index) => (
					<Link href={folder.RelativeUrl}>{folder.Title}</Link>
				))}
				<Typography>{pageName}</Typography>
			</Breadcrumbs>
		</nav>
	)
}

export default App
