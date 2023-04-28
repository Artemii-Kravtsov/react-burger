import React from 'react';
import style from './burger-screen.module.css';
import {  } from '@ya.praktikum/react-developer-burger-ui-components';

import BurgerConstructor from '../burger-constructor/burger-constructor.jsx'
import BurgerIngredients from '../burger-ingredients/burger-ingredients.jsx'



class BurgerScreen extends React.Component {

  render = () => {return (
    <main className={`${this.props.container_css} ${style.main}`}>
      <BurgerIngredients />
      <BurgerConstructor />
    </main>  
  )
  }
}

export default BurgerScreen;