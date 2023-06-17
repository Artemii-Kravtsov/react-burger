import style from './index.module.css';

import App from './app';
import LoginPage from './login';
import Page404 from './page-404';
import IngredientPage from './ingredient-page';
import ProfilePage from './profile';
import RegisterPage from './register';
import ResetPasswordPage from './reset-password';
import ForgotPasswordPage from './forgot-password';
import ProfileTab from './profile/profile-tab/profile-tab';
import Modal from './modal/modal';
import OrderPage from './order-page';

import { Routes, Route } from 'react-router-dom';
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { getIngredients } from '../services/actions/ingredients';
import { useState, useEffect } from 'react';


const RoutesContainer = ({location, modalReferer}) => (
    <>
    <Routes location={modalReferer || location}>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/profile" element={<ProfilePage />}>
            <Route path="orders" element={null} />
            <Route path="" element={<ProfileTab />} />
        </Route>
        <Route path="/register" element={<RegisterPage />}></Route>
        <Route path="/ingredients/:id" element={<IngredientPage />}></Route>
        <Route path="/reset-password" element={<ResetPasswordPage />}></Route>
        <Route path="/forgot-password" element={<ForgotPasswordPage />}></Route>
        <Route path="/" element={<App />}></Route>
        <Route path="*" element={<Page404 />}></Route>
    </Routes>

    {modalReferer && (
        <Routes>
          <Route path="/ingredients/:id" 
              element={
              <Modal header='Детали ингредиента'>
                  <IngredientPage />
              </Modal>} />
          <Route path="/profile/orders" 
              element={
              <Modal>
                  <OrderPage />
              </Modal>} />
        </Routes>)}
    </>
)


const Main = () => {
    const dispatch = useDispatch()
    const [wasFetched, setWasFetched] = useState(false)
    const getError = (store) => !store.ingredients.fetchingSuccess
    const hasError = useSelector(getError)
    const location = useLocation()
    const modalReferer = location.state && location.state.modalReferer;
  
    useEffect(() => {
      dispatch(getIngredients({onFinish: setWasFetched.bind(this, true)}))
    }, [dispatch])
  
    return (
      <>
      { !wasFetched && <div className={style.screen}>
                             <span className="text text_type_main-large">
                               Загрузка
                             </span>
                         </div> }
      { wasFetched && hasError && <div className={style.screen}>
                                        <span className="text text_type_main-large">
                                          Произошла ошибка<br />Обновите страницу
                                        </span>
                                    </div>}
      { wasFetched && !hasError && <RoutesContainer 
                                        location={location} 
                                        modalReferer={modalReferer} /> }
      </>
    )
  }

export default Main