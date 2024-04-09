import { useState, useRef, forwardRef, useImperativeHandle, useEffect } from 'react';
import { createPortal } from 'react-dom';
import "./style.scss";


export type ModalRefType = {
    show: (message: string) => void;
}

const Modal = forwardRef<ModalRefType>((props, ref) => {
    const [showModal, setShowModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const divRef = useRef(document.createElement('div'));
    const divElement = divRef.current;

    useImperativeHandle(ref, () => {
        return {
            show(message: string) {
                setErrorMessage(message);
                setShowModal(true);
                setTimeout(() => {
                    setShowModal(false);
                }, 1500);
            }
        }
    }, [])

    useEffect(() => {
        if (showModal) {
            document.body.appendChild(divElement);
        } else {
            if (divElement.parentNode) {
                document.body.removeChild(divElement);
            }
        }
        return () => {
            if (divElement.parentNode) {
                document.body.removeChild(divElement);
            }
        } 
    }, [showModal, divElement]);

    /* return showModal ? (
        <div className="modal">
            <div className="modal-text">{errorMessage}</div>
        </div>
    ) : null */
    return createPortal(
        <div className="modal">
            <div className="modal-text">{errorMessage}</div>
        </div>
    , divElement)
});

export default Modal;