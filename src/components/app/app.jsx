import { useState, useEffect } from 'react';
import style from './app.module.css';
import AppHeader from '../app-header/app-header.jsx';
import BurgerScreen from '../burger-screen/burger-screen.jsx'
import Modal from '../modal/modal.jsx';
import IngredientDetails from '../ingredient-details/ingredient-details.jsx';
import OrderDetails from '../order-details/order-details.jsx';
import { useModal } from '../hooks/useModal.jsx';
import { useFetch } from '../hooks/useFetch.jsx';



const ENDPOINT_URL = 'https://norma.nomoreparties.space/api/ingredients'


const App = () => {

  const [selectedScreen, setSelectedScreen] = useState('Конструктор')
  const [wasFetched, setWasFetched] = useState(false)
  const {data, isLoading, hasError, fetchFunc} = useFetch({url: ENDPOINT_URL,
                                                           validationFunc: (data) => data['success'] === true, 
                                                           transformFunc: (data) => data['data'], 
                                                           onSuccess: setWasFetched.bind(this, true)})
  useEffect(fetchFunc, [])
  const [ isOrderModalOpen, openOrderModal, closeOrderModal, dataForOrderModal ] = useModal();
  const [ isIngredientsModalOpen, openIngredientsModal, closeIngredientModal, dataForIngredientModal ] = useModal();

  return (
    <>
      {(isLoading || !wasFetched) && <div className={style.screen}><span className="text text_type_main-large">Загрузка</span></div>}
      {hasError && <div className={style.screen}><span className="text text_type_main-large">Произошла ошибка<br />Обновите страницу</span></div>}
      {!isLoading && !hasError && wasFetched && (
          <>
          <AppHeader onHeaderItemClick={setSelectedScreen} selectedScreen={selectedScreen} />
          {selectedScreen === 'Конструктор' && <BurgerScreen data={data}
                                                             openOrderModal={openOrderModal}
                                                             openIngredientsModal={openIngredientsModal} />}
          {isOrderModalOpen && <Modal closeModalFunc={closeOrderModal}>
                                   <OrderDetails data={dataForOrderModal}/>
                               </Modal>}
          {isIngredientsModalOpen && <Modal header='Детали ингредиента' closeModalFunc={closeIngredientModal}>
                                         <IngredientDetails data={dataForIngredientModal}/>
                                     </Modal>}
          </>
          )}
    </>
  )
}

export default App;
