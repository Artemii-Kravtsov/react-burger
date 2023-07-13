import style from './index.module.css';
import { useDispatch } from '../..';
import { FC, useEffect } from 'react';
import { wsOrdersInit, wsOrdersCloseConnection } from '../../services/actions/ws-orders';
import { TStore } from '../../utils/types';
import { TWSAnOrder } from '../../utils/types';
import { useNavigate } from "react-router-dom";
import { useSelector } from '../..';
import OrderLI from '../order-li';


const OrdersHistory: FC = () => {
    const getOrders = (store: TStore) => store.orders
    const {wsConnected, error, orders} = useSelector(getOrders)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const onClick = (order: TWSAnOrder) => {
        navigate(`/profile/orders/${order.number}`, 
                 {state: {modalReferer: '/profile/orders/'}})
    }

    useEffect(() => {
        dispatch(wsOrdersInit())
        return () => {dispatch(wsOrdersCloseConnection())}
    }, [])

    return (
        <>
        {!wsConnected && !error && (
            <div className={style.placeholder}>
                <p className="text text_type_main-medium">Загружаю историю заказов..</p>
            </div>
        )}
        {!wsConnected && error && (
            <div className={style.placeholder}>
                <p className="text text_type_main-medium">Произошла ошибка при подключении</p>
            </div>
        )}
        {wsConnected && orders.length === 0 && (
            <div className={style.placeholder}>
                <p className="text text_type_main-medium">Вы пока что не оставили ни одного заказа</p>
            </div>
        )}
        {wsConnected && orders.length > 0 && (
            <ol className={`${style.container} scrollable`}>
                {orders.map((x) => <OrderLI key={x['_id']} {...x} onClick={onClick} />)}
            </ol>  
        )}
        </>
    )
}


export default OrdersHistory;