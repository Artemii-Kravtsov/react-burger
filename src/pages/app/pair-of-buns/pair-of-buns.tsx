import style from './pair-of-buns.module.css';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector } from 'react-redux';
import { FC, PropsWithChildren } from 'react';
import { TStore } from '../../../utils/types';



type TPairOfBuns = {
    extraClass: string;
}

const PairOfBuns: FC<PropsWithChildren<TPairOfBuns>> = ({ extraClass, children }) => {
    const getBuns = (store: TStore) => store.constructor.buns
    const buns = useSelector(getBuns)
    const isEmpty = Object.keys(buns || {}).length ? '' : style.isEmpty
    const name = buns && buns["name"]
    const price = buns && buns["price"]
    const image = buns && buns["image"]

    return (<>
            <ConstructorElement type="top" 
                                isLocked={true} 
                                text={name ? name + ' (верх)' : 'Перетащите булки'} 
                                price={price!} 
                                thumbnail={image!} 
                                extraClass={'mr-4 ml-8 ' + extraClass + ' ' + isEmpty} />
            {children}
            <ConstructorElement type="bottom" 
                                isLocked={true} 
                                text={name ? name + ' (низ)' : 'Перетащите булки'} 
                                price={price!} 
                                thumbnail={image!} 
                                extraClass={'mr-4 ml-8 ' + extraClass + ' ' + isEmpty} />
            </>)
}


export default PairOfBuns;