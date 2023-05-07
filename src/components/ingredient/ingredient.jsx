import { useState, useContext } from 'react';
import style from './ingredient.module.css';
import { OpenIngredientsModalContext } from '../burger-screen/burger-screen.jsx'
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { ingredientPropTypes } from '../../utils/prop-types-templates';



const Ingredient = ({ data }) => {
    const [count, setCount] = useState(0)
    const openIngredientsModal = useContext(OpenIngredientsModalContext)

    return (
        <article className={style.ingredientContainer} onClick={() => openIngredientsModal(data)}>
            {count === 0 ? null : <Counter count={count} size="default" extraClass="" />}
            <img src={data["image"]} alt={data["name"]} className={"ml-4 mr-4"} />
            <div className={style.price + ' mt-1 mb-1'}>
                <p className={"text text_type_digits-default"}>{data["price"]}</p>
                <CurrencyIcon type="primary" />
            </div>
            <p className={`${style.ingredient_name} text text_type_main-default`}>{data["name"]}</p>
        </article>
    )
}

Ingredient.propTypes = {
    data: ingredientPropTypes.isRequired
}
export default Ingredient;