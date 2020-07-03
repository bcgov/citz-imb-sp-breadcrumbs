import React, { useState } from 'react'
import { Link } from '@material-ui/core'
import { GetSite } from 'citz-imb-sp-utilities'

export const FolderLinks = () => {
    const [folders, setFolders] = useState([])

	GetSite().then((response) => {

	})

	return <div>Folders</div>
}
