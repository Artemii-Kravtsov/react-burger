import { useState, useEffect } from 'react';
import style from './order-details.module.css';
import blopImg from '../../images/blop.png'
import { useDispatch, useSelector } from 'react-redux';
import { placeAnOrder } from '../../services/actions/orders';



const OrderDetails = () => {
    const dispatch = useDispatch()
    const [wasFetched, setWasFetched] = useState(false)
    const getHasError = (store) => !store.orders.fetchingSuccess
    const getOrderId = (store) => store.orders.orders.length > 0 && store.orders.orders.at(-1).orderId
    const hasError = useSelector(getHasError)
    const orderId = useSelector(getOrderId)
    useEffect(() => {
        dispatch(placeAnOrder({onFinish: setWasFetched.bind(this, true)}))
    }, [dispatch])

    return (
        <>
        {!wasFetched && (<p className="text text_type_main-large mt-15 mb-15">Формируем заказ<br/>Дождитесь ответа</p>)}
        {wasFetched && hasError && (<p className="text text_type_main-large mt-15 mb-15">Ошибка при формировании заказа</p>)}
        {wasFetched && !hasError && (
            <>
            <h3 className={`${style.orderId} text text_type_digits-large mt-2`}>{orderId}</h3>
            <p className="text text_type_main-medium mt-8">идентификатор заказа</p>
            <img className="mt-15" src={blopImg} alt="Ваш заказ начали готовить" />
            <p className="text text_type_main-default mt-15">Ваш заказ начали готовить</p>
            <p className="text text_type_main-default text_color_inactive mt-2 mb-15">Дождитесь готовности на орбитальной станции</p>
            </>
            )}
        </>
    )
}

export default OrderDetails;