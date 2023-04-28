import React from 'react';
import style from './burger-content.module.css';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';


class BurgerContent extends React.Component {

    render = () => {return (
        <section className={`${style.contentContainer} scrollable pr-4`}>
            {this.props.data.map((elem) => {
                return (<div className={style.anElement}>
                            <DragIcon type="primary" />
                            <ConstructorElement text={elem["name"]} price={elem["price"]} thumbnail={elem["image"]} extraClass={this.props.extraClass}/>
                        </div>
                        )
            })
            }
        </section>
    )
    }
}

export default BurgerContent;