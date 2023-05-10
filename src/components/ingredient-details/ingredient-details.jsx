import style from './ingredient-details.module.css';
import {  } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { ingredientPropTypes } from '../../utils/prop-types-templates';



const CharsItem = ({ title, value }) => {
    return (<li className={style.charsItem}>
                <h4 className="text text_type_main-default text_color_inactive">{title}</h4>
                <p className="text text_type_digits-default text_color_inactive">{value}</p>
            </li>)
}

const IngredientDetails = ({ data }) => {
    return (<>
            <img src={data.image_large} alt={data.name} />
            <h3 className='text text_type_main-medium mt-4'>{data.name}</h3>
            <ul className={style.chars + " mt-8"}>
               <CharsItem title="Калории,ккал" value={data.calories} />
               <CharsItem title="Белки,г" value={data.proteins} />
               <CharsItem title="Жиры,г" value={data.fat} />
               <CharsItem title="Углеводы,г" value={data.carbohydrates} />
            </ul>
            </>)
}

CharsItem.propTypes = {
    title: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
}
IngredientDetails.propTypes = {
    data: ingredientPropTypes.isRequired
}
export default IngredientDetails;