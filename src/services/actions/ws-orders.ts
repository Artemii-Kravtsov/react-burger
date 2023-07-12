import { TWSResponse } from "../../utils/types";

/*   экшены   */
export const WS_ORDERS_CONNECTION_SUCCESS: 'WS_ORDERS_CONNECTION_SUCCESS' = 'WS_ORDERS_CONNECTION_SUCCESS';
export const WS_ORDERS_CONNECTION_ERROR: 'WS_ORDERS_CONNECTION_ERROR' = 'WS_ORDERS_CONNECTION_ERROR';
export const WS_ORDERS_CONNECTION_CLOSED: 'WS_ORDERS_CONNECTION_CLOSED' = 'WS_ORDERS_CONNECTION_CLOSED';
export const WS_ORDERS_CLOSE_CONNECTION: 'WS_ORDERS_CLOSE_CONNECTION' = 'WS_ORDERS_CLOSE_CONNECTION';
export const WS_ORDERS_GET_MESSAGE: 'WS_ORDERS_GET_MESSAGE' = 'WS_ORDERS_GET_MESSAGE';
// export const WS_ORDERS_SEND_MESSAGE: 'WS_ORDERS_SEND_MESSAGE' = 'WS_ORDERS_SEND_MESSAGE';
export const WS_ORDERS_CONNECTION_START: 'WS_ORDERS_CONNECTION_START' = 'WS_ORDERS_CONNECTION_START';


/*   генераторы экшенов   */
export const wsOrdersInit: TwsOrdersInit = () => {
    return { type: WS_ORDERS_CONNECTION_START };
}
export const wsOrdersSuccess: TwsOrdersSuccess = () => {
    return { type: WS_ORDERS_CONNECTION_SUCCESS };
}
export const wsOrdersError: TwsOrdersError = (event) => {
    return { type: WS_ORDERS_CONNECTION_ERROR, error: event };
}
export const wsOrdersClose: TwsOrdersClose = () => {
    return { type: WS_ORDERS_CONNECTION_CLOSED };
}
export const wsOrdersCloseConnection: TwsOrdersCloseConnection = () => {
    return { type: WS_ORDERS_CLOSE_CONNECTION };
}
export const wsOrdersGet: TwsOrdersGet = (response, timestamp) => {
    return { type: WS_ORDERS_GET_MESSAGE, timestamp, ...response };
}
// export const wsOrdersSend: TwsOrdersSend = () => {
//     return { type: WS_ORDERS_SEND_MESSAGE };
// }
  

type TwsOrdersInit = {(): {
    readonly type: typeof WS_ORDERS_CONNECTION_START
}}
type TwsOrdersSuccess = {(): {
    readonly type: typeof WS_ORDERS_CONNECTION_SUCCESS
}}
type TwsOrdersError = {(event: Event): {
    readonly type: typeof WS_ORDERS_CONNECTION_ERROR,
    readonly error: Event
}}
type TwsOrdersClose = {(): {
    readonly type: typeof WS_ORDERS_CONNECTION_CLOSED
}}
type TwsOrdersCloseConnection = {(): {
    readonly type: typeof WS_ORDERS_CLOSE_CONNECTION
}}
type TwsOrdersGet = {(
    response: TWSResponse, 
    timestamp: number): TWSResponse & {
        readonly type: typeof WS_ORDERS_GET_MESSAGE,
        timestamp: number
    }
}
// type TwsOrdersSend = {(): {
//     readonly type: typeof WS_ORDERS_SEND_MESSAGE
// }}

export type TWSOrdersActions = TwsOrdersInit 
                               | TwsOrdersSuccess 
                               | TwsOrdersError 
                               | TwsOrdersClose 
                               | TwsOrdersGet 
                               | TwsOrdersCloseConnection
                        //  | TwsOrdersSend

export const WSOrdersActions = {wsInit: WS_ORDERS_CONNECTION_START,
                                wsClose: WS_ORDERS_CLOSE_CONNECTION,
                                //  wsSendMessage: WS_ORDERS_SEND_MESSAGE, 
                                onOpen: WS_ORDERS_CONNECTION_SUCCESS, 
                                onClose: WS_ORDERS_CONNECTION_CLOSED, 
                                onError: WS_ORDERS_CONNECTION_ERROR, 
                                onMessage: WS_ORDERS_GET_MESSAGE}

export const WSOrdersGenerators = {wsInitGen: wsOrdersInit,
                                   onOpenGen: wsOrdersSuccess, 
                                   onCloseGen: wsOrdersClose, 
                                   onErrorGen: wsOrdersError, 
                                   onMessageGen: wsOrdersGet}                                 