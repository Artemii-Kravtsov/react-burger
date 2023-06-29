import PropTypes from 'prop-types';

const ingredientPropTypes = PropTypes.shape({
    __v: PropTypes.number,
    _id: PropTypes.string.isRequired,
    calories: PropTypes.number.isRequired,
    carbohydrates: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    image_large: PropTypes.string.isRequired,
    image_mobile: PropTypes.string,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    proteins: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired
})
const dataPropTypes = PropTypes.arrayOf(ingredientPropTypes)


export {dataPropTypes, ingredientPropTypes}