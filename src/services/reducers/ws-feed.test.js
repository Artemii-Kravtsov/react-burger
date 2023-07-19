import feed from "./ws-feed";
import { wsFeedSuccess, 
         wsFeedError, 
         wsFeedClose,
         wsFeedGet } from "../actions/ws-feed";


describe('Редьюсер feed', () => {
    const item = {'test': 'test'}
    const feedDefault = {error: undefined, wsConnected: false, orders: []}

    it('возвращает начальное состояние при чужом экшене', () => {
        expect(
            feed(feedDefault, {})
        ).toEqual(feedDefault)
    })

    it('wsFeedSuccess фиксирует что соединение установлено', () => {
        expect(
            feed(feedDefault, wsFeedSuccess())
        ).toEqual(
            {...feedDefault, error: undefined, wsConnected: true}
        )
    })

    it('wsFeedError фиксирует что соединение закрыто с ошибкой', () => {
        expect(
            feed(feedDefault, wsFeedError(item))
        ).toEqual(
            {...feedDefault, error: item, wsConnected: false}
        )
    })

    it('wsFeedClose фиксирует что соединение закрыто без ошибки', () => {
        expect(
            feed(feedDefault, wsFeedClose())
        ).toEqual(
            {...feedDefault, error: undefined, wsConnected: false}
        )
    })

    it('wsFeedGet обновляет ленту заказов в сторе', () => {
        const feedResponse = {'total': 53, 'totalToday': 3756,
                              'orders': [{'ingredients': [1, 2, 3], 
                                          'orderId': 7777, 
                                          'name': 'Галактический бургер'}]}
        const now = new Date()
        expect(
            feed(feedDefault, wsFeedGet(feedResponse, now))
        ).toEqual(
            {...feedDefault, ...feedResponse}
        )
    })    
})