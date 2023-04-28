import React from 'react';
import style from './ingredient.module.css';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';


class Ingredient extends React.Component {

    state = {count: 0}

    render = () => {return (
        <article className={style.ingredientContainer}>
            {this.state.count === 0 ? null : <Counter count={this.state.count} size="default" extraClass="" />}
            <img src={this.props.data["image"]} alt={this.props.data["name"]} className={"ml-4 mr-4"} />
            <div className={style.price + ' mt-1 mb-1'}>
                <p className={"text text_type_digits-default"}>{this.props.data["price"]}</p>
                <CurrencyIcon type="primary" />
            </div>
            <p className={`${style.ingredient_name} text text_type_main-default`}>{this.props.data["name"]}</p>
        </article>
    )
    }
}

export default Ingredient;