import React from 'react';
import './css/App.css';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core'
import RootBreadcrumb from './components/RootBreadcrumb';

export default function App() {
  const theme = createMuiTheme({
    palette: {

    }
  })

  return (
    <MuiThemeProvider theme={theme}>
      <RootBreadcrumb />
    </MuiThemeProvider>
  )
}