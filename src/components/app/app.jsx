import { useState, useEffect, useReducer } from 'react';
import style from './app.module.css';
import AppHeader from '../app-header/app-header.jsx';
import Modal from '../modal/modal.jsx';
import IngredientDetails from '../ingredient-details/ingredient-details.jsx';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import OrderDetails from '../order-details/order-details.jsx';
import { useModal } from '../../hooks/useModal.jsx';
import { useFetch } from '../../hooks/useFetch.jsx';
import { DataContext, OpenOrderModalContext, OpenIngredientsModalContext, CustomBurgerContext } from '../../context/context.js';
import { BASE_URL } from '../../context/constants.js'



function addTotalPrice(customBurgerObj, action) {
  // стейт customBurger содержит не только информацию про булку и начинку, но и цену. чтобы изменить customBurger, 
  // нужно передать действие (action) + ингредиент (data), либо только ингредиенты (data). в редьюсере произойдёт
  // перерасчёт цены. для теста можно поудалять ингредиенты
  let orderNumber
  let buns = customBurgerObj.buns && {...customBurgerObj.buns}
  let filling = (customBurgerObj.filling && [...customBurgerObj.filling]) || []
  switch(action.type) {
    case 'add':
      if (action.data.type === 'buns') {
        buns = action.data
      } else {
        filling.push(action.data)
      }
      break
    case 'pop':
      if (action.data.type === 'buns') {
        buns = undefined
      } else {
        const index = filling.map(x => x._id).indexOf(action.data._id);
        (index !== -1) && filling.splice(index, 1)
      }
      break
    case 'ordered':
      orderNumber = action.data
      break
    default:
      buns = action.data.buns
      filling = action.data.filling
  }
  const bunsPrice = (buns && buns.price * 2)
  const contentPrice = (filling && filling.reduce((partialSum, a) => partialSum + a.price, 0))
  return {buns, filling, orderNumber, price: (bunsPrice || 0) + (contentPrice || 0)}
}



const App = () => {

  const [selectedScreen, setSelectedScreen] = useState('Конструктор')
  const [wasFetched, setWasFetched] = useState(false)
  const [customBurger, setCustomBurger] = useReducer(addTotalPrice, {buns: undefined, 
                                                                     filling: undefined,
                                                                     orderNumber: undefined,
                                                                     price: 0})
  const {data, isLoading, hasError, fetchFunc} = useFetch({url: BASE_URL + 'ingredients',
                                                           validationFunc: (data) => data['success'] === true, 
                                                           transformFunc: (data) => data['data'], 
                                                           onSuccess: setWasFetched.bind(this, true)})
  useEffect(fetchFunc, [])
  useEffect(() => {
    // рандомный выбор ингредиентов
    function shuffleArray(array) {
      for (var i = array.length - 1; i > 0; i--) {
          var j = Math.floor(Math.random() * (i + 1));
          var temp = array[i];
          array[i] = array[j];
          array[j] = temp;
      }
      return array
    }
    const buns = (data || []).filter(x => x.type === "bun")
    const selectedBun = buns[Math.floor(Math.random() * buns.length)]
    const selectedFilling = shuffleArray((data || []).filter(x => x.type !== "bun")).slice(0, 4)
    setCustomBurger({'data': { 'buns': selectedBun, 'filling': selectedFilling }})
  }, [data])

  const [ isOrderModalOpen, openOrderModal, closeOrderModal, dataForOrderModal ] = useModal();
  const [ isIngredientsModalOpen, openIngredientsModal, closeIngredientModal, dataForIngredientModal ] = useModal();


  return (
    <>
      {(isLoading || !wasFetched) && (<div className={style.screen}>
                                        <span className="text text_type_main-large">Загрузка</span>
                                      </div>)}
      {hasError && (<div className={style.screen}>
                      <span className="text text_type_main-large">Произошла ошибка<br />Обновите страницу</span>
                    </div>)}

      {!isLoading && !hasError && wasFetched && (
        <DataContext.Provider value={data}>
          <OpenOrderModalContext.Provider value={openOrderModal}>
            <OpenIngredientsModalContext.Provider value={openIngredientsModal}>
              <CustomBurgerContext.Provider value={{customBurger, setCustomBurger}}>

                    <AppHeader onHeaderItemClick={setSelectedScreen} selectedScreen={selectedScreen} />
                    {selectedScreen === 'Конструктор' && (<main className={style.main}>
                                                                <BurgerIngredients />
                                                                <BurgerConstructor />
                                                          </main>)}
                    {isOrderModalOpen && <Modal closeModalFunc={closeOrderModal}>
                                             <OrderDetails {...dataForOrderModal}/>
                                         </Modal>}
                    {isIngredientsModalOpen && <Modal header='Детали ингредиента' closeModalFunc={closeIngredientModal}>
                                                   <IngredientDetails data={dataForIngredientModal}/>
                                               </Modal>}
                                               
              </CustomBurgerContext.Provider>
            </OpenIngredientsModalContext.Provider>
          </OpenOrderModalContext.Provider>
        </DataContext.Provider>)}
    </>
  )
}

export default App;

