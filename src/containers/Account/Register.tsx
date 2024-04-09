import { useState, useRef } from 'react';
//import './style.scss';
import Modal, { ModalRefType } from '../../components/Modal';
import useRequest from '../../hooks/useRequest';
import { useNavigate } from 'react-router-dom';
import type { RegisterResponseType } from './types';



const Register = () => {
    const [userName, setUserName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [checkPassword, setCheckPassword] = useState('');
    const modalRef = useRef<ModalRefType>(null!);
    const navigate = useNavigate();

    const { request } = useRequest<RegisterResponseType>({manual: true});

    const handleSubmitBtnClick = () => {
        if (!userName) {
            modalRef.current.show('User name is missing');
            return;
        }
        if (!phoneNumber) {
            modalRef.current.show('Phone number is missing');
            return;
        }
        if (!password) {
            modalRef.current.show('Password is missing');
            return;
        }
        if (!checkPassword) {
            modalRef.current.show('Please re-enter your password');
            return;
        }
        if (checkPassword !== password) {
            modalRef.current.show('The two passwords do not match');
            return;
        }
        // url: '/register.json'
        request({
            url: '/api/user/register',
            method: 'POST',
            data: {
                username: userName,
                phone: phoneNumber,
                password: password
            }
        }).then(data => {
            //data && console.log(data.success);    // data 类型为 void 或 RegisterResponseType。这样写 console.log(data.success) 不报错
            if (data?.success) {
                navigate('/account/login');
            }
        }).catch((error:any) => {
            modalRef.current.show(error?.message || 'Unknown error');
        })
    };

    return (
        <>
            <div className="form">
                <div className="form-item">
                    <div className="form-item-title">Username</div>
                    <input className="form-item-content" placeholder="Your username" 
                    value={userName} onChange={(e) => {setUserName(e.target.value)}} />
                </div>
                <div className="form-item">
                    <div className="form-item-title">Phone number</div>
                    <input className="form-item-content" placeholder="Enter phone number here"
                    value={phoneNumber} onChange={(e) => {setPhoneNumber(e.target.value)}} />
                </div>
                <div className="form-item">
                    <div className="form-item-title">Password</div>
                    <input type="password" className="form-item-content" placeholder="Enter password here"
                    value={password} onChange={(e) => {setPassword(e.target.value)}} />
                </div>
                <div className="form-item">
                    <div className="form-item-title">Confirm password</div>
                    <input type="password" className="form-item-content" placeholder="Re-enter password here"
                    value={checkPassword} onChange={(e) => {setCheckPassword(e.target.value)}} />
                </div>
            </div>
            <div className="submit" onClick={handleSubmitBtnClick}>
                Register
            </div>
            <Modal ref={modalRef} />
        </>
    );
}

export default Register;