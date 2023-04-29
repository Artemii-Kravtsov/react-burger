import style from './pair-of-buns.module.css';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';


const PairOfBuns = ({ data, children, extraClass }) => {

    const name = data["name"]
    const price = data["price"]
    const image = data["image"]

    return (
        <>
        <ConstructorElement type="top" isLocked={true} text={name + ' (верх)'} price={price} thumbnail={image} extraClass={'mr-4 ml-8 ' + extraClass}/>
        {children}
        <ConstructorElement type="bottom" isLocked={true} text={name + ' (низ)'} price={0} thumbnail={image} extraClass={'mr-4 ml-8 ' + extraClass} />
        </>
    )
}


export default PairOfBuns;