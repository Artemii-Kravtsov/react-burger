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
import ProtectedRoute from './protected-route';
import { Routes, Route } from 'react-router-dom';
import { useLocation, Location } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { getIngredients } from '../services/actions/ingredients';
import { useState, useEffect, FC } from 'react';
import { TStore } from '../utils/types';


type TRoutesContainer = {
  location: Location;
  modalReferer: string | undefined;
  loginReferer: string | undefined;
}

const RoutesContainer: FC<TRoutesContainer> = ({location, modalReferer, loginReferer}) => (
    <>
    <Routes location={(!loginReferer && modalReferer) || location}>
        <Route path="/login" element={<ProtectedRoute 
                                            element={<LoginPage />} 
                                            needAuth={false} />} />
        <Route path="/profile" element={<ProtectedRoute 
                                              element={<ProfilePage />} />}>
            <Route path="orders" element={null} />
            <Route path="" element={<ProfileTab />} />
        </Route>
        <Route path="/register" element={<ProtectedRoute 
                                               element={<RegisterPage />} 
                                               needAuth={false} />} />
        <Route path="/ingredients/:id" element={<IngredientPage />} />
        <Route path="/reset-password" element={<ProtectedRoute 
                                                     element={<ResetPasswordPage />} 
                                                     needAuth={false} />} />
        <Route path="/forgot-password" element={<ProtectedRoute 
                                                      element={<ForgotPasswordPage />} 
                                                      needAuth={false} />} />
        <Route path="/" element={<App />} />
        <Route path="*" element={<Page404 />} />
    </Routes>

    { (!loginReferer && modalReferer) && (
         <Routes>
           <Route path="/ingredients/:id" 
               element={
               <Modal header='Детали ингредиента'>
                   <IngredientPage />
               </Modal>} />
           <Route path="/profile/orders" 
               element={
                <ProtectedRoute 
                      element={<Modal><OrderPage /></Modal>} />} />
         </Routes>) }
    </>
)


const Main = () => {
    const dispatch: any = useDispatch()
    const [wasFetched, setWasFetched] = useState(false)
    const getError = (store: TStore) => !store.ingredients.fetchingSuccess
    const hasError = useSelector(getError)
    const location = useLocation()
    const modalReferer = location.state && location.state.modalReferer;
    const loginReferer = location.state && location.state.loginReferer;
    
    useEffect(() => {
      dispatch(getIngredients({onFinish: setWasFetched.bind(this, true)}))
    }, [dispatch])
  
    return (
      <>
      { !wasFetched && (
          <div className={style.screen}>
            <span className="text text_type_main-large">
              Загрузка
            </span>
          </div>) }

      { wasFetched && hasError && (
          <div className={style.screen}>
            <span className="text text_type_main-large">
              Произошла ошибка<br />Обновите страницу
            </span>
          </div>) }

      { wasFetched && !hasError && (
          <RoutesContainer 
            location={location} 
            modalReferer={modalReferer}
            loginReferer={loginReferer} />) }
      </>
    )
  }

export default Main