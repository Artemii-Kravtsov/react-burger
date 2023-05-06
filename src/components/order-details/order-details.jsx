import style from './order-details.module.css';
import blopImg from '../../images/blop.png'
import {  } from '@ya.praktikum/react-developer-burger-ui-components';
import { dataPropTypes } from '../../utils/prop-types-templates';



const OrderDetails = ({ data }) => {
    return (<>
        <h3 className={`${style.orderId} text text_type_digits-large mt-2`}>034536</h3>
        <p className="text text_type_main-medium mt-8">идентификатор заказа</p>
        <img className="mt-15" src={blopImg} alt="Ваш заказ начали готовить" />
        <p className="text text_type_main-default mt-15">Ваш заказ начали готовить</p>
        <p className="text text_type_main-default text_color_inactive mt-2 mb-15">Дождитесь готовности на орбитальной станции</p>
        </>)
}

OrderDetails.propTypes = {
    data: dataPropTypes
}
export default OrderDetails;