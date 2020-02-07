import React, { Component} from 'react'
import { Link } from '@material-ui/core'

export class SiteBreadcrumb extends Component {
    handleClick = event => {
        event.preventDefault();
        console.info('You clicked a breadcrumb.');
    }

    render() {
        return (
            <Link color="primary" href="#" onClick={this.handleClick}>
                SITE
            </Link>
        )
    }
}

export default SiteBreadcrumb