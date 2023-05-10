import style from './group-of-ingredients.module.css';
import Ingredient from '../ingredient/ingredient.jsx'
import PropTypes from 'prop-types';
import { dataPropTypes } from '../../utils/prop-types-templates';



const GroupOfIngredients = ({ title, data, tabId }) => (
  <>
  <h3 id={tabId + '_header'} className={'tab_name text text_type_main-medium'}>{title}</h3>
  <div id={tabId + '_data'} className={`${style.groupContainer} mt-6 ml-4 mb-10`} data-id={title}>
    {data.map(x => <Ingredient key={x["_id"]} data={x} />)}
  </div>
  </>
);

GroupOfIngredients.propTypes = {
  data: dataPropTypes,
  title: PropTypes.string.isRequired,
  tabId: PropTypes.string.isRequired
} 
export default GroupOfIngredients;