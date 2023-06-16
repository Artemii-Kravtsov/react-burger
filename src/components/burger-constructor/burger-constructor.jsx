import { v4 as uuidv4 } from 'uuid';
import style from './burger-constructor.module.css';
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PairOfBuns from '../pair-of-buns/pair-of-buns.jsx'
import BurgerFilling from '../burger-filling/burger-filling.jsx'
import { useContext, useRef } from 'react';
import { OpenOrderModalContext } from '../../context/context.js';
import { useDrop } from "react-dnd";
import { useDispatch, useSelector } from 'react-redux';
import { swapWithBlank,
         addBunsToConstructor,
         addFillingToConstructor, } from '../../services/actions/constructor';


const BurgerConstructor = () => {
    const dispatch = useDispatch()
    const getBuns = (store) => store.constructor.buns._id 
                               ? [store.constructor.buns.onDrop, store.constructor.buns.price * 2]
                               : [() => undefined, 0]
    const getFilling = (store) => store.constructor.filling.length > 0
                               ? store.constructor.filling.reduce((part, a) => part + a.price, 0)
                               : 0
    const [onBunsChange, bunsPrice] = useSelector(getBuns)
    const fillingPrice = useSelector(getFilling)
    const openOrderModal = useContext(OpenOrderModalContext)

    const [{isOverBun}, dropBun] = useDrop({
        accept: 'bunItem',
        collect: monitor => ({isOverBun: monitor.isOver()}),
        drop: (item) => {
            dispatch(addBunsToConstructor({...item, 'id': uuidv4()}))
            onBunsChange()
        }
    })

    const [{isOverFilling, approxIndex}, dropFilling] = useDrop({
        accept: 'fillingItem',
        collect: monitor => ({
            isOverFilling: monitor.isOver(), 
            // индекс ингредиента, на который попадает дроп-элемент
            approxIndex: monitor.getClientOffset() 
                           && Math.ceil((monitor.getClientOffset().y 
                                    - burgerFillingRef.current.getBoundingClientRect().top 
                                    + burgerFillingRef.current.scrollTop) 
                                    / (80 + 16))
        }),
        hover: (item, monitor) => {
            const area = burgerFillingRef.current
            if (area.scrollHeight === area.clientHeight) return
            // если курсор ниже, чем видимая часть контейнера burgerFilling
            // и если проскролленая высота + высота видимой части контейнера не равна высоте 
            // содержимого burgerFilling, то проскроллить 8 пикселей вниз
            if (monitor.getClientOffset().y > area.getBoundingClientRect().bottom
                        && Math.abs(area.scrollHeight - area.clientHeight - area.scrollTop) > 1) {
                area.scrollBy(0, 8)
            } else if (monitor.getClientOffset().y < area.getBoundingClientRect().top 
                        && area.scrollTop > -20) {
                area.scrollBy(0, -8)
            }
        },
        drop: (item) => {
            fillingPrice > 0   // есть ли добавленные ингредиенты, можно (пока что) понять по рассчитанной стоимости
            ? dispatch(swapWithBlank({...item, 'id': uuidv4()}))
            : dispatch(addFillingToConstructor({...item, 'id': uuidv4()}))
        }
    })

    const burgerFillingRef = useRef()
    const dropRefBase = useRef()
    const dropRefs = dropFilling(dropBun(dropRefBase))
    return (
        <section className={`${style.constructor} mt-25`} ref={dropRefs}>

            <PairOfBuns extraClass={`${style.constuctorElementMod} ${isOverBun ? style.isOverByBuns : ''}`}>
                <BurgerFilling isOver={isOverFilling} 
                               approxIndex={approxIndex} 
                               extraClass={style.constuctorElementMod} 
                               ref={burgerFillingRef} />
            </PairOfBuns>

            <div className={style.price + ' mt-6 mr-4'}>
                <p className={"text text_type_digits-medium mr-3"}>{fillingPrice + bunsPrice}</p>
                <CurrencyIcon type="primary" />
                <Button htmlType="button" type="primary" size="large" 
                        extraClass={'ml-10'} width="36" height="36"
                        disabled={!(fillingPrice && bunsPrice)}  // чтобы заработало, добавил параметр disabled в компонент Button
                        onClick={openOrderModal}>
                    Оформить заказ
                </Button>
            </div>
        </section>
    )
}

export default BurgerConstructor;