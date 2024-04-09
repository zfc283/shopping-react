import './style.scss';
import Docker from '../../components/Docker';
import type { ResponseType, LogOutResponseType } from './types';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import useRequest from '../../hooks/useRequest';
import { message } from '../../utils/message';





const Profile = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');

  const { request } = useRequest<ResponseType>({ manual: true });

  useEffect(() => {
    request({
      url: '/api/profile',
      method: 'GET',
    }).then(response => {
      setUserName(response.data.username);
    }).catch(error => {
      message(error.message);
    })
  }, [request])


  const { request: logOutRequest } = useRequest<LogOutResponseType>({ manual: true });

  const handleLogoutButtonClick = () => {
    logOutRequest({
      url: '/api/user/logout',
      method: 'POST'
    }).then(() => {
      localStorage.removeItem('token');
      navigate('/');
    }).catch(error => {
      message(error.message);
    })
  }


  return (
    <div className="page profile-page">
      <div className="title">Account</div>
      <div className="user-info">
        <img className="user-info-img" src={require('../../images/profile-image.png')} alt="" />
        <div className="user-info-name">{userName}</div>
        <div className="log-out" onClick={handleLogoutButtonClick}>
          <div className="text">Sign Out</div>
          <div className="iconfont">&#xe602;</div>
        </div>
      </div>
      <div className="discount">
        <div className="discount-item">
          <div className="discount-item-count">4</div>
          <div className="discount-item-name">Coupon</div>
        </div>
        <div className="discount-item">
          <div className="discount-item-count">258</div>
          <div className="discount-item-name">Points</div>
        </div>
      </div>
      <div className="account-info">
        <div className="account-info-item" onClick={() => { navigate('/address') }}>
          <img className="account-info-item-img" src={require('../../images/addresses.png')} alt="" />
          <div className="account-info-item-desc">Addresses</div>
        </div>
        <div className="account-info-item">
          <img className="account-info-item-img" src={require('../../images/orders.png')} alt="" />
          <div className="account-info-item-desc">Orders</div>
        </div>
        <div className="account-info-item">
          <img className="account-info-item-img" src={require('../../images/Pending payment.png')} alt="" />
          <div className="account-info-item-desc">Pending</div>
        </div>
        <div className="account-info-item">
          <img className="account-info-item-img" src={require('../../images/Shipped.png')} alt="" />
          <div className="account-info-item-desc">Shipped</div>
        </div>
        <div className="account-info-item">
          <img className="account-info-item-img" src={require('../../images/Arrived.png')} alt="" />
          <div className="account-info-item-desc">Arrived</div>
        </div>
        <div className="account-info-item">
          <img className="account-info-item-img" src={require('../../images/Refund.png')} alt="" />
          <div className="account-info-item-desc">Refunds</div>
        </div>
        <div className="account-info-item">
          <img className="account-info-item-img" src={require('../../images/customer service.png')} alt="" />
          <div className="account-info-item-desc">Service</div>
        </div>
        <div className="account-info-item">
          <img className="account-info-item-img" src={require('../../images/settings.png')} alt="" />
          <div className="account-info-item-desc">Settings</div>
        </div>
      </div>
      <div className="note">
        Currently, only the 'Addresses' and 'Sign Out' features are available 
      </div>
      <Docker activeName="me" />
    </div>
  );
}

export default Profile;


