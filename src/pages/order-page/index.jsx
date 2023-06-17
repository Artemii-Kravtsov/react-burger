import { useState, useEffect } from 'react';
import style from './index.module.css';
import blopImg from '../../images/blop.png'
import { useDispatch, useSelector } from 'react-redux';
import { placeAnOrder } from '../../services/actions/orders';



const OrderPage = () => {
    const dispatch = useDispatch()
    const [wasFetched, setWasFetched] = useState(false)
    // раньше всех спадёт wasFetched, вытащится старый getOrderId и только потом придёт обновление новым OrderId
    // чтобы этого не было, буду ждать прихода обновления isFetching, и только потом показывать orderId - иначе будет моргать
    const getIsFetching = (store) => store.orders.isFetching
    const getHasError = (store) => !store.orders.fetchingSuccess
    const getOrderId = (store) => store.orders.orders.length > 0 && store.orders.orders.at(-1).orderId
    const isFetching = useSelector(getIsFetching)
    const hasError = useSelector(getHasError)
    const orderId = useSelector(getOrderId)
    useEffect(() => {
        dispatch(placeAnOrder({onFinish: setWasFetched.bind(this, true)}))
    }, [dispatch])

    return (
        <>
        {(!wasFetched || isFetching) && (<p className="text text_type_main-large mt-15 mb-15">Формируем заказ<br/>Дождитесь ответа</p>)}
        {wasFetched && hasError && (<p className="text text_type_main-large mt-15 mb-15">Ошибка при формировании заказа</p>)}
        {(wasFetched && !isFetching) && !hasError && (
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

export default OrderPage;