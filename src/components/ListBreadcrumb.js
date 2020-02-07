import React, { Component } from 'react'
import { Link } from '@material-ui/core'
/**
 * var bc_Properties = {
    //some libraries are not shown in the breadcrumb trail
    ExcludedLists: ["Site Pages", "Pages"]
};
 */
export class ListBreadcrumb extends Component {
    handleClick = event => {
        event.preventDefault();
        console.info('You clicked a breadcrumb.');
    }

    render() {
        return (
            <Link color="primary" href="#" onClick={this.handleClick}>
                LIST
            </Link>
        )
    }
}

export default ListBreadcrumb
