import './style.scss';
import useRequest from '../../hooks/useRequest';
import { ResponseType } from './types';
import { useState, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const localLocation = localStorage.getItem('location');
const locationHistory = localLocation ? JSON.parse(localLocation) : null;

// url: '/nearby.json'
const defaultRequestData = {
  url: '/api/home/nearby',
  method: 'POST',
  data: {
    latitude: locationHistory ? locationHistory.latitude : 37.7304169,
    longitude: locationHistory ? locationHistory.longitude : -122.384425
  }
}


function Nearby() {
  const { data } = useRequest<ResponseType>(defaultRequestData);
  const [keyWord, setKeyWord] = useState('');
  const navigate = useNavigate();
  const list = (data?.data || []).filter((item) => {
    return item.address.indexOf(keyWord) > -1;
  })

  const handleItemClick = useCallback((latitude: string, longitude: string) => {
    localStorage.setItem('location', JSON.stringify({ latitude, longitude }));
    navigate('/home');
  }, [navigate])

  return (
    <div className="page nearby-page">
      <div className="title">
        <Link to='/home'>
          <div className="iconfont title-back">&#xe601;</div>
        </Link>
        Change my store
      </div>
      <div className="search">
        <div className="iconfont search-icon">&#xe741;</div>
        <input className="search-input" placeholder="Search by address name" value={keyWord} onChange={(e) => {setKeyWord(e.target.value)}}/>
      </div>
      <div className="subtitle">Nearby stores</div>
      <ul className="list">
        {list.map((item) => {
          return (
            <li className="list-item" key={item.id} onClick={() => {handleItemClick(item.latitude, item.longitude)}}>
              <div className="list-item-title">{item.name}</div>
              <div className="list-item-contact">
                Phone: {item.phone}
                <div className="list-item-distance">
                  <span className="iconfont location-icon">&#xe83d;</span>
                  {item.distance} km
                </div>
              </div>
              <div className='list-item-address'>{item.address}</div>
            </li>
          )
        })}
      </ul>
    </div>
  );
}

export default Nearby;


