import style from './group-of-ingredients.module.css';
import Ingredient from '../ingredient/ingredient.jsx'



const GroupOfIngredients = ({title, data, tabId}) => (
  <>
  <h3 id={tabId + '_header'} className={'tab_name text text_type_main-medium'}>{title}</h3>
  <div id={tabId + '_data'} className={`${style.groupContainer} mt-6 ml-4 mb-10`} data-id={title}>
    {data.map(x => <Ingredient key={x["_id"]} data={x} />)}
  </div>
  </>
);

export default GroupOfIngredients;