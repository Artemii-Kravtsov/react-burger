import { useState, useCallback, FC } from 'react';
import style from './ingredient.module.css';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { DragPreviewImage, useDrag } from "react-dnd";
import { useStore } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { addBrowsedIngredient } from '../../../services/actions/browsed-ingredient';
import { useDispatch } from 'react-redux';
import { TIngredient, TStore } from '../../../utils/types';


type TIngredientComponent = {
    data: TIngredient;
}
const Ingredient: FC<TIngredientComponent> = ({ data }) => {
    const dispatch: any = useDispatch()
    const [count, setCount] = useState<number>(0)
    const store = useStore<TStore>()
    const navigate = useNavigate();

    const decreaseCount = useCallback(() => {
        // я не могу использовать иммутабельный count. поэтому хожу в стор (сам, без подписки)
        if (data.type === 'bun') {
            if ((store.getState().constructor.buns || {})._id !== data._id) setCount(0)
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
                setCount(2)
            }
        },
        collect: monitor => ({
            opacity: monitor.isDragging() ? 0.4 : 1,
        })
    });

    function onIngredientsClick(data: TIngredient) {
        const id = data['_id']
        dispatch(addBrowsedIngredient(data))
        navigate(`/ingredients/${id}`, {state: {modalReferer: '/'}})
    }

    return (
        <>
        <DragPreviewImage connect={dragPreview} src={data["image"]} />
        <article ref={dragRef}
                 style={{ opacity }}
                 className={style.ingredientContainer} 
                 onClick={onIngredientsClick.bind(this, data)} >
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

export default Ingredient;