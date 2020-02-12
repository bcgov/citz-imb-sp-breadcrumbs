import React, { useState, useEffect } from "react";
import { Link } from "@material-ui/core";
import Axios from "axios";

export default function SiteBreadcrumb(props) {
  let _spPageContextInfo = window._spPageContextInfo;
  let sitePath = "scott/projects";

  const [siteName, changeSiteName] = useState("Site...Site");

  const getSiteTitle = () => {
    Axios.get(props.rootUrl + "/" + sitePath + "/_api/web")
      .then(response => {
        console.log(response.data.Title);
        return response.data.Title;
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
  };
  useEffect(() => {
    if (_spPageContextInfo !== undefined) {
      if (
        _spPageContextInfo.webServerRelativeUrl ===
        _spPageContextInfo.siteServerRelativeUrl
      ) {
        sitePath = "";
      } else {
        sitePath = _spPageContextInfo.webServerRelativeUrl.replace(
          _spPageContextInfo.siteServerRelativeUrl + "/",
          ""
        );
      }
    }
    //getSiteTitle().then(response => console.log(response));
    return () => {};
  }, []);

  console.log("sitePath", sitePath);

  return (
    <Link color="primary" href="#">
      {siteName}
    </Link>
  );
}
