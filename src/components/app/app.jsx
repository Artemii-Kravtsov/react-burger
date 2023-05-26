import { useState, useEffect } from 'react';
import style from './app.module.css';
import AppHeader from '../app-header/app-header.jsx';
import Modal from '../modal/modal.jsx';
import IngredientDetails from '../ingredient-details/ingredient-details.jsx';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import OrderDetails from '../order-details/order-details.jsx';
import { useModal } from '../../hooks/useModal.jsx';
import { OpenOrderModalContext, OpenIngredientsModalContext } from '../../context/context.js';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useDispatch, useSelector } from 'react-redux';
import { addBrowsedIngredient, removeBrowsedIngredient } from '../../services/actions/browsed-ingredient';
import { getIngredients } from '../../services/actions/ingredients';


const App = () => {
  const dispatch = useDispatch()
  const [selectedScreen, setSelectedScreen] = useState('Конструктор')
  const [wasFetched, setWasFetched] = useState(false)
  const getError = (store) => !store.ingredients.fetchingSuccess
  const hasError = useSelector(getError)
  useEffect(() => {
    dispatch(getIngredients({onFinish: setWasFetched.bind(this, true)}))
  }, [dispatch])

  function onIngredientsModalOpen(data) {dispatch(addBrowsedIngredient(data))}
  function onIngredientsModalClose() {dispatch(removeBrowsedIngredient())}

  const [ isOrderModalOpen, 
          openOrderModal, 
          closeOrderModal ] = useModal();
  const [ isIngredientsModalOpen, 
          openIngredientsModal, 
          closeIngredientModal ] = useModal(onIngredientsModalOpen, 
                                            onIngredientsModalClose);

  return (
    <>
      { !wasFetched && <div className={style.screen}>
                           <span className="text text_type_main-large">Загрузка</span>
                       </div> }
      { wasFetched && hasError && <div className={style.screen}>
                                      <span className="text text_type_main-large">Произошла ошибка<br />Обновите страницу</span>
                                  </div>}
      { wasFetched && !hasError && (
        <DndProvider backend={HTML5Backend}>
            <OpenOrderModalContext.Provider value={openOrderModal}>
              <OpenIngredientsModalContext.Provider value={openIngredientsModal}>

                      <AppHeader onHeaderItemClick={setSelectedScreen} selectedScreen={selectedScreen} />
                      {selectedScreen === 'Конструктор' && <main className={style.main}>
                                                               <BurgerIngredients />
                                                               <BurgerConstructor />
                                                           </main>}
                      {isOrderModalOpen && <Modal closeModalFunc={closeOrderModal}>
                                              <OrderDetails />
                                          </Modal>}
                      {isIngredientsModalOpen && <Modal header='Детали ингредиента' closeModalFunc={closeIngredientModal}>
                                                    <IngredientDetails />
                                                </Modal>}
                                                
              </OpenIngredientsModalContext.Provider>
            </OpenOrderModalContext.Provider>
        </DndProvider>)}
    </>
  )
}

export default App;

