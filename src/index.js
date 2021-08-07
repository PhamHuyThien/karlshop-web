import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from "react-redux";
import ConfigureStore from './redux/ConfigureStore';
ReactDOM.render(
  <React.StrictMode>
    <Provider store={ConfigureStore}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

