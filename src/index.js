import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

window.addEventListener('load', () => {
    const breadcrumbRoot = document.createElement('div')
    breadcrumbRoot.setAttribute('id', 'breadcrumb-root')
    const msbreadcrumbbox = document.body.querySelector('#titleAreaRow > .ms-breadcrumb-box')

    msbreadcrumbbox.after(breadcrumbRoot)
    msbreadcrumbbox.classList.add('ms-hidden')

    ReactDOM.render(<App />, document.getElementById('breadcrumb-root'))
})

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
