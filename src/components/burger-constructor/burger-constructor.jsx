import style from './burger-constructor.module.css';
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PairOfBuns from '../pair-of-buns/pair-of-buns.jsx'
import BurgerContent from '../burger-content/burger-content.jsx'


import data from '../../utils/data.js'
const tmpBuns = data.find(x => x['name'] === "Краторная булка N-200i")
const tmpContent = data.filter(x => x['type'] !== "bun").slice(0, 6)


const BurgerConstructor = () => {
    const totalPrice = tmpBuns['price'] + tmpContent.reduce((partialSum, a) => partialSum + a['price'], 0)

    return (
        <section className={`${style.constructor} mt-25`}>
            <PairOfBuns data={tmpBuns} extraClass={style.constuctorElementMod}>
                <BurgerContent data={tmpContent} extraClass={style.constuctorElementMod} />
            </PairOfBuns>

            <div className={style.price + ' mt-6 mr-4'}>
                <p className={"text text_type_digits-medium mr-3"}>{totalPrice}</p>
                <CurrencyIcon type="primary" />
                <Button htmlType="button" type="primary" size="large" extraClass={'ml-10'} width="36" height="36">
                    Оформить заказ
                </Button>
            </div>
        </section>
    )
}

export default BurgerConstructor;