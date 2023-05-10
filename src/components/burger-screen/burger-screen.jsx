import { createContext } from 'react';
import style from './burger-screen.module.css';
import { } from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerConstructor from '../burger-constructor/burger-constructor.jsx'
import BurgerIngredients from '../burger-ingredients/burger-ingredients.jsx'
import PropTypes from 'prop-types';
import { dataPropTypes } from '../../utils/prop-types-templates';


export const DataContext = createContext();
export const OpenOrderModalContext = createContext();
export const OpenIngredientsModalContext = createContext();

const BurgerScreen = ({ data, openOrderModal, openIngredientsModal }) => (
    <main className={style.main}>
      <DataContext.Provider value={data}>
        <OpenOrderModalContext.Provider value={openOrderModal}>
          <OpenIngredientsModalContext.Provider value={openIngredientsModal}>
            <BurgerIngredients />
            <BurgerConstructor />
          </OpenIngredientsModalContext.Provider>
        </OpenOrderModalContext.Provider>
      </DataContext.Provider>
    </main>  
)

BurgerScreen.propTypes = {
  data: dataPropTypes,
  openOrderModal: PropTypes.func.isRequired,
  openIngredientsModal: PropTypes.func.isRequired
}
export default BurgerScreen;