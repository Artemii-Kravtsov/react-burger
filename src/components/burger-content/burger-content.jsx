import React from 'react';
import style from './burger-content.module.css';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';


class BurgerContent extends React.Component {

    render = () => {return (
        <ul className={`${style.contentContainer} scrollable pr-4`}>
            {this.props.data.map((elem) => {
                return (<li key={elem['_id']}
                            className={style.anElement}>
                            <DragIcon type="primary" />
                            <ConstructorElement text={elem["name"]} price={elem["price"]} thumbnail={elem["image"]} extraClass={this.props.extraClass}/>
                        </li>
                        )
            })
            }
        </ul>
    )
    }
}

export default BurgerContent;