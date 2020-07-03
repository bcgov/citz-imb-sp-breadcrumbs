import React, { useState, useEffect } from 'react'
import { Breadcrumbs, Link, Typography } from '@material-ui/core'
import { Collection } from './components/Collection'
import { Sites } from './components/Sites'
import { List } from './components/List'
import { Folders } from './components/Folders'
import { Node } from './components/Node'

export default function App() {
	const [links, setLinks] = useState([])

	useEffect(() => {
		Promise.all([Collection(), Sites(), List(), Folders(), Node()]).then(
			(response) => {
				const [collection, sites, list, folders, node] = response

				setLinks([collection, ...sites, list, ...folders, ...node])
			}
		)

		return () => {}
	}, [])
	return (
		<Breadcrumbs
			maxItems={5}
			itemsAfterCollapse={2}
			itemsBeforeCollapse={2}
			aria-label='breadcrumb'
			separator='\'>
			{links.map((link, index) => {
				if (typeof link !== 'undefined') {
					if (typeof link.Url === 'undefined') {
						return (
							<Typography key={index} color='textPrimary'>
								{link.Title}
							</Typography>
						)
					} else {
						return (
							<Link key={index} color='primary' href={link.Url}>
								{link.Title}
							</Link>
						)
					}
				}
			})}
		</Breadcrumbs>
	)
}
