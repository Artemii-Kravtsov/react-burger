import style from './pair-of-buns.module.css';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';


const PairOfBuns = ({ children, extraClass }) => {
    const buns = useSelector(store => store.constructor.buns)
    const isEmpty = Object.keys(buns).length ? '' : style.isEmpty
    const name = buns && buns["name"]
    const price = buns && buns["price"]
    const image = (buns && buns["image"])
    return (
        buns && (<> 
                 <ConstructorElement type="top" 
                                     isLocked={true} 
                                     text={name ? name + ' (верх)' : 'Перетащите булки'} 
                                     price={price} 
                                     thumbnail={image} 
                                     extraClass={'mr-4 ml-8 ' + extraClass + ' ' + isEmpty} />
                 {children}
                 <ConstructorElement type="bottom" 
                                     isLocked={true} 
                                     text={name ? name + ' (низ)' : 'Перетащите булки'} 
                                     price={price} 
                                     thumbnail={image} 
                                     extraClass={'mr-4 ml-8 ' + extraClass + ' ' + isEmpty} />
                 </>)
    )
}

PairOfBuns.propTypes = {
    children: PropTypes.element,
    extraClass: PropTypes.string.isRequired
}
export default PairOfBuns;