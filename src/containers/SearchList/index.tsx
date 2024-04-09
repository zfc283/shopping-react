import { useNavigate, useParams } from 'react-router-dom';
import { useState, useCallback } from 'react';
import useRequest from '../../hooks/useRequest';
import './style.scss';
import type { ResponseType } from './types';



/* const defaultRequestData = {
  url: '/shop-search-list.json',
  method: 'GET',
  params: {
    shopId: '',
    keyword: '',
    orderBy: 'default'
  },
} */


const SearchList = () => {
  const params = useParams<{ shopId: string, keyword: string }>();
  const [keyWord, setKeyWord] = useState(params.keyword);
  const [orderBy, setOrderBy] = useState('default');
  const navigate = useNavigate();
  const [requestData, setRequestData] = useState({
    url: '/api/search/shop-search-list',
    method: 'GET',
    params: {
      keyword: params.keyword,
      shopId: params.shopId,
      orderBy: 'default'
    }
  });
  /* defaultRequestData.params.keyword = params.keyword as string;
  defaultRequestData.params.shopId = params.shopId as string;
  const [requestData, setRequestData] = useState(defaultRequestData); */
  const { data } = useRequest<ResponseType>(requestData);



  const defaultActiveClass = orderBy === 'default' ? 'order-by-item-active' : '';
  const salesActiveClass = orderBy === 'by-sales' ? 'order-by-item-active' : '';
  const priceActiveClass = orderBy === 'by-price' ? 'order-by-item-active' : '';




  const handleBackIconClick = useCallback(() => {
    navigate(`/search/${params.shopId}`);
  }, [navigate, params.shopId])

  const handleInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      if (keyWord) {
        const localSearchList = localStorage.getItem('search-history');
        const seachListHistory: string[] = localSearchList ? JSON.parse(localSearchList) : [];
        const keywordIndex = seachListHistory.findIndex(item => item === keyWord);
        const newHistoryList = [...seachListHistory];
        if (keywordIndex > -1) {
          newHistoryList.splice(keywordIndex, 1)
        }
        newHistoryList.unshift(keyWord);
        if (newHistoryList.length > 20) {
          newHistoryList.length = 20;
        }
        localStorage.setItem('search-history', JSON.stringify(newHistoryList));
      }

      const newRequestData = { ...requestData };
      newRequestData.params.keyword = keyWord;
      setRequestData(newRequestData);
    }
  }

  function handleTabClick(orderBy: string) {
    setOrderBy(orderBy);
    const newRequestData = { ...requestData };
    newRequestData.params.orderBy = orderBy;
    setRequestData(newRequestData);
  }

  function handleItemClick(catId: string, productId: string) {
    navigate(`/detail/${catId}/${productId}`)
  }


  return (
    <div className="page search-list-page">
      <div className="header">
        <div className="back" onClick={handleBackIconClick}>
          <div className="iconfont back-icon" >&#xe601;</div>
        </div>
        <div className="search">
          <div className="iconfont search-icon">&#xe741;</div>
          <input className="search-input"
            placeholder="Search products by name"
            value={keyWord}
            onChange={(e) => { setKeyWord(e.target.value) }}
            onKeyDown={handleInputKeyDown} />
          <div className="iconfont close" onClick={() => { setKeyWord('') }}>&#xe6a6;</div>
        </div>
        <div className="order-by">
          <div className={`order-by-item ${defaultActiveClass}`} onClick={() => { handleTabClick('default') }}>Default</div>
          <div className={`order-by-item ${salesActiveClass}`} onClick={() => { handleTabClick('by-sales') }}>By sales</div>
          <div className={`order-by-item ${priceActiveClass}`} onClick={() => { handleTabClick('by-price') }}>By price</div>
        </div>
      </div>
      <div className="list">
        {(data?.data || []).map((item) => {
          return (
            <div className="list-item" key={item.id} onClick={() => { handleItemClick(item.cat_id, item.id) }}>
              <img src={item.imgUrl} alt="tomato" className="list-item-pic" />
              <div className="list-item-desc">
                <p className="desc">{item.title}</p>
                <div className="list-item-price">
                  <span className="list-item-yen">&#36;</span>
                  {item.price}
                </div>
                <div className="sold">Sold {item.sales}</div>
              </div>
            </div>
          )
        })}
        <div className="bottom">
          ---You've reached the bottom---
        </div>
      </div>
    </div>
  );
}

export default SearchList;


