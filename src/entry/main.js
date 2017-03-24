import React from 'react'
import ReactDOM from 'react-dom'
import createStore from 'STORE/createStore'
import AppContainer from 'CORE/AppContainer'

const initialState = window.___INITIAL_STATE__
const store = createStore(initialState)

const MOUNT_NODE = document.getElementById('MOUNT_NODE')

let render = () => {
  const routes = require('ROUTE').default(store)
  ReactDOM.render(
    <AppContainer store={store} routes={routes}/>,
    MOUNT_NODE
  )
}

if (process.env.NODE_ENV === 'development') {
  if (module.hot) {
    const renderApp = render
    const renderError = error => {
      const RedBox = require('redbox-react').default
      ReactDOM.render(<RedBox error={error}/>, MOUNT_NODE)
    }

    render = () => {
      try {
        renderApp()
      } catch(error) {
        renderError(error)
      }
    }

    module.hot.accept('ROUTE', () => setImmediate(() => {
        ReactDOM.unmountComponentAtNode(MOUNT_NODE)
        render()
      })
    )
  }
}

render()
