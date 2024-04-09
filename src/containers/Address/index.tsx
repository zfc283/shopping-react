import './style.scss';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useRequest from '../../hooks/useRequest';
import type { ResponseType } from './types';
import { message } from '../../utils/message';

const Address = () => {
    const navigate = useNavigate();
    const [data, setData] = useState<ResponseType | null>(null);
    const { request } = useRequest<ResponseType>({ manual: true });
    const { request:deleteAddressRequest } = useRequest<ResponseType>({ manual: true });

    useEffect(() => {
        request({
            url: '/api/address/list',
            method: 'GET',
        }).then((response) => {
            setData(response);
        }).catch((error) => {
            message(error.message);
        })
    }, [request])


    const handleDeleteButtonClick = (addressId: string, isDefault: boolean) => {
        deleteAddressRequest({
            url: '/api/address/delete',
            method: 'POST',
            data: {
                addressId,
                isDefault
            }
        }).then((response) => {
            setData(response);
        }).catch(error => {
            message(error.message);
        })
    }

    return (
        <div className="page address-page">
            <div className="title">
                <div className='iconfont' onClick={() => { navigate('/me') }}>&#xe601;</div>
                Shipping addresses
            </div>
            <div className="address-list">
                {(data?.data || []).map(item => {
                    return (
                        <div className="address-item" key={item.id}>
                            <div className="contact">
                                <div className="contact-name">{item.name}</div>
                                <div className="contact-phone">{item.phone}</div>
                            </div>
                            <div className="address">
                                {item.address}
                            </div>
                            <div className="bottom-container">
                                {item.isDefault ? <div className="default-icon">Default</div> : null}
                                <div className="edit-button" onClick={() => {navigate('/edit-address', {state: {addressId: item.id}})}}>Edit</div>
                                <div className="delete-button" onClick={() => {handleDeleteButtonClick(item.id, item.isDefault)}}>Delete</div>
                            </div>
                        </div>
                    )
                })}
            </div>
            <div className="add-new-address">
                <div className="add-button" onClick={() => { navigate('/add-address') }}>Add new address</div>
            </div>
            <div className="bottom"></div>
        </div>
    )
}


export default Address;