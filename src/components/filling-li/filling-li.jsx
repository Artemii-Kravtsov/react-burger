import style from './filling-li.module.css';
import PropTypes from 'prop-types';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrag, useDrop } from "react-dnd";
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { swapConstructorItems, removeItemFromConstructor } from '../../services/actions/constructor';


const IngredientPlaceholder = ({id}) => <div key={id} 
                                             className={`constructor-element ${style.placeholder}`}>
                                       </div>

const FillingLI = ({ id, index, name, price, image, onDrop, extraClass }) => {
    const getBlankIdx = (store) => store.constructor.filling.map(x => (x['_id'] === -1)).indexOf(true)
    const blankItemIndex = useSelector(getBlankIdx)
    const dispatch = useDispatch()
    const [, dragRef, dragPreview] = useDrag({
        type: 'constructorItem', 
        item: { index }
    })
    const [, dropRef] = useDrop({
        accept: ['constructorItem', 'fillingItem'],
        hover: (item, monitor) => {
            const dragIndex = item.fromIngredients ? blankItemIndex : item.index
            const hoverIndex = index
            if (dragIndex === hoverIndex || dragIndex === -1) return
            const hoverBoundingRect = dragDropRef.current.getBoundingClientRect()
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
            const hoverActualY = monitor.getClientOffset().y - hoverBoundingRect.top
            if (dragIndex < hoverIndex && hoverActualY < hoverMiddleY) return
            if (dragIndex > hoverIndex && hoverActualY > hoverMiddleY) return
            dispatch(swapConstructorItems(dragIndex, hoverIndex))
            item.index = hoverIndex
        }
    })

    const dragDropRef = dragPreview(dropRef(useRef()))
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
                                    handleClose={() => {onDrop(); dispatch(removeItemFromConstructor(index))}} />
            </li>)
}

FillingLI.propTypes = {
    index: PropTypes.number.isRequired, 
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired, 
    onDrop: PropTypes.func.isRequired,
    extraClass: PropTypes.string
}
export {IngredientPlaceholder, FillingLI}