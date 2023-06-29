import style from './burger-filling.module.css';
import { useEffect, forwardRef, FC, ForwardedRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FillingLI, IngredientPlaceholder } from '../filling-li/filling-li';
import { addBlankItemToConstructor, 
         removeBlankItemFromConstructor } from '../../../services/actions/constructor';
import { TStore } from '../../../utils/types';



type TBurgerFilling = {
    isOver: boolean;
    extraClass: string; 
    approxIndex: number | null;
    ref: ForwardedRef<HTMLUListElement>;
}

const BurgerFilling: FC<TBurgerFilling> = forwardRef(({ isOver, extraClass, approxIndex }, ref) => {
    const getFilling = (store: TStore) => store.constructor.filling
    const filling = useSelector(getFilling)
    const dispatch = useDispatch()

    useEffect(() => {
        if (filling.length === 0) return 
        if (isOver) {
            const idx = Math.max(Math.min(0, approxIndex || 0), filling.length)
            dispatch(addBlankItemToConstructor(idx))
        } else {
            dispatch(removeBlankItemFromConstructor())
        }
    // eslint-disable-next-line
    }, [isOver])


    return (<ul ref={ref as ForwardedRef<HTMLUListElement>} className={`${style.fillingContainer} scrollable pr-4`}>
                { filling.length > 0 
                  ? filling.map((elem, index) => (elem['_id'] === '-1'
                                                  ? <IngredientPlaceholder key={index} index={index} />
                                                  : <FillingLI key={elem.id} {...elem} extraClass={extraClass} index={index} />)) 
                  : <div className={style.emptyFilling + ' ' + (isOver ? style.hovered : '')}>
                        <h3 className={'tab_name text text_type_main-default'}>Перетащите ингредиенты<br />в эту область</h3>
                    </div>}
            </ul>)
})

BurgerFilling.displayName = 'BurgerFilling'
export default BurgerFilling;