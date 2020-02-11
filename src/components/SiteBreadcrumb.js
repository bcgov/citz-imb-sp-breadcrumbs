import React, { Component, Fragment } from 'react'
import { Link } from '@material-ui/core'
import Axios from 'axios'

export class SiteBreadcrumb extends Component {

    constructor(props) {
        super(props)

        this.state = {
            siteName: "Site"
        }

        console.log("pageContext", this.props.pageContext)

    }

    componentDidMount() {
        const relativeUrl = this.props.pageContext.webServerRelativeUrl.replace(this.props.pageContext.siteServerRelativeUrl + '/', '')

        const nodes = relativeUrl.split('/')

        nodes.foreach(node)

        Axios.all()


        // Axios.get(this.props.pageContext.siteAbsoluteUrl + "/_api/web")
        //   .then(response => {
        //     console.log("response", response);
        //     this.setState({
        //       siteName: response.data.Title
        //     });
        //   })
        //   .catch(error => {
        //     console.groupCollapsed("Error Details");
        //     if (error.response) {
        //       // The request was made and the server responded with a status code
        //       // that falls out of the range of 2xx
        //       console.log(error.response.data);
        //       console.log(error.response.status);
        //       console.log(error.response.headers);
        //     } else if (error.request) {
        //       // The request was made but no response was received
        //       // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        //       // http.ClientRequest in node.js
        //       console.log(error.request);
        //     } else {
        //       // Something happened in setting up the request that triggered an Error
        //       console.log("Error", error.message);
        //     }
        //     console.log(error.config);
        //     console.groupEnd();
        //   });
    }

    render() {
        return (
            <div></div>
        )
    }
}

export default SiteBreadcrumb