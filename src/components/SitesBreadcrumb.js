import React, { useState, useEffect } from "react";
import Axios from "axios";
import SiteLink from './SiteLink'

export default function SitesBreadcrumb(props) {
  let _spPageContextInfo = window._spPageContextInfo;
  let sitePath = "scott/projects";

  const [sites, changeSites] = useState([]);

  const addSite = site => {
    changeSites([...sites, { id: sites.length, ...site }]);
  };

  const getSites = (pathArray, currentNode) => {
    if (currentNode === undefined) {
      currentNode = pathArray.shift();
    } else {
      currentNode = currentNode + "/" + pathArray.shift();
    }

    getSite(currentNode).then(response => {
      addSite(response);
    });

    if (pathArray.length > 0) {
      getSites(pathArray, currentNode);
    }
  };

  const getSite = node => {
    return Axios.get(`${props.rootUrl}/${node}/_api/web`).then(response => {
      return { Title: response.data.Title, Url: response.data.Url }
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
    let pathArray = sitePath.split("/");

    getSites(pathArray);

    return () => { };
  }, []);

  return (
    <div>
      {sites.map(site => (<SiteLink key={site.id} url={site.Url} title={site.Title} />))}
    </div>
  );
}