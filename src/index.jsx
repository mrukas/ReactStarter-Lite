import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader'

import App from './containers/App.jsx';

import './style.css';

const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    document.getElementById('root'),
  )
};

render(App)

// Webpack Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./containers/App.jsx', () => { render(App) })
}