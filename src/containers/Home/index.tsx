import { useState, useEffect } from 'react';
import './style.scss';
import 'swiper/css';
import useRequest from '../../hooks/useRequest';
import type { ResponseType } from './types';
import Banner from './components/Banner';
import Category from './components/Category';
import Freshes from './components/Freshes';
import Discounts from './components/Discounts';
//import { message } from '../../utils/message';
import Docker from '../../components/Docker';


// url: '/home.json'
const defaultRequestData = {
  url: '/api/home',
  method: 'POST',
  data: {
    latitude: 37.7304169,
    longitude: -122.384425
  }
}



function Home() {
  const localLocation = localStorage.getItem('location');
  const locationHistory = localLocation ? JSON.parse(localLocation) : null;
  if (locationHistory) {
    defaultRequestData.data.latitude = locationHistory.latitude;
    defaultRequestData.data.longitude = locationHistory.longitude;
  }
  const [requestData, setRequestData] = useState(defaultRequestData);
  const { data } = useRequest<ResponseType>(requestData);



  useEffect(() => {
    if (navigator.geolocation && !locationHistory) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { coords } = position;
        const { latitude, longitude } = coords;
        // console.log(latitude, longitude);
        localStorage.setItem('location', JSON.stringify({ latitude, longitude }));
        setRequestData({
          ...defaultRequestData,
          data: {
            latitude: latitude,
            longitude: longitude
          }
        })
      }, (error) => {
        console.log(error);
      }, { timeout: 500 });
    }
  }, [locationHistory])


  return (
    <div className="page home-page">
      <Banner location={data?.data.location} banners={data?.data.banners} />
      <Category categories={data?.data.categories} />
      <Freshes freshes={data?.data.freshes} />
      <Discounts discounts={data?.data.discounts}/>
      <div className="bottom">
             
      </div>
      <Docker activeName='home'/>
    </div>
  );
}

export default Home;


