import style from './burger-constructor.module.css';
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PairOfBuns from '../pair-of-buns/pair-of-buns.jsx'
import BurgerFilling from '../burger-filling/burger-filling.jsx'
import { useContext, useCallback } from 'react';
import { OpenOrderModalContext, CustomBurgerContext } from '../../context/context.js';

import { useDrop } from "react-dnd";
import { useDispatch, useSelector } from 'react-redux';
import { addBunsToConstructor } from '../../services/actions/constructor';



const BurgerConstructor = () => {
    const dispatch = useDispatch()
    const [onBunsChange, bunsPrice] = useSelector(store => store.constructor.buns._id 
                                            ? [store.constructor.buns.onDrop, store.constructor.buns.price * 2]
                                            : [() => undefined, 0])
    const fillingPrice = useSelector(store => store.constructor.filling.length > 0
                                            ? store.constructor.filling.reduce((part, a) => part + a.price, 0)
                                            : 0)
    const openOrderModal = useContext(OpenOrderModalContext)
    const {customBurger, setCustomBurger} = useContext(CustomBurgerContext)
    const {buns, filling, price} = {...customBurger}

    const leaveAnOrder = useCallback(() => {
        openOrderModal({ buns, filling, price })
    })

    const [{isOver}, drop] = useDrop({
        accept: 'bunItem',
        drop: (item, monitor) => {
            onBunsChange()
            dispatch(addBunsToConstructor(item))
        },
        collect: monitor => ({
            isOver: monitor.isOver()
        })
    })

    return (
        <section className={`${style.constructor} mt-25`} ref={drop}>

            <PairOfBuns extraClass={`${style.constuctorElementMod} ${isOver ? style.isOverByBuns : ''}`}>
                <BurgerFilling extraClass={style.constuctorElementMod}/>
            </PairOfBuns>

            <div className={style.price + ' mt-6 mr-4'}>
                <p className={"text text_type_digits-medium mr-3"}>{fillingPrice + bunsPrice}</p>
                <CurrencyIcon type="primary" />
                <Button htmlType="button" type="primary" size="large" 
                        extraClass={'ml-10'} width="36" height="36"
                        disabled={!(fillingPrice && bunsPrice)}  // чтобы заработало, добавил параметр disabled в компонент Button
                        onClick={leaveAnOrder}>
                    Оформить заказ
                </Button>
            </div>
        </section>
    )
}

export default BurgerConstructor;