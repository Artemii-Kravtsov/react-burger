import { useState, useMemo, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { dataPropTypes } from '../../utils/prop-types-templates';

import style from './app.module.css';
import AppHeader from '../app-header/app-header.jsx';
import BurgerScreen from '../burger-screen/burger-screen.jsx'
import withFetch from '../hocs/with-fetch';
import Modal from '../modal/modal.jsx';
import ModalOverlay from '../modal-overlay/modal-overlay.jsx';
import IngredientDetails from '../ingredient-details/ingredient-details.jsx';
import OrderDetails from '../order-details/order-details.jsx';


const useModal = (ModalComponent, header, isOpenedByDefault) => {
  const [isSeen, setIsSeen] = useState(isOpenedByDefault)
  const [modalData, setModalData] = useState()

  const openModal = useCallback((data) => {
    setIsSeen(true)
    setModalData(data)
  }, [])

  const closeModal = useCallback(() => {
    setIsSeen(false)
    setModalData()
  }, [])

  const preparedModal = useMemo(() => isSeen && createPortal((<>
                                                              <ModalOverlay closeFunc={closeModal} />
                                                              <Modal header={header} closeFunc={closeModal}>
                                                                <ModalComponent data={modalData} />
                                                              </Modal>
                                                              </>), modalRoot), 
                                [modalData, isSeen])
  return [preparedModal, openModal, closeModal]
}



const AppBase = ({ data }) => {
  const [selectedScreen, setSelectedScreen] = useState('Конструктор')
  const [preparedOrdersModal, openOrderModal] = useModal(OrderDetails, '', false)
  const [preparedIngredientsModal, openIngredientsModal] = useModal(IngredientDetails, 'Детали ингредиента', false)

  return (
    <>
      <AppHeader onHeaderItemClick={setSelectedScreen} selectedScreen={selectedScreen} />
      {selectedScreen === 'Конструктор' && <BurgerScreen data={data} 
                                                         containerCss={style.main} 
                                                         openOrderModal={openOrderModal}
                                                         openIngredientsModal={openIngredientsModal} /> }
      {preparedOrdersModal}
      {preparedIngredientsModal}
    </>
  )
}


const modalRoot = document.getElementById("react-modals");
const ENDPOINT_URL = 'https://norma.nomoreparties.space/api/ingredients'



AppBase.propTypes = {data: dataPropTypes}
const App = withFetch(
                {url: ENDPOINT_URL, 
                 validationFunc: (data) => data['success'] === true,
                 transformFunc: (data) => data['data']}
            )(AppBase)
App.displayName = 'App'

export default App;
