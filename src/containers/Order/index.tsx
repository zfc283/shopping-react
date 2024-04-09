import './style.scss';
import useRequest from '../../hooks/useRequest';
import { useRef, useState, useEffect } from 'react';
import type { ResponseDataType, ResponseType, AddressResponseType, OrderSubmitResponseType } from './types';
import { useNavigate, useParams } from 'react-router-dom';
import Popover from '../../components/Popover';
import { message } from '../../utils/message';



const Order = () => {
  const navigate = useNavigate();
  const params = useParams<{ orderId: string }>();
  const [data, setData] = useState<ResponseDataType | null>(null);
  const [showAddress, setShowAddress] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [paymentType, setPaymentType] = useState<'wechat' | 'balance'>('wechat');
  const requestAddressData = useRef({
    url: '/api/order/address-list',
    method: 'GET',
    params: {
      token: localStorage.getItem('token')
    }
  })
  const { request } = useRequest<ResponseType>({ manual: true });
  const { data: addressData } = useRequest<AddressResponseType>(requestAddressData.current);
  const { request: orderSubmitRequest } = useRequest<OrderSubmitResponseType>({ manual: true });

  useEffect(() => {
    request({
      url: '/api/order',
      method: 'GET',
      params: {
        orderId: params.orderId
      }
    }).then((response) => {
      if (response.success) {
        setData(response.data);
      }
    }).catch((error) => {
      message(error.message)
    })
  }, [request, params])

  const address = data?.address;
  const shopList = data?.shop || [];
  const time = data?.time;
  const total = data?.total;

  const handleAddressListItemClick = (address: { id: string; name: string; phone: string; address: string }) => {
    const newData = { ...data } as ResponseDataType;
    newData.address = address;
    setData(newData);
    setShowAddress(false);
  }

  const handleAddAddressClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    navigate('/address');
  }


  const handleSubmitButtonClick = () => {
    if (!address) {
      message("You don't have a shipping address. Go to the user profile and set the shipping address first.")
    } else {
      setShowPayment(true)
    }
  }

  const handleOrderSubmit = () => {
    orderSubmitRequest({
      url: '/api/order/submit',
      method: 'POST',
      data: {
        orderId: params.orderId,
        addressId: address?.id,
        time: time,
        paymentType: paymentType
      }
    }).then((response) => {
      if (response.data) {
        navigate('/payment-success');
      }
    }).catch((error) => {
      message(error.message);
    })
  }

  return (
    <div className="page order-page">
      <div className="title">
        <div className="back" onClick={() => { navigate(-1) }}>
          <div className="iconfont back-icon" >&#xe601;</div>
        </div>
        Checkout
      </div>
      <div className="shipping" onClick={() => { if (address) setShowAddress(true); }}>
        <div className="iconfont location-icon">&#xe83d;</div>
        {address ?
          (<div className="shipping-container">
            <div className="contact">
              <div className="contact-name">{address?.name}</div>
              <div className="contact-phone">{address?.phone}</div>
            </div>
            <div className="address">{address?.address}</div>
          </div>) :
          (<div className="text" onClick={(e) => {handleAddAddressClick(e)}}>Add a new shipping address</div>)
        }
      </div>
      <div className="delivery-time">
        <div className="delivery-time-text">Delivery time</div>
        <div className="delivery-time-select">{time}</div>
      </div>
      <div className="store-list">
        {shopList.map((shop) => {
          return (
            <div className="store-list-item" key={shop.shopId}>
              <div className="store-title">
                <span className="iconfont store-icon">&#xe86b;</span>{shop.shopName}
              </div>
              <div className="product-list">
                {(shop.cartList || []).map((product) => {
                  return (
                    <div className="product-list-item" key={product.productId}>
                      <img src={product.imgUrl} alt="" />
                      <div className="title">{product.title}</div>
                      <div className="weight">{product.weight}</div>
                      <div className="price">
                        <span>&#36;</span>{product.price}
                      </div>
                      <div className="count">x{product.count}</div>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
      <div className="summary">
        <div className="summary-price">
          <div className="summary-price-detail"><span>&#36;</span>{total}</div>
          <div className="summary-price-text">Subtotal</div>
        </div>
        <div className="summary-discount">
          <div className="summary-discount-detail">-<span>&#36;</span>0</div>
          <div className="summary-discount-text">Coupon</div>
        </div>
        <div className="summary-delivery">
          <div className="summary-delivery-detail">Standard</div>
          <div className="summary-delivery-text">Delivery method</div>
        </div>
        {/* <div className="summary-priviledge">
          <div className="summary-priviledge-detail">预计获得27积分</div>
          <div className="summary-priviledge-text">Membership</div>
        </div> */}
      </div>
      <div className="bottom-area"></div>
      <div className="bottom">
        <div className="total-price-text">Order total: </div>
        <div className="total-price-number"><span>&#36;</span>{total}</div>
        <div className="submit-order-button" onClick={handleSubmitButtonClick}>Place order</div>
      </div>
      {
        showAddress ?
          <Popover>
            <>
              <div className="popover-mask" onClick={() => { setShowAddress(false) }}></div>
              <div className="popover-content">
                <div className="title">Choose a shipping address</div>
                <div className="address-list">
                  {(addressData?.data || []).map((item) => {
                    return (
                      <div className="address-list-item" key={item.id} onClick={() => { handleAddressListItemClick(item) }}>
                        <div className="contact">
                          <div className="contact-name">{item.name}</div>
                          <div className="contact-phone">{item.phone}</div>
                        </div>
                        <div className="address">
                          {item.address}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </>
          </Popover>
          : null
      }
      {
        showPayment ?
          <Popover>
            <>
              <div className="popover-mask" onClick={() => { setShowPayment(false) }}></div>
              <div className="popover-content">
                <div className="title">Payment method</div>
                <div className="total-price">&#36;{total}</div>
                <div className="payment-list">
                  <div className="payment-list-item">
                    <img className="paypal-img" src="https://shopping-project.s3.ca-central-1.amazonaws.com/images/paypal-icon.png" alt="" />
                    Paypal
                    <div className={paymentType === 'wechat' ? "circle circle-active" : "circle"}
                      onClick={() => { setPaymentType('wechat') }}></div>
                  </div>
                  <div className="payment-list-item">
                    <img src="https://shopping-project.s3.ca-central-1.amazonaws.com/images/balance-icon.png" alt="" />
                    Balance: &#36;200
                    <div className={paymentType === 'balance' ? "circle circle-active" : "circle"}
                      onClick={() => { setPaymentType('balance') }}></div>
                  </div>
                </div>
                <div className="payment-bottom">
                  <div className="payment-bottom-button" onClick={handleOrderSubmit}>Place order</div>
                </div>
              </div>
            </>
          </Popover>
          : null
      }

    </div>
  );
}

export default Order;


