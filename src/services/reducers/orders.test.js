import { orders, browsedOrder } from "./orders";
import { placeAnOrderSucceeded, 
         placeAnOrderIsFetching, 
         orderIsPlaced, 
         setBrowsedOrder, 
         removeBrowsedOrder } from "../actions/orders";
import { wsOrdersSuccess, 
         wsOrdersError, 
         wsOrdersClose,
         wsOrdersGet } from "../actions/ws-orders";


describe('Редьюсер orders', () => {
    const item = {'test': 'test'}
    const order = {'ingredients': [1, 2, 3], 
                   'orderId': 7777, 
                   'name': 'Галактический бургер'}

    it('возвращает начальное состояние при чужом экшене', () => {
        expect(
            orders(item, {})
        ).toEqual(item)
    })

    it('placeAnOrderSucceeded записывает переданный статус в стор', () => {
        expect(
            orders(item, placeAnOrderSucceeded(false))
        ).toEqual(
            {'test': 'test', 'fetchingSuccess': false}
        )
    })

    it('placeAnOrderIsFetching записывает переданный статус в стор', () => {
        expect(
            orders(item, placeAnOrderIsFetching(true))
        ).toEqual(
            {'test': 'test', isFetching: true}
        )
    })

    it('orderIsPlaced помещает orderId переданного аргумента в стор', () => {
        expect(
            orders(item, orderIsPlaced(...Object.values(order)))
        ).toEqual(
            {'test': 'test', 'lastOrderId': 7777}
        )
    })

    it('setBrowsedOrder записывает переданный аргумент в стор', () => {
        expect(
            browsedOrder(undefined, setBrowsedOrder(order))
        ).toEqual(
            order
        )
    })

    it('removeBrowsedOrder очищает стор', () => {
        expect(
            browsedOrder(order, removeBrowsedOrder())
        ).toEqual(
            undefined
        )
    })

    it('wsOrdersSuccess фиксирует что соединение установлено', () => {
        expect(
            orders(order, wsOrdersSuccess())
        ).toEqual(
            {...order, error: undefined, wsConnected: true}
        )
    })
    
    it('wsOrdersError фиксирует что соединение закрыто с ошибкой', () => {
        expect(
            orders(order, wsOrdersError(item))
        ).toEqual(
            {...order, error: item, wsConnected: false}
        )
    })
    
    it('wsOrdersClose фиксирует что соединение закрыто без ошибки', () => {
        expect(
            orders(order, wsOrdersClose())
        ).toEqual(
            {...order, error: undefined, wsConnected: false}
        )
    })
    
    it('wsOrdersGet обновляет значение по ключу orders', () => {
        const response = {'orders': [5, 4, 3, 2, 1]}
        const now = new Date()
        expect(
            orders(order, wsOrdersGet(response, now))
        ).toEqual(
            {...order, orders: [1, 2, 3, 4, 5]}
        )
    })    
})