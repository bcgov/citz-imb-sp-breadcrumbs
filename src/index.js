import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

function ready(callback){
    // in case the document is already rendered
    if (document.readyState!='loading') callback();
    // modern browsers
    else if (document.addEventListener) document.addEventListener('DOMContentLoaded', callback);
    // IE <= 8
    else document.attachEvent('onreadystatechange', function(){
        if (document.readyState=='complete') callback();
    });
}

ready(function(){
    let rootEl = document.createElement('div')
    rootEl.setAttribute('id', 'breadcrumb-root')
    document.querySelector('#titleAreaRow > .ms-breadcrumb-box').appendChild(rootEl)
    //document.getElementById('pageTitle').classList.add('ms-hidden')

    ReactDOM.render(<App />, rootEl);

});


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
