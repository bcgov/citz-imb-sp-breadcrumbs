import 'react-app-polyfill/ie9'
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

window.addEventListener('load', () => {
    const breadcrumbRoot = document.createElement('div')
    breadcrumbRoot.setAttribute('id', 'breadcrumb-root')
    const msbreadcrumbbox = document.body.querySelector('#titleAreaRow > .ms-breadcrumb-box')

    msbreadcrumbbox.after(breadcrumbRoot)
    msbreadcrumbbox.classList.add('ms-hidden')

    ReactDOM.render(<App />, document.getElementById('breadcrumb-root'))
})