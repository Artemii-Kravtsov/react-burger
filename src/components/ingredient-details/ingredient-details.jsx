import style from './ingredient-details.module.css';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';



const CharsItem = ({ title, value }) => {
    return (<li className={style.charsItem}>
                <h4 className="text text_type_main-default text_color_inactive">{title}</h4>
                <p className="text text_type_digits-default text_color_inactive">{value}</p>
            </li>)
}

const IngredientDetails = () => {
    const browsedIngredient = useSelector((store) => store.browsedIngredient)

    return (<>
            <img src={browsedIngredient.image_large} alt={browsedIngredient.name} />
            <h3 className='text text_type_main-medium mt-4'>{browsedIngredient.name}</h3>
            <ul className={style.chars + " mt-8"}>
               <CharsItem title="Калории,ккал" value={browsedIngredient.calories} />
               <CharsItem title="Белки,г" value={browsedIngredient.proteins} />
               <CharsItem title="Жиры,г" value={browsedIngredient.fat} />
               <CharsItem title="Углеводы,г" value={browsedIngredient.carbohydrates} />
            </ul>
            </>)
}

CharsItem.propTypes = {
    title: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
}
export default IngredientDetails;