import React, { useState } from 'react'
import { Link } from '@material-ui/core'
import { GetCollection } from 'citz-imb-sp-utilities'

export const CollectionLink = () => {
    const [collectionName, setCollectionName] = useState('Collection')
    const [href, setHref] = useState('#')

	GetCollection().then((response) => {
        setCollectionName(response.Title)
        setHref(response.Url)
	})

	return <Link href={href}>{collectionName}</Link>
}
