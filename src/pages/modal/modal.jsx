import style from './modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { useCallback, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from "react-router-dom";


const ModalOverlay = ({ closeFunc }) => {
    return <div className={style.overlay} onClick={closeFunc}></div>
}


const Modal = ({ header='', children }) => {
    const navigate = useNavigate();
    
    const closeModalFunc = useCallback(() => navigate(-1))
    const handleKeyPress = useCallback((event) => {
        if(event.key === 'Escape'){
            closeModalFunc()
        }
    }, [closeModalFunc])


    useEffect(() => {
        document.addEventListener('keydown', handleKeyPress)
        return () => document.removeEventListener('keydown', handleKeyPress)
    }, [handleKeyPress])


    return createPortal((<>
            <ModalOverlay closeFunc={closeModalFunc}/>
            <main className={`${style.modal} pl-10 pr-10 pt-10 pb-15`}>
                <h2 className={style.header}>
                    <p className="text text_type_main-large">{header}</p>
                    <CloseIcon type="primary" onClick={closeModalFunc} />
                </h2>
                <section className={style.modalContentContainer}>
                    {children}
                </section>
            </main>
            </>
        ), modalRoot)
}


ModalOverlay.propTypes = {
    closeFunc: PropTypes.func.isRequired
}
Modal.propTypes = {
    children: PropTypes.element,
    header: PropTypes.string,
};
const modalRoot = document.getElementById("react-modals");
export default Modal;