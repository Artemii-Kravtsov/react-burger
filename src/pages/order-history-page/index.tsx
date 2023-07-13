import style from './index.module.css';
import { removeBrowsedOrder } from '../../services/actions/orders';
import { useDispatch, useSelector } from '../..';
import { useEffect, FC, useState } from 'react';
import { useParams } from 'react-router-dom';
import { TStore, TWSAnOrder } from '../../utils/types';
import { wsOrdersInit, wsOrdersCloseConnection } from '../../services/actions/ws-orders';
import { wsFeedInit, wsFeedCloseConnection } from '../../services/actions/ws-feed';
import { formatDate } from '../../utils/formatDate';
import { getOrderByIdsSelector } from '../../utils/getOrderByIdsSelector';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useLocation } from 'react-router-dom';

type TGetOrder = (store: TStore) => TWSAnOrder | undefined
type TOrderHistoryPage = {
    isDirect?: boolean
}


enum statuses { 
    created = "Создан", 
    pending = "Готовится",
    done = "Выполнен"
};

const OrderHistoryPage: FC<TOrderHistoryPage> = ({ isDirect=false }) => {

    const { pathname } = useLocation()
    const isOrders = pathname.startsWith("/profile/orders/")
    const dispatch = useDispatch()
    const { number } = useParams<string>()
    const [ wsInitiated, setWsInitiated ] = useState<boolean>(false)
    const getWsConnected = (store: TStore) => {
        const bucket = isOrders ? store.orders : store.feed
        return bucket.wsConnected
    }

    const getBrowsedOrder: TGetOrder = (store) => {
        if (store.browsedOrder) {
            return store.browsedOrder
        }
        if (isDirect && (wsInitiated == false)) {
            setWsInitiated(true)
            const func = isOrders ? wsOrdersInit : wsFeedInit
            dispatch(func())
        }
        const bucket = isOrders ? store.orders : store.feed
        return bucket.orders.find((x) => String(x.number) === number)
    }
    const browsedOrder = useSelector(getBrowsedOrder)
    const wsIsConnected = useSelector(getWsConnected)
    const ingredients = useSelector(getOrderByIdsSelector((browsedOrder && browsedOrder.ingredients) || []))
    const totalPrice = ingredients.reduce((part, a) => part + a.price, 0)
    const counter: Record<string, number> = {}

    for (let x of ingredients) {
        counter[x['_id']] = counter[x['_id']] ? counter[x['_id']] + 1 : 1
    }
    
    useEffect(() => {
        return () => {
            if (wsInitiated) {
                const func = isOrders ? wsOrdersCloseConnection : wsFeedCloseConnection
                dispatch(func())
            }
            dispatch(removeBrowsedOrder())
        }
    }, [])



    return (
        <>
        {browsedOrder && (
            <section className={`${style.container} ${isDirect 
                                                      ? style.pageContainer 
                                                      : style.modalContainer}`}>
                <p className="text text_type_digits-medium mb-10">#{number}</p>
                <p className="text text_type_main-medium mb-3">{browsedOrder.name}</p>
                <p className="text text_type_main-small mb-15" 
                    style={{fontSize: 20, 
                            color: browsedOrder.status === 'done' 
                                   ? '#00cccc' 
                                   : undefined }}>
                    {statuses[browsedOrder.status]}
                </p>
                <p className="text text_type_main-medium mb-6">Состав:</p>
                <div className={`${style.ingredients} scrollable mb-10`}>
                    {[...new Set(ingredients)].map((x, idx) => (
                        <div key={idx} className={style.ingRow}>
                            <div className={style.imgWrap} >
                                <img src={x['image_mobile']}/>
                            </div>
                            <p className="text text_type_main-small" 
                               style={{fontSize: 18, flexGrow: 1}}>
                                {x['name']}
                            </p>
                            <div className={style.price}>
                                <p className={"text text_type_digits-medium mr-3"}>
                                    {counter[x['_id']]} x {x['price']}
                                </p>
                                <CurrencyIcon type="primary" />
                            </div>                        
                        </div>))}
                </div>
                <div className={style.lastLine}>
                    <p className="text text_type_main-default text_color_inactive" 
                       style={{fontSize: 18}}>{formatDate(browsedOrder.updatedAt)}</p>
                    <div className={style.price}>
                        <p className={"text text_type_digits-medium mr-3"}>{totalPrice}</p>
                        <CurrencyIcon type="primary" />
                    </div>
                </div>
            </section>)}

        {!browsedOrder && wsInitiated && !wsIsConnected && (
            <p className={style.placeholder + " text text_type_main-large mt-10"}>
                Загрузка...
            </p>
        )}
       
        </>)
}

export default OrderHistoryPage;