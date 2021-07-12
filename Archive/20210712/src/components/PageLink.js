import React, { useState } from 'react'
import { Link } from '@material-ui/core'
import { GetCollection } from 'citz-imb-sp-utilities'

export const PageLink = () => {
    const [pageName, setPageName] = useState('Page')
    const [href, setHref] = useState('#')

	GetCollection().then((response) => {

	})

	return <Link href={href}>{pageName}</Link>
}
