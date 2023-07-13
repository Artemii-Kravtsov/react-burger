import style from './index.module.css';
import { useDispatch } from '../..';
import { useNavigate } from "react-router-dom";
import { FC, useEffect } from 'react';
import { wsFeedInit, wsFeedCloseConnection } from '../../services/actions/ws-feed';
import { TStore, TWSAnOrder } from '../../utils/types';
import OrderLI from '../order-li';
import { useSelector } from '../..';


const Feed: FC = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const getFeed = (store: TStore) => store.feed
    const { totalToday, total, orders, wsConnected, error } = useSelector(getFeed)

    const onClick = (order: TWSAnOrder) => {
        navigate(`/feed/${order.number}`, 
                 {state: {modalReferer: '/feed/'}})
    }

    useEffect(() => {
        dispatch(wsFeedInit())
        return () => {dispatch(wsFeedCloseConnection())}
    }, [])
    
    return (
        <>
        {!wsConnected && !error && (
            <div className={style.placeholder}>
                <p className="text text_type_main-large">Загружаю историю заказов..</p>
            </div>
        )}
        {!wsConnected && error && (
            <div className={style.placeholder}>
                <p className="text text_type_main-large">Произошла ошибка при подключении</p>
            </div>
        )}
        {wsConnected && (
            <>
            <div className={style.feedWrap}>
                <p className="text text_type_main-large">Лента заказов</p>
                <ol className={`${style.feed} scrollable`}>
                    {orders.map((x) => <OrderLI key={x['_id']} {...x} onClick={onClick} />)}
                </ol>
            </div>
            <div className={style.statsWrap}>
                <div className={style.tableau}>
                    <div className={style.tableauBox}>
                        <p className="text text_type_main-medium">Готовы:</p>
                        <ol className={style.tableauOL}>
                            {orders.filter((x) => x.status === 'done').slice(0, 10).map((x) => (
                                <li key={x['_id']} className={style.tableauLI}>
                                    <p className="text text_type_main-medium"
                                       style={{color: '#00cccc'}}>{x['number']}</p>
                                </li>
                            ))}
                        </ol>
                    </div>
                    <div className={style.tableauBox}>
                        <p className="text text_type_main-medium">В работе:</p>
                        <ol className={style.tableauOL}>
                            {orders.filter((x) => x.status === 'pending').slice(0, 10).map((x) => (
                                <li key={x['_id']} className={style.tableauLI}>
                                    <p className="text text_type_main-medium">{x['number']}</p>
                                </li>
                            ))}
                        </ol>
                    </div>
                </div>
                <p className="text text_type_main-medium">Выполнено за всё время:</p>
                <h3 className={`${style.metrics} text text_type_digits-large`}>{total}</h3>
                <p className="text text_type_main-medium">Выполнено за сегодня:</p>
                <h3 className={`${style.metrics} text text_type_digits-large`}>{totalToday}</h3>
            </div>            
            </>  
        )}
        </>
    )

}
export default Feed;