import React, { Component } from 'react'
import { Link } from '@material-ui/core'

export class FolderBreadcrumb extends Component {
    handleClick = event => {
        event.preventDefault();
        console.info('You clicked a breadcrumb.');
    }

    render() {
        return (
            <Link color="primary" href="#" onClick={this.handleClick}>
                Folder
            </Link>
        )
    }
}

export default FolderBreadcrumb
