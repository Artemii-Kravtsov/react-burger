import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';

import reportWebVitals from './reportWebVitals';
import { legacy_createStore as createStore, 
         applyMiddleware, 
         Dispatch, 
         ActionCreator, 
         Action } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Provider,
         TypedUseSelectorHook,
         useDispatch as dispatchHook,
         useSelector as selectorHook } from 'react-redux';
import { rootReducer } from './services/reducers';
import thunk from 'redux-thunk';
import { ThunkAction } from 'redux-thunk';

import { TStore } from './utils/types';
import { TAnyAction, TAnyActionFunc } from './services/reducers';
import AppHeader from './pages/app-header';
import Main from './pages';

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);



export type AppDispatch = Dispatch<TAnyAction>; 
export type AppThunk<TReturn = void> = ActionCreator<
  ThunkAction<TReturn, Action, TStore, TAnyAction>
>

export const useSelector: TypedUseSelectorHook<TStore> = selectorHook;
export const useDispatch = () => dispatchHook<AppDispatch | AppThunk | any>(); 

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
