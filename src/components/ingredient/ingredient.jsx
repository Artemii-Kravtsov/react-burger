import { useState, useContext, useCallback, useEffect } from 'react';
import style from './ingredient.module.css';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { ingredientPropTypes } from '../../utils/prop-types-templates';
import { OpenIngredientsModalContext } from '../../context/context.js';
import { DragPreviewImage, useDrag } from "react-dnd";
import { useStore } from 'react-redux';


const Ingredient = ({ data }) => {
    const [count, setCount] = useState(0)
    const openIngredientsModal = useContext(OpenIngredientsModalContext)
    const store = useStore()

    // подписан на кол-во заказов, чтобы на каждый новый - обнулять счётчик
    // const ordersPlaced = useSelector(store => store.orders.orders.length)
    // useEffect(() => {count !== 0 && setCount(0)}, [ordersPlaced])

    const decreaseCount = useCallback(() => {
        // я не могу использовать иммутабельный count. поэтому хожу в стор (сам, без подписки)
        if (data.type === 'bun') {
            if (store.getState().constructor.buns._id !== data._id) setCount(0)
        } else {
            setCount(store.getState().constructor.filling.filter((x) => x._id === data._id).length -1)
        }
    }, [])

    const [{opacity}, dragRef, dragPreview] = useDrag({
        type: data.type === 'bun' ? 'bunItem' : 'fillingItem',
        item: {...data, 
               fromIngredients: true,
               onDrop: decreaseCount},
        end: (item, monitor) => {
            if (!monitor.didDrop()) return
            if (item.type !== 'bun') {
                setCount(count +1)
            } else if (count === 0) {
                setCount(1)
            }
        },
        collect: monitor => ({
            opacity: monitor.isDragging() ? 0.4 : 1,
        })
    });

    return (
        <>
        <DragPreviewImage connect={dragPreview} src={data["image"]} />
        <article ref={dragRef}
                 style={{ opacity }}
                 className={style.ingredientContainer} 
                 onClick={() => openIngredientsModal(data)} >
            {count === 0 ? null : <Counter count={count} size="default" extraClass="" />}
            <img src={data["image"]} alt={data["name"]} className={"ml-4 mr-4"} />
            <div className={style.price + ' mt-1 mb-1'}>
                <p className={"text text_type_digits-default"}>{data["price"]}</p>
                <CurrencyIcon type="primary" />
            </div>
            <p className={`${style.ingredient_name} text text_type_main-default`}>{data["name"]}</p>
        </article>
        </>
    )
}

Ingredient.propTypes = {
    data: ingredientPropTypes.isRequired
}
export default Ingredient;