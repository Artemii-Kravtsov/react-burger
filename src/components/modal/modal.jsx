import style from './modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';


const Modal = ({ header, closeFunc, children }) => {
    return (<main className={`${style.modal} pl-10 pr-10 pt-10 pb-15`}>
                <h2 className={style.header}>
                    <p className="text text_type_main-large">{header}</p>
                    <CloseIcon type="primary" onClick={closeFunc} />
                </h2>
                <section className={style.modalContentContainer}>
                    {children}
                </section>
            </main>)
}

Modal.propTypes = {
    header: PropTypes.string.isRequired,
    closeFunc: PropTypes.func.isRequired,
    children: PropTypes.element
}
export default Modal;