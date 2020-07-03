import React, { useState } from 'react'
import { Link } from '@material-ui/core'
import { GetCollection } from 'citz-imb-sp-utilities'

export const ListLink = () => {
    const [listName, setlistName] = useState('List')
    const [href, setHref] = useState('#')

	GetCollection().then((response) => {

	})

	return <Link href={href}>{listName}</Link>
}
