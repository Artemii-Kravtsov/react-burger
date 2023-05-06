import style from './modal-overlay.module.css';
import PropTypes from 'prop-types';


const ModalOverlay = ({ closeFunc }) => {
    return <div className={style.overlay} onClick={closeFunc}></div>
}


ModalOverlay.propTypes = {
    closeFunc: PropTypes.func.isRequired
}
export default ModalOverlay;