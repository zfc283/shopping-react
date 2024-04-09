import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
//import './style.scss';
import useRequest from '../../hooks/useRequest';
import Modal, { ModalRefType } from '../../components/Modal';
import type { LoginResponseType } from './types';



// 定义接口返回数据的类型



const Login = () => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const modalRef = useRef<ModalRefType>(null!);
    const navigate = useNavigate();
    

    // const { request } = useRequest<LoginResponseType>({url:'/a.json', method: 'GET', params: {}});
    const { request } = useRequest<LoginResponseType>({manual: true});

    const handleSubmitBtnClick = () => {
        if (!phoneNumber) {
            modalRef.current.show('Please enter your phone number');
            return;
        }
        if (!password) {
            modalRef.current.show('Password is required');
            return;
        }
        // url: '/login.json'
        request({
            url: '/api/user/login',
            method: 'POST',
            data: {
                phone: phoneNumber,
                password: password
            }
        }).then(data => {
            // data && console.log(data.success);     data 类型为 void 或 LoginResponseType。这样写 console.log(data.success) 不报错
            const {data: { token }} = data;
            if (token) {
                localStorage.setItem('token', token);
                navigate('/home');
            }
        }).catch((error:any) => {
            modalRef.current.show(error?.message || 'Unknown error');
        })
    };

    

    return (
        <>
            <div className="form">
                <div className="form-item">
                    <div className="form-item-title">Phone number</div>
                    <input 
                    value={phoneNumber} 
                    onChange={(e) => {setPhoneNumber(e.target.value)}}
                    className="form-item-content" 
                    placeholder="Enter phone number here" />
                </div>
                <div className="form-item">
                    <div className="form-item-title">Password</div>
                    <input
                    value={password}
                    onChange={(e) => {setPassword(e.target.value)}} 
                    type="password" 
                    className="form-item-content" 
                    placeholder="Enter password here" />
                </div>
            </div>
            <div className="submit" onClick={handleSubmitBtnClick}>
                Log in
            </div>
            {/* <p className="notice">
                *Logging in indicates that you agree to the terms of use and privacy policy
            </p> */}
            <Modal ref={modalRef} />
        </>
    );
}

export default Login;