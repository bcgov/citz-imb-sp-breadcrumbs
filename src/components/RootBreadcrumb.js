import React, { useState, useEffect } from "react";
import SitesBreadcrumb from "./SitesBreadcrumb";
import ListBreadcrumb from "./ListBreadcrumb";
import FolderBreadcrumb from "./FolderBreadcrumb";
import NodeBreadcrumb from "./NodeBreadcrumb";
import { Breadcrumbs, Link } from "@material-ui/core";
import Axios from "axios";

export default function RootBreadcrumb() {
  let _spPageContextInfo = window._spPageContextInfo;
  let rootUrl = "http://localhost:8080";

  const [rootName, changerootName] = useState("ROOT");

  useEffect(() => {
    if (_spPageContextInfo !== undefined) {
      rootUrl = _spPageContextInfo.siteAbsoluteUrl;
    }

    Axios.get(rootUrl + "/_api/web")
      .then(response => {
        changerootName(() => response.data.Title);
      })
      .catch(error => {
        console.groupCollapsed("Error Details");
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.error(error.response.data);
          console.error(error.response.status);
          console.error(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.error(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.error("Error", error.message);
        }
        console.error(error.config);
        console.groupEnd();
      });
    return () => {};
  }, []);

  return (
    <Breadcrumbs aria-label="breadcrumb" separator="\">
      <Link color="primary" href={rootUrl}>
        {rootName}
      </Link>
      <SitesBreadcrumb rootUrl={rootUrl} />
      <ListBreadcrumb />
      <FolderBreadcrumb />
      <NodeBreadcrumb />
    </Breadcrumbs>
  );
}