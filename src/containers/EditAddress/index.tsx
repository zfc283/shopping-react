import './style.scss';
import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import useRequest from '../../hooks/useRequest';
import type { ResponseType, EditAddressResponseType } from './types';
import { message } from '../../utils/message';


const EditAddress = () => {
    const navigate = useNavigate();
    const location = useLocation();
    // const [data, setData] = useState<ResponseType | null>(null);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [checked, setChecked] = useState(false);

    const { request } = useRequest<ResponseType>({manual: true});
    const { request:editAddressRequest } = useRequest<EditAddressResponseType>({manual: true});

    useEffect(() => {
        request({
            url: '/api/address',
            method: 'GET',
            params: {
                addressId: location.state.addressId
            }
        }).then(response => {
            // setData(response);
            setName(response.data.name);
            setPhone(response.data.phone);
            setAddress(response.data.address);
            setChecked(response.data.isDefault);
        }).catch(error => {
            message(error.message);
        })
    }, [request, location.state.addressId])

    
    const handleSaveButtonClick = () => {
        editAddressRequest({
            url: '/api/address/edit',
            method: 'POST',
            data: {
                addressId: location.state.addressId,
                name,
                phone,
                address,
                isDefault: checked
            }
        }).then((response) => {
            if (response.success) {
                navigate('/address');
            } else {
                throw new Error(response.message);
            }
        }).catch(error => {
            message(error.message);
        })
    }



    return (
        <div className="page edit-address-page">
            <div className="title">
                <div className='iconfont' onClick={() => { navigate(-1) }}>&#xe601;</div>
                Edit shipping address
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


export default EditAddress;