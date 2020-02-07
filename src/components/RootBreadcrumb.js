import React, { Component } from 'react'
import SiteBreadcrumb from './SiteBreadcrumb'
import ListBreadcrumb from './ListBreadcrumb'
import FolderBreadcrumb from './FolderBreadcrumb'
import NameBreadcrumb from './NameBreadcrumb'
import { Breadcrumbs, Link } from '@material-ui/core'
import axios from 'axios'

export default class RootBreadcrumb extends Component {
    constructor(props) {
        super(props)

        this.state = {
            siteAbsoluteUrl: ""
        }
    }

    handleClick(event){
        event.preventDefault();
        console.info('You clicked a breadcrumb.');
    }

    componentDidMount(){
        axios
        .get('../_api/web')
        .then(response => {
            console.log(response)
        })
        // this.setState = {
        //     siteAbsoluteUrl: _spPageContextInfo.siteAbsoluteUrl
        // }
    }

    render() {
        return (
            <Breadcrumbs aria-label="breadcrumb" separator="\">
                <Link color="primary" href="#" onClick={this.handleClick}>
                    ROOT
                </Link>
                <SiteBreadcrumb />
                <ListBreadcrumb />
                <FolderBreadcrumb />
                <NameBreadcrumb />
            </Breadcrumbs>
        )
    }
}