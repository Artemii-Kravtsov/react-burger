import { TIngredient, TStore, TIngredientGroup } from "./types"


type TGetOrder = {(store: TStore): ReadonlyArray<TIngredient>}

export const getOrderByIdsSelector = (ids: string[]): TGetOrder => (store) => {
    const ingredients: Array<TIngredient> = []
    let ing: TIngredient | undefined
    for (let id of ids) {
        for (let type of ['Булки', 'Начинки', 'Соусы'] as TIngredientGroup[]) {
            ing = store.ingredients.ingredients[type].find((ing) => ing._id === id)
            if (ing) {
                ingredients.push(ing)
                break
            }
        }
    }
    return ingredients
}