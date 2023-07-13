import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';

import reportWebVitals from './reportWebVitals';
import { legacy_createStore as createStore, 
         applyMiddleware,
         ActionCreator, 
         Action } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Provider,
         TypedUseSelectorHook,
         useDispatch as dispatchHook,
         useSelector as selectorHook } from 'react-redux';
import { rootReducer } from './services/reducers';
import thunk from 'redux-thunk';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';

import { TStore } from './utils/types';
import { TAnyAction } from './services/reducers';
import AppHeader from './pages/app-header';
import Main from './pages';

import { socketMiddleware } from './services/middlewares/socketMiddleware';
import { WSFeedActions, WSFeedGenerators } from './services/actions/ws-feed';
import { WSOrdersActions, WSOrdersGenerators } from './services/actions/ws-orders';
import { WS_FEED_URL, WS_ORDERS_URL } from './services/constants';


const store = createStore(rootReducer, 
                          composeWithDevTools(
                                              applyMiddleware(thunk),
                                              applyMiddleware(socketMiddleware(WS_FEED_URL, 
                                                                               WSFeedActions, 
                                                                               WSFeedGenerators)),
                                              applyMiddleware(socketMiddleware(WS_ORDERS_URL, 
                                                                               WSOrdersActions, 
                                                                               WSOrdersGenerators, 
                                                                               true)),
                                             )
                          );
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);



export type AppDispatch = ThunkDispatch<TStore, never, TAnyAction>; 
export type AppThunk<TReturn = void> = ActionCreator<
  ThunkAction<TReturn, Action, TStore, TAnyAction>
>

export const useSelector: TypedUseSelectorHook<TStore> = selectorHook;
export const useDispatch = () => dispatchHook<AppDispatch>(); 

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
