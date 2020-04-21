import React from 'react'
import './App.css'
import { Breadcrumbs, Link } from '@material-ui/core'
import { CollectionLink } from './components/CollectionLink'
import { WebLinks } from './components/WebLinks'
import { FolderLinks } from './components/FolderLinks'
import { ListLink } from './components/ListLink'
import { PageLink } from './components/PageLink'

function App() {
	return (
		<nav className='App'>
			<Breadcrumbs>
				<CollectionLink />
				<WebLinks />
				<ListLink />
				<FolderLinks />
				<PageLink />
			</Breadcrumbs>
		</nav>
	)
}

export default App
