import style from './filling-li.module.css';
import { useDrag, useDrop } from "react-dnd";
import { useRef, FC, LegacyRef, RefObject } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TBlindFunction, TStore } from '../../../utils/types';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { swapConstructorItems, removeItemFromConstructor } from '../../../services/actions/constructor';


type TFillingLI = {
    id: string;
    index: number;
    name: string;
    price: number;
    image: string;
    onDrop: TBlindFunction;
    extraClass: string;
}

type TPlaceholder = {
    index: number;
}

const IngredientPlaceholder: FC<TPlaceholder> = ({ index }) => (
        <div key={index} 
          className={`constructor-element ${style.placeholder}`}>
        </div>
)

const FillingLI: FC<TFillingLI> = ({ id, index, name, price, image, onDrop, extraClass }) => {
    const getBlankIdx = (store: TStore) => store.constructor.filling.map(x => (x['_id'] === '-1')).indexOf(true)
    const blankItemIndex = useSelector(getBlankIdx)
    const dispatch = useDispatch()
    const [, dragRef, dragPreview] = useDrag({
        type: 'constructorItem', 
        item: { index }
    })

    const [, dropRef] = useDrop({
        accept: ['constructorItem', 'fillingItem'],
        hover: (item: {index: number, fromIngredients?: boolean}, monitor) => {
            const dragIndex = item.fromIngredients ? blankItemIndex : item.index
            const hoverIndex = index
            if (dragIndex === hoverIndex || dragIndex === -1) return
            const ref = (dragDropRef as RefObject<HTMLLIElement>).current
            const hoverBoundingRect = ref!.getBoundingClientRect()
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
            const hoverActualY = monitor.getClientOffset()!.y - hoverBoundingRect.top
            if (dragIndex < hoverIndex && hoverActualY < hoverMiddleY) return
            if (dragIndex > hoverIndex && hoverActualY > hoverMiddleY) return
            dispatch(swapConstructorItems(dragIndex, hoverIndex))
            item.index = hoverIndex
        }
    })

    const dragDropRef = dragPreview(dropRef(useRef<HTMLLIElement>())) as LegacyRef<HTMLLIElement>
    return (<li key={id} 
                className={style.anElement} 
                ref={dragDropRef} >
                <span className={style.dragWrapper} ref={dragRef} >
                    <DragIcon type="primary"/>
                </span>
                <ConstructorElement text={name} 
                                    price={price} 
                                    thumbnail={image} 
                                    extraClass={extraClass} 
                                    handleClose={() => {
                                        onDrop();
                                        dispatch(removeItemFromConstructor(index))}
                                    } />
            </li>)
}

export {IngredientPlaceholder, FillingLI}