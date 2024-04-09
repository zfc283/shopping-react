import { Swiper, SwiperSlide } from 'swiper/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

type BannerProps = {
    location: {
        id: string;
        store_name: string;
    } | undefined;
    banners: Array<{
        id: string;
        imgUrl: string;
    }> | undefined;
}

const Banner = ({location, banners }: BannerProps) => {
    const [page, setPage] = useState(1);
    const navigate = useNavigate();

    const handleLocationClick = () => {
        navigate('/nearby');
    }

    const handleSearchClick = () => {
        if (location) {
            navigate(`/search/${location.id}`);
        }
    }

    return (
        <div className="banner">
            <div className="location" onClick={handleLocationClick}>
                <span className="iconfont location-icon">&#xe83d;</span>
                <span>Store location: {location?.store_name || ''}</span>
            </div>
            <div className="search" onClick={handleSearchClick}>
                <span className="iconfont search-icon">&#xe741;</span>
                What are you looking for?
            </div>
            <div className="swiper-area">
                <Swiper
                    spaceBetween={0}
                    slidesPerView={1}
                    onSlideChange={(e: any) => setPage(e.activeIndex + 1)}
                >
                    {(banners || []).map((item) => {
                        return (
                            <SwiperSlide key={item.id}>
                                <div className="swiper-item">
                                    <img className="swiper-item-img" src={item.imgUrl} alt="banner" />
                                </div>
                            </SwiperSlide>
                        )
                    })}
                </Swiper>
                <div className="pagination">{page}/{banners?.length || 0}</div>
            </div>
        </div>
    )
}

export default Banner;