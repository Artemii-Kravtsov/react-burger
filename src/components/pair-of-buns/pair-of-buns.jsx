import React from 'react';
import style from './pair-of-buns.module.css';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';


class PairOfBuns extends React.Component {

    render = () => {
        const name = this.props.data["name"]
        const price = this.props.data["price"]
        const image = this.props.data["image"]

        return (
        <>
        <ConstructorElement type="top" isLocked={true} text={name + ' (верх)'} price={price} thumbnail={image} extraClass={'mr-4 ml-8 ' + this.props.extraClass}/>
        {this.props.children}
        <ConstructorElement type="bottom" isLocked={true} text={name + ' (низ)'} price={0} thumbnail={image} extraClass={'mr-4 ml-8 ' + this.props.extraClass} />
        </>
    )
    }
}

export default PairOfBuns;