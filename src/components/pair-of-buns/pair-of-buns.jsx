import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { ingredientPropTypes } from '../../utils/prop-types-templates';



const PairOfBuns = ({ data, children, extraClass }) => {

    const name = data && data["name"]
    const price = data && data["price"]
    const image = data && data["image"]

    return (
        data.length === 0 ? null : (<> 
        <ConstructorElement type="top" isLocked={true} text={name + ' (верх)'} price={price} thumbnail={image} extraClass={'mr-4 ml-8 ' + extraClass}/>
        {children}
        <ConstructorElement type="bottom" isLocked={true} text={name + ' (низ)'} price={0} thumbnail={image} extraClass={'mr-4 ml-8 ' + extraClass} />
        </>)
    )
}

PairOfBuns.propTypes = {
    data: PropTypes.oneOfType([PropTypes.array, ingredientPropTypes]),
    children: PropTypes.element,
    extraClass: PropTypes.string.isRequired
}
export default PairOfBuns;