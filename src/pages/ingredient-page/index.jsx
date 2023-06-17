import style from './index.module.css';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { removeBrowsedIngredient } from '../../services/actions/browsed-ingredient';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const CharsItem = ({ title, value }) => {
    return (<li className={style.charsItem}>
                <h4 className="text text_type_main-default text_color_inactive">{title}</h4>
                <p className="text text_type_digits-default text_color_inactive">{value}</p>
            </li>)
}

const IngredientPage = () => {
    const { id } = useParams()
    const dispatch = useDispatch()
    const getBrowsedIngredient = (store) => {
        let browsedIngredient = store.browsedIngredient
        let isDirect
        if (Object.keys(browsedIngredient).length > 0) {
            isDirect = false
            return {isDirect, browsedIngredient}
        }
        const allIngredients = store.ingredients.ingredients
        isDirect = true 
        if (!allIngredients) return
        for (let x of ['Булки', 'Соусы', 'Начинки']) {
            browsedIngredient = allIngredients[x].find((ing) => ing['_id'] === id)
            if (browsedIngredient) {return {isDirect, browsedIngredient}}
        }
        return {isDirect, 'browsedIngredient': undefined}

    }
    const {isDirect, browsedIngredient}= useSelector(getBrowsedIngredient)
    useEffect(() => {
        return () => dispatch(removeBrowsedIngredient);
      }, []);

    return (<>
            {browsedIngredient && (
                <div className={isDirect && style.ingredientContainer}>
                    {isDirect && <h2 className='text text_type_main-large mb-8'>Детали ингредиента</h2>}
                    <img src={browsedIngredient.image_large} alt={browsedIngredient.name} />
                    <h3 className='text text_type_main-medium mt-4'>{browsedIngredient.name}</h3>
                    <ul className={style.chars + " mt-8"}>
                        <CharsItem title="Калории,ккал" value={browsedIngredient.calories} />
                        <CharsItem title="Белки,г" value={browsedIngredient.proteins} />
                        <CharsItem title="Жиры,г" value={browsedIngredient.fat} />
                        <CharsItem title="Углеводы,г" value={browsedIngredient.carbohydrates} />
                    </ul>
                </div>
            )}
            </>)
}

CharsItem.propTypes = {
    title: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
}
export default IngredientPage;