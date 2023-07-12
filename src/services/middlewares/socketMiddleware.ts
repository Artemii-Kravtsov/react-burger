import type { Middleware, MiddlewareAPI } from 'redux';
import { AppDispatch } from '../..';
import { TStore } from '../../utils/types';
import { TAnyAction } from '../reducers';
import { getCurrentTimestamp } from '../../utils/datetime';
import { getCookie } from '../../utils/cookies';
import { WSFeedActions, WSFeedGenerators } from '../actions/ws-feed';
import { WSOrdersActions, WSOrdersGenerators } from '../actions/ws-orders';
import { TWSResponse } from '../../utils/types';
import { customFetch } from '../../utils/customFetch';
import { BASE_URL } from '../constants';
import { saveTokens } from '../../utils/tokens';


export const socketMiddleware = (wsUrl: string, 
                                 wsActions: typeof WSFeedActions | typeof WSOrdersActions,
                                 wsGenerators: typeof WSFeedGenerators | typeof WSOrdersGenerators,
                                 addToken: boolean = false
                                 ): Middleware => {
    return ((store: MiddlewareAPI<AppDispatch, TStore>) => {
      let socket: WebSocket | null = null;
  
      return next => (action: TAnyAction) => {
        const { dispatch, getState } = store;
        const { type } = action;
        const { wsInit, wsClose } = wsActions;
        const { wsInitGen, onOpenGen, onCloseGen, onErrorGen, onMessageGen } = wsGenerators;
        const { loggedIn } = getState().profile;
        if (type === wsInit && (!addToken || loggedIn)) {

            let url = wsUrl 
            if (addToken) {
              const token = getCookie('accessToken')
              if (token) {
                  url = url + '?token=' + token.replace('Bearer ','')
              } 
            }
            socket = new WebSocket(url);
            socket.onopen = event => {
              dispatch(onOpenGen());
            };
            socket.onerror = event => {
              dispatch(onErrorGen(event));
            };
            socket.onmessage = event => {
              const { data } = event;
              const parsedData: TWSResponse = JSON.parse(data);
              dispatch(onMessageGen(parsedData, getCurrentTimestamp()));
            };
            socket.onclose = (event: CloseEvent) => {
              console.log(event.reason)
              if (event.reason === 'Invalid or missing token') {
                const token = localStorage.getItem('refreshToken')
                customFetch(BASE_URL + 'auth/token', 
                            {method: 'post',
                             body: JSON.stringify({ token }),
                             onError: () => dispatch(onCloseGen()),
                             onSuccess: (data: {refreshToken: string, 
                                                accessToken: string}) => {
                                saveTokens(data);
                                dispatch(wsInitGen());
                            }})
              } else {
                dispatch(onCloseGen())
              }
            };
        }

        if (type === wsClose && socket) {
            socket.close()
        }
  
        // if (socket && type === wsSendMessage) {
        //   const payload = action.payload;
        //   const message = { ...(payload as IMessage), token: user?.token };
        //   socket.send(JSON.stringify(message));
        // }
        
        next(action);
      };
    }) as Middleware;
  };