import style from './group-of-ingredients.module.css';
import Ingredient from '../ingredient/ingredient'
import { forwardRef, ForwardedRef, LegacyRef, FC } from 'react';
import { TIngredient } from '../../../utils/types';



type TGroupOfIngredients = {
  title: string;
  data: TIngredient[];
  ref: ForwardedRef<HTMLHeadingElement>;
}

const GroupOfIngredients: FC<TGroupOfIngredients> = forwardRef(({ title, data }, ref) => (
  <>
  <h3 ref={ref as LegacyRef<HTMLHeadingElement>} className={'tab_name text text_type_main-medium'}>{title}</h3>
  <div className={`${style.groupContainer} mt-6 ml-4 mb-10`}>
    {data.map(x => <Ingredient key={x["_id"]} data={x} />)}
  </div>
  </>
));

GroupOfIngredients.displayName = 'GroupOfIngredients'
export default GroupOfIngredients;