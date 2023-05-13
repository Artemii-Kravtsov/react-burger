import style from './burger-constructor.module.css';
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PairOfBuns from '../pair-of-buns/pair-of-buns.jsx'
import BurgerFilling from '../burger-filling/burger-filling.jsx'
import { useContext, useCallback } from 'react';
import { OpenOrderModalContext, CustomBurgerContext } from '../../context/context.js';



 
const BurgerConstructor = () => {

    const openOrderModal = useContext(OpenOrderModalContext)
    const {customBurger, setCustomBurger} = useContext(CustomBurgerContext)
    const {buns, filling, price} = {...customBurger}

    const leaveAnOrder = useCallback(() => {
        openOrderModal({ buns, filling, price })
    })

    return (
        <section className={`${style.constructor} mt-25`}>
            <PairOfBuns buns={buns} extraClass={style.constuctorElementMod}>
                <BurgerFilling filling={filling} extraClass={style.constuctorElementMod} setCustomBurger={setCustomBurger}/>
            </PairOfBuns>

            <div className={style.price + ' mt-6 mr-4'}>
                <p className={"text text_type_digits-medium mr-3"}>{price}</p>
                <CurrencyIcon type="primary" />
                <Button htmlType="button" type="primary" size="large" 
                        extraClass={'ml-10'} width="36" height="36" onClick={leaveAnOrder}>
                    Оформить заказ
                </Button>
            </div>
        </section>
    )
}

export default BurgerConstructor;