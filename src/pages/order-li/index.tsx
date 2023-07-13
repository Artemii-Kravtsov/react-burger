import style from './index.module.css';
import { FC } from 'react';
import { TWSAnOrder } from '../../utils/types';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { setBrowsedOrder } from '../../services/actions/orders';
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { formatDate } from '../../utils/formatDate';
import { getOrderByIdsSelector } from '../../utils/getOrderByIdsSelector';
import { useSelector } from '../..';



enum statuses { 
    created = "Создан", 
    pending = "Готовится",
    done = "Выполнен"
};


type TOrderLI = TWSAnOrder & {
    onClick: (order: TWSAnOrder) => void
}

const OrderLI: FC<TOrderLI> = (order) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { _id, updatedAt, status, name, number, ingredients, onClick } = order
    const remainingIngCount = Math.max(0, ingredients.length - 6)
    const orders = useSelector(getOrderByIdsSelector(ingredients))
    const images = orders.slice(0, 6).map((x) => x['image_mobile'])
    const price = orders.reduce((part, a) => part + a.price, 0)

    function onOrderClick() {
        dispatch(setBrowsedOrder(order))
        onClick(order)
    }

    return (
        <li key={_id} 
            className={`${style.li} pl-6 pr-6 pb-6 pt-6`} 
            onClick={onOrderClick}>
            <div className={style.firstLine}>
                <p className="text text_type_digits-default">#{number}</p>
                <p className="text text_type_main-default text_color_inactive" 
                   style={{fontSize: 20}}>{formatDate(updatedAt)}</p>
            </div>
            <p className="text text_type_main-medium mt-6">{name}</p>
            <p className="text text_type_main-small mt-2" 
               style={{fontSize: 20, 
                       color: status === 'done' ? '#00cccc' : undefined }}>
                {statuses[status]}
            </p>
            <div className={style.lastLine + ' mt-6'}>
                <div className={style.icons}>
                    {images.map((url, index) => (
                        <div key={index}
                             className={style.imgWrap} 
                             style={{zIndex: 10 - index}}>
                            <img src={url}/>
                            {remainingIngCount > 0
                             ? <p className={"text text_type_digits-default"}>
                                    {'+' + String(remainingIngCount)}
                               </p> 
                             : null}
                        </div>))}
                </div>
                <div className={style.price}>
                    <p className={"text text_type_digits-medium mr-3"}>{price}</p>
                    <CurrencyIcon type="primary" />
                </div>
            </div>
        </li>
    )
}


export default OrderLI;