import { TWSResponse } from "../../utils/types";

/*   экшены   */
export const WS_FEED_CONNECTION_SUCCESS: 'WS_FEED_CONNECTION_SUCCESS' = 'WS_FEED_CONNECTION_SUCCESS';
export const WS_FEED_CONNECTION_ERROR: 'WS_FEED_CONNECTION_ERROR' = 'WS_FEED_CONNECTION_ERROR';
export const WS_FEED_CONNECTION_CLOSED: 'WS_FEED_CONNECTION_CLOSED' = 'WS_FEED_CONNECTION_CLOSED';
export const WS_FEED_CLOSE_CONNECTION: 'WS_FEED_CLOSE_CONNECTION' = 'WS_FEED_CLOSE_CONNECTION';
export const WS_FEED_GET_MESSAGE: 'WS_FEED_GET_MESSAGE' = 'WS_FEED_GET_MESSAGE';
// export const WS_FEED_SEND_MESSAGE: 'WS_FEED_SEND_MESSAGE' = 'WS_FEED_SEND_MESSAGE';
export const WS_FEED_CONNECTION_START: 'WS_FEED_CONNECTION_START' = 'WS_FEED_CONNECTION_START';


/*   генераторы экшенов   */
export const wsFeedInit: TwsFeedInit = () => {
    return { type: WS_FEED_CONNECTION_START };
}
export const wsFeedSuccess: TwsFeedSuccess = () => {
    return { type: WS_FEED_CONNECTION_SUCCESS };
}
export const wsFeedCloseConnection: TwsFeedCloseConnection = () => {
    return { type: WS_FEED_CLOSE_CONNECTION };
}
export const wsFeedError: TwsFeedError = (event) => {
    return { type: WS_FEED_CONNECTION_ERROR, error: event };
}
export const wsFeedClose: TwsFeedClose = () => {
    return { type: WS_FEED_CONNECTION_CLOSED };
}
export const wsFeedGet: TwsFeedGet = (response, timestamp) => {
    return { type: WS_FEED_GET_MESSAGE, timestamp, ...response };
}
// export const wsFeedSend: TwsFeedSend = () => {
//     return { type: WS_FEED_SEND_MESSAGE };
// }
  

type TwsFeedInit = {(): {
    readonly type: typeof WS_FEED_CONNECTION_START
}}
type TwsFeedSuccess = {(): {
    readonly type: typeof WS_FEED_CONNECTION_SUCCESS
}}
type TwsFeedError = {(event: Event): {
    readonly type: typeof WS_FEED_CONNECTION_ERROR,
    readonly error: Event
}}
type TwsFeedClose = {(): {
    readonly type: typeof WS_FEED_CONNECTION_CLOSED
}}
type TwsFeedCloseConnection = {(): {
    readonly type: typeof WS_FEED_CLOSE_CONNECTION
}}
type TwsFeedGet = {(
    response: TWSResponse, 
    timestamp: number): TWSResponse & {
        readonly type: typeof WS_FEED_GET_MESSAGE,
        timestamp: number
    }
}
// type TwsFeedSend = {(): {
//     readonly type: typeof WS_FEED_SEND_MESSAGE
// }}

export type TWSFeedActions = TwsFeedInit 
                             | TwsFeedSuccess 
                             | TwsFeedError 
                             | TwsFeedClose 
                             | TwsFeedGet 
                             | TwsFeedCloseConnection
                            //  | TwsFeedSend

export const WSFeedActions = {wsInit: WS_FEED_CONNECTION_START, 
                              wsClose: WS_FEED_CLOSE_CONNECTION,
                            //    wsSendMessage: WS_FEED_SEND_MESSAGE, 
                              onOpen: WS_FEED_CONNECTION_SUCCESS, 
                              onClose: WS_FEED_CONNECTION_CLOSED, 
                              onError: WS_FEED_CONNECTION_ERROR, 
                              onMessage: WS_FEED_GET_MESSAGE}

export const WSFeedGenerators = {onOpenGen: wsFeedSuccess, 
                                 onCloseGen: wsFeedClose, 
                                 onErrorGen: wsFeedError, 
                                 onMessageGen: wsFeedGet}