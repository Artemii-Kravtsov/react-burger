import style from './burger-constructor.module.css';
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PairOfBuns from '../pair-of-buns/pair-of-buns.jsx'
import BurgerContent from '../burger-content/burger-content.jsx'
import { useState, useEffect, useContext, useCallback } from 'react';
import { OpenOrderModalContext, DataContext } from '../burger-screen/burger-screen.jsx'



 
const BurgerConstructor = () => {

    const [buns, setBuns] = useState([])
    const [content, setContent] = useState([])
    const [totalPrice, setTotalPrice] = useState(0)
    const data = useContext(DataContext)
    const openOrderModal = useContext(OpenOrderModalContext)

    useEffect(() => {
        setBuns(data.find(x => x.name === "Краторная булка N-200i"))
        setContent(data.filter(x => x.type !== "bun").slice(0, 6))
    }, [])

    useEffect(() => {
        const bunsPrice = (buns && buns.price) || 0
        const contentPrice = (content && content.reduce((partialSum, a) => partialSum + a.price, 0)) || 0
        setTotalPrice(bunsPrice + contentPrice)
    }, [buns['_id'], content.join])


    const leaveAnOrder = useCallback(() => {
        const data = {'buns': buns, 'content': content, 'totalPrice': totalPrice}
        openOrderModal(data)
    })

    return (
        <section className={`${style.constructor} mt-25`}>
            <PairOfBuns data={buns} extraClass={style.constuctorElementMod}>
                <BurgerContent data={content} extraClass={style.constuctorElementMod} />
            </PairOfBuns>

            <div className={style.price + ' mt-6 mr-4'}>
                <p className={"text text_type_digits-medium mr-3"}>{totalPrice}</p>
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