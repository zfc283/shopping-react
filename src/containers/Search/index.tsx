import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './style.scss';
import useRequest from '../../hooks/useRequest';
import { ResponseType } from './types';


// url: '/search.json'
const defaultRequestData = {
  url: '/api/search',
  method: 'GET',
  params: {
    shopId: ''
  }
}

function Search() {
  const navigate = useNavigate();
  const [keyWord, setKeyWord] = useState('');
  const localSearchHistory = localStorage.getItem('search-history');
  const searchHistory: Array<string> = localSearchHistory ? JSON.parse(localSearchHistory) : []
  const [historyList, setHistoryList] = useState(searchHistory);

  /* const [historyList, setHistoryList] = useState<Array<string>>([])
  if (localSearchHistory) {
    setHistoryList(JSON.parse(localSearchHistory));
  } */

  const params = useParams<{ shopId: string }>();
  if (params.shopId) {
    defaultRequestData.params.shopId = params.shopId;
  }


  const { data } = useRequest<ResponseType>(defaultRequestData);

  const handleBackIconClick = () => {
    localStorage.setItem('search-history', JSON.stringify(historyList));
    navigate('/home');
  }

  const handleInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && keyWord) {
      const keywordIndex = historyList.findIndex(item => item === keyWord);
      const newHistoryList = [...historyList];
      if (keywordIndex > -1) {
        newHistoryList.splice(keywordIndex, 1);
      }
      newHistoryList.unshift(keyWord);
      if (newHistoryList.length > 20) {
        newHistoryList.length = 20;
      }
      setHistoryList(newHistoryList);

    }
  }

  useEffect(() => {
    localStorage.setItem('search-history', JSON.stringify(historyList));
    if (keyWord) {      
      navigate(`/searchList/${params.shopId}/${keyWord}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [historyList])


const handleCloseButtonClick = () => {
  const newHistoryList: Array<string> = [];
  setHistoryList(newHistoryList);
}


return (
  <div className="page search-page">
    <div className="back" onClick={handleBackIconClick}>
      <div className="iconfont back-icon" >&#xe601;</div>
    </div>
    <div className="search">
      <div className="iconfont search-icon">&#xe741;</div>
      <input className="search-input"
        placeholder="Search products by name"
        value={keyWord}
        onChange={(e) => { setKeyWord(e.target.value) }}
        onKeyDown={(e) => { handleInputKeyDown(e) }} />
    </div>
    {historyList.length > 0 ?
      <>
        <div className="title">
          History
          <span className="iconfont close" onClick={handleCloseButtonClick}>&#xe6a6;</span>
        </div>
        <ul className="list">
          {historyList.map((item, index) => {
            return (
              <li className="list-item" key={index} onClick={() => {setKeyWord(item)}}>{item}</li>
            )
          })}
        </ul>
      </> : null
    }
    <div className="title">
      Suggestions
    </div>
    <ul className="list">
      {data?.data.map((item, index) => {
        return (
          <li className="list-item" key={index} onClick={() => {setKeyWord(item)}}>{item}</li>
        )
      })}
    </ul>
  </div>
);
}

export default Search;


