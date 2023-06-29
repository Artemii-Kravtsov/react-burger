import style from './index.module.css';
import { useSelector } from 'react-redux';
import { removeBrowsedIngredient } from '../../services/actions/browsed-ingredient';
import { useDispatch } from 'react-redux';
import { useEffect, FC } from 'react';
import { useParams } from 'react-router-dom';
import { TIngredient, TStore, TIngredientGroup, TBlindFunction } from '../../utils/types';


const CharsItem: FC<{title: string, value: number}> = ({ title, value }) => (
        <li className={style.charsItem}>
            <h4 className="text text_type_main-default text_color_inactive">{title}</h4>
            <p className="text text_type_digits-default text_color_inactive">{value}</p>
        </li>
)

type TGetIngredient = (store: TStore) => {isDirect: boolean, browsedIngredient: TIngredient | undefined}

const IngredientPage: FC = () => {
    const dispatch = useDispatch()
    const { id } = useParams<string>()
    const getBrowsedIngredient: TGetIngredient = (store) => {
        let browsedIngredient = store.browsedIngredient
        let isDirect
        if (browsedIngredient) {
            isDirect = false
            return {isDirect, browsedIngredient}
        }
        const allIngredients = store.ingredients.ingredients
        isDirect = true 
        if (allIngredients) {
            for (let x of ['Булки', 'Соусы', 'Начинки'] as TIngredientGroup[]) {
                browsedIngredient = allIngredients[x].find((ing) => ing['_id'] === id)
                if (browsedIngredient) {
                    return {isDirect, browsedIngredient}
                }
            }
        }
        return {isDirect, browsedIngredient: undefined}

    }
    const {isDirect, browsedIngredient} = useSelector(getBrowsedIngredient)
    useEffect((): TBlindFunction => () => dispatch(removeBrowsedIngredient()), []);

    return (<>
            {browsedIngredient && (
                <div className={isDirect ? style.ingredientContainer : ''}>
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

export default IngredientPage;