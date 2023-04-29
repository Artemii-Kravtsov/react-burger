import style from './burger-screen.module.css';
import {  } from '@ya.praktikum/react-developer-burger-ui-components';

import BurgerConstructor from '../burger-constructor/burger-constructor.jsx'
import BurgerIngredients from '../burger-ingredients/burger-ingredients.jsx'



const BurgerScreen = ({ containerCss }) => (
    <main className={`${containerCss} ${style.main}`}>
      <BurgerIngredients />
      <BurgerConstructor />
    </main>  
)

export default BurgerScreen;