import style from './burger-filling.module.css';
import PropTypes from 'prop-types';
import { useEffect, forwardRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FillingLI, IngredientPlaceholder } from '../filling-li/filling-li';
import { addBlankItemToConstructor, 
         removeBlankItemFromConstructor } from '../../services/actions/constructor';



const BurgerFilling = forwardRef(({ isOver, extraClass, approxIndex }, ref) => {
    const filling = useSelector(store => store.constructor.filling)
    const dispatch = useDispatch()

    useEffect(() => {
        if (filling.length === 0) return 
        if (isOver) {
            const idx = Math.max(Math.min(0, approxIndex), filling.length)
            dispatch(addBlankItemToConstructor(idx))
        } else {
            dispatch(removeBlankItemFromConstructor())
        }
    // eslint-disable-next-line
    }, [isOver])

    return (<ul ref={ref} className={`${style.fillingContainer} scrollable pr-4`}>
                { filling.length > 0 
                  ? filling.map((elem, index) => (elem['_id'] === -1 
                                                  ? <IngredientPlaceholder index={index} /> 
                                                  : <FillingLI {...elem} extraClass={extraClass} index={index} />)) 
                  : <div className={style.emptyFilling + ' ' + (isOver ? style.hovered : '')}>
                        <h3 className={'tab_name text text_type_main-default'}>Перетащите ингредиенты<br />в эту область</h3>
                    </div>}
            </ul>)
})

BurgerFilling.displayName = 'BurgerFilling'
BurgerFilling.propTypes = {
    isOver: PropTypes.bool,
    approxIndex: PropTypes.number,
    extraClass: PropTypes.string
}
export default BurgerFilling;