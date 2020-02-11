import React from 'react';
import './css/App.css';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core'
import RootBreadcrumb from './components/RootBreadcrumb';

export default function App() {

  let _spPageContextInfo = window._spPageContextInfo

  if (_spPageContextInfo === undefined) {
    console.warn("_spPageContextInfo set to default")
    _spPageContextInfo =
    {
      webServerRelativeUrl: "\u002fsites\u002fDEV\u002fscott\u002fprojects",
      webAbsoluteUrl: "https:\u002f\u002fcitz.sp.gov.bc.ca\u002fsites\u002fDEV\u002fscott\u002fprojects",
      siteAbsoluteUrl: "https:\u002f\u002fcitz.sp.gov.bc.ca\u002fsites\u002fDEV",
      serverRequestPath: "\u002fsites\u002fDEV\u002fscott\u002fprojects\u002fSitePages\u002fHome.aspx",
      layoutsUrl: "_layouts\u002f15",
      webTitle: "Virtual Document Room",
      webTemplate: "1",
      tenantAppVersion: "0",
      isAppWeb: false,
      Has2019Era: true,
      webLogoUrl: "_layouts\u002f15\u002fimages\u002fsiteicon.png",
      webLanguage: 1033,
      currentLanguage: 1033,
      currentUICultureName: "en-US",
      currentCultureName: "en-US",
      siteClientTag: "113$$16.0.4912.1000",
      crossDomainPhotosEnabled: false,
      webUIVersion: 15,
      webPermMasks: { High: 2147483647, Low: 4294967295 },
      pageListId: "{d6b46153-7a0c-43f8-93d3-3273295344c9}",
      pageItemId: 1,
      pagePersonalizationScope: 1,
      userId: 6, userLoginName: "a32d6f859c66450ca4995b0b2bf0a844",
      systemUserKey: "i:0\u01F5.t|bcgovidp|a32d6f859c66450ca4995b0b2bf0a844",
      alertsEnabled: true,
      customMarkupInCalculatedFieldDisabled: true,
      siteServerRelativeUrl: "\u002fsites\u002fDEV",
      allowSilverlightPrompt: 'True',
      isSiteAdmin: true
    }
  }
  const theme = createMuiTheme({
    palette: {

    }
  })

  return (
    <MuiThemeProvider theme={theme}>
      <RootBreadcrumb pageContext={_spPageContextInfo} />
    </MuiThemeProvider>
  )
}