import { StringLiteral } from "typescript";

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
    // index: number;
}

type TBlankItem = {
    _id: '-1';
    price: 0;
    // id?: string;
}

export type TWSResponse = TResponseSuccess & {
    orders: TWSAnOrder[];
    total: number;
    totalToday: number;
}

export type TWSAnOrder = {
    ingredients: string[];
    _id: string;
    status: 'created' | 'pending' | 'done';
    number: number;
    createdAt: string;
    updatedAt: string;
}

export type WSPrimitives = {
    wsConnected: boolean;
    error?: Event;
}

export type TStore = {
    browsedIngredient: TIngredient | undefined;
    feed: WSPrimitives & {orders: TWSAnOrder[]};
    orders: TFetching & WSPrimitives & {lastOrderId: number | undefined, orders: TWSAnOrder[]};
    ingredients: TFetching & {ingredients: Record<TIngredientGroup, TIngredient[]>};
    constructor: {buns: TConstructorItem | undefined, filling: (TConstructorItem | TBlankItem)[]}
    profile: {loggedIn: boolean} & Nullable<Omit<TUserProfile, 'password'>>;
}