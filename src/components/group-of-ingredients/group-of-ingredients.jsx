import style from './group-of-ingredients.module.css';
import Ingredient from '../ingredient/ingredient.jsx'
import PropTypes from 'prop-types';
import { forwardRef } from 'react';
import { dataPropTypes } from '../../utils/prop-types-templates';



const GroupOfIngredients = forwardRef(({ title, data }, ref) => (
  <>
  <h3 ref={ref} className={'tab_name text text_type_main-medium'}>{title}</h3>
  <div className={`${style.groupContainer} mt-6 ml-4 mb-10`}>
    {data.map(x => <Ingredient key={x["_id"]} data={x} />)}
  </div>
  </>
));

GroupOfIngredients.displayName = 'GroupOfIngredients'
GroupOfIngredients.propTypes = {
  data: dataPropTypes,
  title: PropTypes.string.isRequired
}
export default GroupOfIngredients;