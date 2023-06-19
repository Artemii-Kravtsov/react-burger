import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';

import reportWebVitals from './reportWebVitals';
import { legacy_createStore as createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Provider } from 'react-redux';
import { rootReducer } from './services/reducers';
import thunk from 'redux-thunk';

import AppHeader from './pages/app-header';
import Main from './pages';


const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
    <Provider store={store}>
      <Router>
        <AppHeader></AppHeader>
        <main id="main">
          <Main />
        </main>
      </Router>
    </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
