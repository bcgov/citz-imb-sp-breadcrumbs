import React from 'react'
import { Link } from '@material-ui/core'

export default function SiteLink(props) {
    return (
        <Link key={props.id} color='primary' href={props.url}>
            {props.title}
        </Link>
    )
}
