import './style.scss';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import type { ResponseType } from './types';
import useRequest from '../../hooks/useRequest';
import { message } from '../../utils/message';

const AddAddress = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [checked, setChecked] = useState(false);

    const { request } = useRequest<ResponseType>({ manual: true });

    const handleSaveButtonClick = () => {
        request({
            url: '/api/address/add',
            method: 'POST',
            data: {
                name,
                phone,
                address,
                isDefault: checked
            }
        }).then(response => {
            if (response.success) {
                navigate('/address');
            } else {
                throw new Error('Add address failed');
            }
        }).catch(error => {
            message(error.message);
        })
    }

    return (
        <div className="page add-address-page">
            <div className="title">
                <div className='iconfont' onClick={() => { navigate(-1) }}>&#xe601;</div>
                Add new shipping address
            </div>
            <div className="address-info-container">
                <div className='address-info'>
                    <div className="address-info-name">Recipient</div>
                    <input className="address-info-input"
                        placeholder="Enter recipient's name here"
                        value={name}
                        onChange={(e) => { setName(e.target.value) }} />
                </div>
                <div className='address-info'>
                    <div className="address-info-name">Phone</div>
                    <input className="address-info-input"
                        placeholder="Enter phone number here"
                        value={phone}
                        onChange={(e) => { setPhone(e.target.value) }} />
                </div>
                <div className='address-info'>
                    <div className="address-info-name">Address line</div>
                    <input className="address-info-input"
                        placeholder="Enter address here"
                        value={address}
                        onChange={(e) => { setAddress(e.target.value) }} />
                </div>
            </div>
            <div className="set-default-container">
                Set as default
                <input type="checkbox" className="default-check-box"checked={checked} onClick={() => {setChecked(!checked);}} />
            </div>
            <div className="save-address">
              <div className="save-button" onClick={ handleSaveButtonClick }>Save</div>
            </div>
        </div>
    )
}


export default AddAddress;