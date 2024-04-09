import './style.scss';
import { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import useRequest from '../../hooks/useRequest';
import type { CartChangeResponseType } from '../../containers/Detail/types';
import { message } from '../../utils/message';

export type PopoverRefType = {
    show: () => void;
}

type PropsType = {
    productId: string;
    imgUrl: string;
    title: string;
    price: number;
    count: number;
}

const Popover = forwardRef<PopoverRefType, PropsType>((props, ref) => {
    const navigate = useNavigate();
    const [showPopover, setShowPopover] = useState(false);
    const [amount, setAmount] = useState(props.count);
    const divRef = useRef(document.createElement('div'));
    const divElement = divRef.current;
    const { request: cartChangeRequest } = useRequest<CartChangeResponseType>({manual: true})

    useImperativeHandle(ref, () => {
        return {
            show() {
                setShowPopover(true);
            }
        }
    }, [])

    useEffect(() => {
        if (showPopover) {
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
    }, [showPopover, divElement]);

    const handleMinusButtonClick = () => {
        if (amount > 1) {
            setAmount(amount - 1);
        }
    }
    
    const handlePlusButtonClick = () => {
        setAmount(amount + 1);
    }

    const changeCartInfo = () => {
        cartChangeRequest({
            url: '/cartChange.json',
            method: 'POST',
            data: {
                userId: localStorage.getItem('token'),
                id: props.productId,
                count: amount
            }
        }).then(() => {
            navigate('/cart');
        }).catch((error) => {
            message(error.message);
        })
    }


    /* return showPopover ? (
        <div className="popover"></div>
    ) : null */

    return createPortal(
        <>
        <div className="popover-mask" onClick={() => {setShowPopover(false)}}></div>
        <div className="popover-content">
            <div className="product-info">
                <img src={props.imgUrl} alt='' />
                <div className="title">{props.title}</div>
                <div className="price"><span>&yen;</span>{props.price}</div>
            </div>
            <div className="amount">
                <div className="purchase-amount">Amount</div>
                <div className="change-amount">
                    <div className="button" onClick={handleMinusButtonClick}>-</div>
                    <div className="button">{amount}</div>
                    <div className="button" onClick={handlePlusButtonClick}>+</div>
                </div>
            </div>
            <div className="add-to-cart">
                <div className="add-button" onClick={changeCartInfo}>Add to cart</div>
            </div>
        </div>
        </>
    , divElement)


})

export default Popover;