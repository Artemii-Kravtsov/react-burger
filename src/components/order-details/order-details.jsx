import { useState, useEffect, useContext, useMemo, useCallback } from 'react';
import style from './order-details.module.css';
import blopImg from '../../images/blop.png'
import {  } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { useFetch } from '../../hooks/useFetch.jsx';
import { CustomBurgerContext } from '../../context/context.js';
import { ingredientPropTypes, dataPropTypes } from '../../utils/prop-types-templates';
import { BASE_URL } from '../../context/constants.js'



const OrderDetails = ({ buns, filling, price }) => {
    const {setCustomBurger} = useContext(CustomBurgerContext)
    const [wasFetched, setWasFetched] = useState(false)

    const {data, isLoading, hasError, fetchFunc} = useFetch({
        url: BASE_URL + 'orders',
        method: 'post',
        payload: {"ingredients": [buns._id, ...filling.map((x) => x._id)]},
        validationFunc: (data) => data['success'] === true, 
        transformFunc: (data) => data['order']['number'], 
        onSuccess: setWasFetched.bind(this, true)
    })
    useEffect(() => {console.log('fetch'); fetchFunc()}, [])
    useEffect(() => {wasFetched && data && setCustomBurger({'type': 'ordered', 'data': data})}, [wasFetched, data])

    return (
        <>
        {((isLoading || !wasFetched) && !hasError) && (<p className="text text_type_main-large mt-15 mb-15">Формируем заказ<br/>Дождитесь ответа</p>)}
        {hasError && (<p className="text text_type_main-large mt-15 mb-15">Ошибка при формировании заказа</p>)}
        {!isLoading && !hasError && wasFetched && (
            <>
            <h3 className={`${style.orderId} text text_type_digits-large mt-2`}>{data}</h3>
            <p className="text text_type_main-medium mt-8">идентификатор заказа</p>
            <img className="mt-15" src={blopImg} alt="Ваш заказ начали готовить" />
            <p className="text text_type_main-default mt-15">Ваш заказ начали готовить</p>
            <p className="text text_type_main-default text_color_inactive mt-2 mb-15">Дождитесь готовности на орбитальной станции</p>
            </>
            )}
        </>
    )
}

OrderDetails.propTypes = {
    buns: ingredientPropTypes, 
    filling: dataPropTypes, 
    price: PropTypes.number,
}
export default OrderDetails;