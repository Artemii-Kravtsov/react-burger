import { useDispatch } from 'react-redux';

type Nullable<T> = { [K in keyof T]: T[K] | undefined };

export type TBlindFunction = () => void

export type TResponseSuccess = {
    success: boolean;
}

export type TResponseMessage = {
    message: string;
}

export type THandlers<T> = {
    onError?: (error: Error) => void;
    onSuccess?: (data: T) => void;
    onFinish?: () => void;
}

export type TActionFunc = (dispatch: ReturnType<typeof useDispatch>) => void

export type TActionFuncWithState = (dispatch: ReturnType<typeof useDispatch>, 
                                    getState: (...args: any) => TStore) => void

export type TIngredientGroup = 'Булки' | 'Начинки' | 'Соусы'

export type TIngredient = {
    __v: number;
    _id: string;
    calories: number;
    carbohydrates: number;
    fat: number;
    image: string;
    image_large: string;
    image_mobile: string;
    name: string;
    price: number;
    proteins: number;
    type: string;
}

export type TOrder = {
    name: string;
    orderId: number;
    ingredients: string[];
}

export type TFetching = {
    isFetching: boolean, 
    fetchingSuccess: boolean,
}

export type TUserProfile = {
    name: string;
    email: string;
    password: string;
}

export type TConstructorItem = TIngredient & {
    onDrop: TBlindFunction;
    id: string;
}

export type TStore = {
    browsedIngredient: TIngredient | undefined;
    orders: TFetching & {orders: TOrder[]};
    ingredients: TFetching & {ingredients: Record<TIngredientGroup, TIngredient[]>};
    constructor: {buns: TConstructorItem | undefined, filling: TConstructorItem[]}
    profile: {loggedIn: boolean} & Nullable<Omit<TUserProfile, 'password'>>;
}