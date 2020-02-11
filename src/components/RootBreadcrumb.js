import React, { Component } from "react";
import SiteBreadcrumb from "./SiteBreadcrumb";
import ListBreadcrumb from "./ListBreadcrumb";
import FolderBreadcrumb from "./FolderBreadcrumb";
import NameBreadcrumb from "./NameBreadcrumb";
import { Breadcrumbs, Link } from "@material-ui/core";
import Axios from "axios";

export class RootBreadcrumb extends Component {
  constructor(props) {
    super(props);

    this.state = {
      siteName: "Root"
    };
  }

  componentDidMount() {
    Axios.get(this.props.pageContext.siteAbsoluteUrl + "/_api/web")
      .then(response => {
        console.log("response", response);
        this.setState({
          siteName: response.data.Title
        });
      })
      .catch(error => {
        console.groupCollapsed("Error Details");
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", error.message);
        }
        console.log(error.config);
        console.groupEnd();
      });
  }

  render() {
    return (
      <Breadcrumbs aria-label="breadcrumb" separator="\">
        <Link color="primary" href={this.props.pageContext.siteAbsoluteUrl}>
          <div>{this.state.siteName}</div>
        </Link>
        <SiteBreadcrumb pageContext={this.props.pageContext} />
        <ListBreadcrumb pageContext={this.props.pageContext} />
        <FolderBreadcrumb pageContext={this.props.pageContext} />
        <NameBreadcrumb pageContext={this.props.pageContext} />
      </Breadcrumbs>
    );
  }
}

export default RootBreadcrumb;
