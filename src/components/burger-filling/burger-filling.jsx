import style from './burger-filling.module.css';
import PropTypes from 'prop-types';
import { useDrop } from "react-dnd";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FillingLI, IngredientPlaceholder } from '../filling-li/filling-li';
import { swapWithBlank,
         addFillingToConstructor,
         addBlankItemToConstructor, 
         removeBlankItemFromConstructor } from '../../services/actions/constructor';



const BurgerFilling = ({ extraClass }) => {
    const filling = useSelector(store => store.constructor.filling)
    const dispatch = useDispatch()
    const [{isOver}, drop] = useDrop({
        accept: 'fillingItem',
        drop: (item, monitor) => {
            filling.length > 0 
            ? dispatch(swapWithBlank(item))
            : dispatch(addFillingToConstructor(item))
        },
        collect: monitor => ({
            isOver: monitor.isOver()
        })
    })

    useEffect(() => {
        if (isOver && filling.length > 0) {
            dispatch(addBlankItemToConstructor())
        } else {
            dispatch(removeBlankItemFromConstructor())
        }
    }, [isOver])

    return (<ul ref={drop} className={`${style.fillingContainer} scrollable pr-4`}>
                { filling.length > 0 
                  ? filling.map((elem, index) => (elem['_id'] === -1 
                                                    ? <IngredientPlaceholder index={index} /> 
                                                    : <FillingLI {...elem} extraClass={extraClass} index={index} />)) 
                  : (<div className={style.emptyFilling + ' ' + (isOver ? style.hovered : '')}>
                        <h3 className={'tab_name text text_type_main-default'}>Перетащите ингредиенты<br />в эту область</h3>
                    </div>)}
            </ul>)
}


BurgerFilling.propTypes = {
    extraClass: PropTypes.string
}
export default BurgerFilling;