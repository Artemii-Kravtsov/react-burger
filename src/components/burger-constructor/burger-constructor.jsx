import React from 'react';
import style from './burger-constructor.module.css';
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PairOfBuns from '../pair-of-buns/pair-of-buns.jsx'
import BurgerContent from '../burger-content/burger-content.jsx'


import data from '../../utils/data.js'
const tmp_buns = data.find(x => x['name'] === "Краторная булка N-200i")
const tmp_content = data.filter(x => x['type'] !== "bun").slice(0, 6)


class BurgerConstructor extends React.Component {

    state = {totalPrice: tmp_buns['price'] + tmp_content.reduce((partialSum, a) => partialSum + a['price'], 0)}

    render = () => {return (
        <>
        <section className={`${style.constructor} mt-25`}>
            <PairOfBuns data={tmp_buns} extraClass={style.constuctor_element_mod}>
                <BurgerContent data={tmp_content} extraClass={style.constuctor_element_mod} />
            </PairOfBuns>

            <div className={style.price + ' mt-6 mr-4'}>
                <p className={"text text_type_digits-medium mr-3"}>{this.state.totalPrice}</p>
                <CurrencyIcon type="primary" />
                <Button htmlType="button" type="primary" size="large" extraClass={'ml-10'} width="36" height="36">
                    Оформить заказ
                </Button>
            </div>

        </section>
        </>
    )
    }
}

export default BurgerConstructor;