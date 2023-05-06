import { createContext } from 'react';
import style from './burger-screen.module.css';
import { } from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerConstructor from '../burger-constructor/burger-constructor.jsx'
import BurgerIngredients from '../burger-ingredients/burger-ingredients.jsx'
import PropTypes from 'prop-types';
import { dataPropTypes } from '../../utils/prop-types-templates';



export const openOrderModalContext = createContext();
export const openIngredientsModalContext = createContext();

const BurgerScreen = ({ containerCss, data, openOrderModal, openIngredientsModal }) => (
    <main className={`${containerCss} ${style.main}`}>
      <openOrderModalContext.Provider value={openOrderModal}>
        <openIngredientsModalContext.Provider value={openIngredientsModal}>
          <BurgerIngredients data={data} />
          <BurgerConstructor data={data} />
        </openIngredientsModalContext.Provider>
      </openOrderModalContext.Provider>
    </main>  
)

BurgerScreen.propTypes = {
  data: dataPropTypes,
  containerCss: PropTypes.string.isRequired,
  openOrderModal: PropTypes.func.isRequired,
  openIngredientsModal: PropTypes.func.isRequired
}
export default BurgerScreen;