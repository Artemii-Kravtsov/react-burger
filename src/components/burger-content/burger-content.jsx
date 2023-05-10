import style from './burger-content.module.css';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { dataPropTypes } from '../../utils/prop-types-templates';



const BurgerContent = ({ extraClass, data }) => (
    <ul className={`${style.contentContainer} scrollable pr-4`}>
        {data.length === 0 ? null : data.map((elem) => (
            <li key={elem['_id']} className={style.anElement}>
                <DragIcon type="primary" />
                <ConstructorElement text={elem.name} price={elem.price} thumbnail={elem.image} extraClass={extraClass}/>
            </li>
        ))}
    </ul>
)


BurgerContent.propTypes = {
    data: dataPropTypes,
    extraClass: PropTypes.string
}
export default BurgerContent;