import useRequest from '../../hooks/useRequest';
import './style.scss';
import type { ResponseType, CartResponseType, CartChangeResponseType } from './types';
import { useParams, useNavigate } from 'react-router-dom';
import { useRef, useState, useEffect } from 'react';
import Popover from '../../components/Popover';
import { message } from '../../utils/message';




const Detail = () => {
  const params = useParams<{ catId: string, productId: string }>();
  const navigate = useNavigate();
  const [showPopover, setShowPopover] = useState(false);
  const [productCount, setProductCount] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const requestData = useRef({
    url: '/api/detail',
    method: 'GET',
    params: {
      catId: params.catId,
      productId: params.productId
    }
  });
  const { data } = useRequest<ResponseType>(requestData.current)
  const { request: cartRequest } = useRequest<CartResponseType>({ manual: true })
  const {request: changeCartRequest} = useRequest<CartChangeResponseType>({ manual: true })

  useEffect(() => {
    if (!showPopover) {
      cartRequest({
        url: '/api/cart/count',
        method: 'GET',
        params: {
          catId: params.catId,
          productId: params.productId
        }
      }).then((response) => {
        setTotalCount(response.data.totalCount);
        let productCount = 1;
        if (response.data.productCount >= 1 ) {
          productCount = response.data.productCount;
        }
        setProductCount(productCount);
      }).catch((error) => {
        message(error.message);
      })
    }
  }, [cartRequest, params.catId, params.productId, showPopover])

  const handleMinusButtonClick = () => {
    if (productCount > 1) {
      setProductCount(productCount - 1)
    }
  }

  const handlePlusButtonClick = () => {
    setProductCount(productCount + 1)
  }

  const changeCartInfo = () => {
    changeCartRequest({
      url: '/api/cart/add',
      method: 'POST',
      data: {
        catId: params.catId,
        productId: params.productId,
        count: productCount
      }
    })
    .then(() => {
      // setProductCount(productCount);
      setShowPopover(false);
    })
    .catch((error) => {
      message(error.message)
    })
  }

  // 解决页面加载时的抖动问题

  return data ? (
    <div className="page detail-page">
      <div className='title'>
        <div className='iconfont' onClick={() => { navigate(-1) }}>&#xe601;</div>
        Product details
      </div>
      <img className='image' src={data?.data.imgUrl} alt='' />
      <div className='main'>
        <div className='main-price'><span className='main-price-yen'>&#36;</span>{data?.data.price}</div>
        <div className='main-sales'>Sold {data?.data.sales}</div>
        <div className='main-content'>
          <div className='main-content-title'>{data?.data.title}</div>
          <p className='main-content-subtitle'>{data?.data.subtitle}</p>
        </div>
      </div>
      <div className='spec'>
        <div className='spec-title'>Specifications</div>
        <div className='spec-content'>
          <div className='spec-content-left'>
            <p className='spec-content-item'>Origin</p>
            <p className='spec-content-item'>Specs</p>
          </div>
          <div className='spec-content-right'>
            <p className='spec-content-item'>{data?.data.origin}</p>
            <p className='spec-content-item'>{data?.data.specification}</p>
          </div>
        </div>
      </div>
      <div className='detail'>
        <div className='detail-title'>Details</div>
        <div className='detail-content'>
          {data?.data.detail}
        </div>
      </div>
      <div className="docker-area"></div>
      <div className='docker'>
        <div className='cart-icon' onClick={() => {navigate('/cart')}}>
          <div className='iconfont'>&#xe600;{totalCount ? <div className="cart-icon-count">{totalCount}</div> : null}</div>
          <div className='icon-text'>Cart</div>
        </div>
        <div className='cart-button' onClick={() => { setShowPopover(true) }}>Add to cart</div>
      </div>
      { showPopover ?
        <Popover>
        <>
          <div className="popover-mask" onClick={() => { setShowPopover(false); setProductCount(1) }}></div>
          <div className="popover-content">
            <div className="product-info">
              <img src={data?.data.imgUrl} alt='' />
              <div className="title">{data?.data.title}</div>
              <div className="price"><span>&#36;</span>{data?.data.price}</div>
            </div>
            <div className="amount">
              <div className="purchase-amount">Amount</div>
              <div className="change-amount">
                <div className="button" onClick={handleMinusButtonClick}>-</div>
                <div className="button">{productCount}</div>
                <div className="button" onClick={handlePlusButtonClick}>+</div>
              </div>
            </div>
            <div className="add-to-cart">
              <div className="add-button" onClick={changeCartInfo}>Add to cart</div>
            </div>
          </div>
        </>
      </Popover>
      : null}
    </div>
  ) : null
}

export default Detail;