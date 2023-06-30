import style from './modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { createPortal } from 'react-dom';
import { useNavigate } from "react-router-dom";
import { useCallback, useEffect, FC, PropsWithChildren } from 'react';
import { TBlindFunction } from '../../utils/types';


const ModalOverlay: FC<{closeFunc: TBlindFunction}> = ({ closeFunc }) => {
    return <div className={style.overlay} onClick={closeFunc}></div>
}

type TModal = {
    header?: string, 
}
const Modal: FC<PropsWithChildren<TModal>> = ({ header='', children }) => {
    const navigate = useNavigate();
    
    const closeModalFunc: TBlindFunction = useCallback(() => navigate(-1), [])
    const handleKeyPress = useCallback((event: KeyboardEvent): void => {
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


const modalRoot = document.getElementById("react-modals") as HTMLElement;
export default Modal;