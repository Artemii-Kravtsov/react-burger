import style from './burger-filling.module.css';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { dataPropTypes } from '../../utils/prop-types-templates';



const BurgerFilling = ({ extraClass, filling, setCustomBurger }) => {
    const deleteIngredient = (ingredient) => setCustomBurger({'type': 'pop', 'data': ingredient})

    return (<ul className={`${style.fillingContainer} scrollable pr-4`}>
                {filling.length === 0 ? null : filling.map((elem) => (
                    <li key={elem['_id']} className={style.anElement}>
                        <DragIcon type="primary" />
                        <ConstructorElement text={elem.name} price={elem.price} thumbnail={elem.image} 
                                            extraClass={extraClass} handleClose={deleteIngredient.bind(this, elem)}/>
                    </li>
                ))}
            </ul>)
}


BurgerFilling.propTypes = {
    filling: dataPropTypes,
    extraClass: PropTypes.string,
    dataPropTypes: PropTypes.func
}
export default BurgerFilling;