import {} from '../actions/constructor'

const constructor = (state, action) => {
    switch (action.type) {
        default:
            return state
    }
}

export default constructor



// Получение списка ингредиентов от API. Используется в компоненте BurgerIngredients.
// Получение списка ингредиентов для конструктора бургера. Используется в компоненте BurgerConstructor.
// Добавление данных о просматриваемом в модальном окне IngredientDetails ингредиенте.
// Удаление данных о просматриваемом в модальном окне ингредиенте при закрытии модального окна.
// Получение и обновление номера заказа в модальном окне OrderDetails.