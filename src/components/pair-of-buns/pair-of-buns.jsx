import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { ingredientPropTypes } from '../../utils/prop-types-templates';



const PairOfBuns = ({ buns, children, extraClass }) => {

    const name = buns && buns["name"]
    const price = buns && buns["price"]
    const image = buns && buns["image"]

    return (
        buns && (<> 
        <ConstructorElement type="top" isLocked={true} text={name + ' (верх)'} price={price} thumbnail={image} extraClass={'mr-4 ml-8 ' + extraClass}/>
        {children}
        <ConstructorElement type="bottom" isLocked={true} text={name + ' (низ)'} price={price} thumbnail={image} extraClass={'mr-4 ml-8 ' + extraClass} />
        </>)
    )
}

PairOfBuns.propTypes = {
    buns: PropTypes.oneOfType([PropTypes.array, ingredientPropTypes]),
    children: PropTypes.element,
    extraClass: PropTypes.string.isRequired
}
export default PairOfBuns;