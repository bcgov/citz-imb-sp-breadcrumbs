import ReactDOM from 'react-dom'
import { App } from './App'
import { initializeIcons } from '@fluentui/react/lib/Icons'

window.addEventListener('load', () => {
  const breadcrumbRoot = document.createElement('div')
  breadcrumbRoot.setAttribute('id', 'breadcrumb-root')
  const msbreadcrumbbox = document.body.querySelector(
    '#titleAreaRow > .ms-breadcrumb-box'
  )

  if (msbreadcrumbbox) {
    msbreadcrumbbox.after(breadcrumbRoot)
    //msbreadcrumbbox.classList.add('ms-hidden')

    initializeIcons()

    ReactDOM.render(<App />, document.getElementById('breadcrumb-root'))
  }
})
