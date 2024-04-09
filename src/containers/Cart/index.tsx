import './style.scss';
import Docker from '../../components/Docker';
import useRequest from '../../hooks/useRequest';
import { useRef, useState, useEffect } from 'react';
import type { ResponseType, CartSubmitArray, SubmitResponseType, CartProductType, deleteResponseType } from './types';
import { message } from '../../utils/message';
import { useNavigate } from 'react-router-dom';
import Popover from '../../components/Popover';

type CartListInfoType = Array<{
  shopId: string;
  shopName: string;
  selected: boolean;
  productListInfo: Array<{
    catId: string;
    productId: string;
    imgUrl: string;
    title: string;
    weight: string;
    count: number;
    price: number;
    selected: boolean;
  }>
}>

const Cart = () => {
  const navigate = useNavigate();
  const [cartListInfo, setCartListInfo] = useState<CartListInfoType>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [showPopover, setShowPopover] = useState(false);
  const [productInfo, setProductInfo] = useState<CartProductType | null>(null);
  const selectAllIconRef = useRef<HTMLDivElement>(null!);
  const requestData = useRef({
    url: '/api/cart/list',
    method: 'GET',
    params: {
      token: localStorage.getItem('token')
    },
    manual: true
  })

  const { request } = useRequest<ResponseType>(requestData.current);

  useEffect(() => {
    request(requestData.current)
      .then((response) => {
        if (response.success) {
          const list = response.data;
          const newCartListInfo: CartListInfoType = list.map(shop => {
            let someProductNotOrdered = false;
            const newCartList = shop.cartList.map(product => {
              const { catId, productId, imgUrl, title, weight, count, price } = product;
              if (!product.ordered) {
                someProductNotOrdered = true;
                return { catId, productId, imgUrl, title, weight, count, price, selected: false }
              }
              return { catId, productId, imgUrl, title, weight, count, price, selected: true }
            })
            const shopSelected = !someProductNotOrdered;
            return { shopId: shop.shopId, shopName: shop.shopName, selected: shopSelected, productListInfo: newCartList }
          })
          setCartListInfo(newCartListInfo);
        }
      })
  }, [request])


  const handleStoreIconClick = (shopId: string) => {
    const newCartListInfo = [...cartListInfo];
    const shop = newCartListInfo.find(shop => shop.shopId === shopId);   // shop is a reference
    const selected = !shop?.selected;
    shop!.selected = selected;
    shop?.productListInfo.forEach((product) => {
      product.selected = selected;
    })
    setCartListInfo(newCartListInfo);
  }

  const handleProductIconClick = (shopId: string, productId: string) => {
    const newCartListInfo = [...cartListInfo];
    const shop = newCartListInfo.find(shop => shop.shopId === shopId);
    let shopAllSelected = true;
    for (let i = 0; i < shop!.productListInfo.length; i++) {
      let ithProduct = shop!.productListInfo[i];
      if (ithProduct.productId === productId) {
        ithProduct.selected = !(ithProduct.selected);
      }
      if (!ithProduct.selected) {
        shopAllSelected = false;
      }
    }
    shop!.selected = shopAllSelected;
    setCartListInfo(newCartListInfo);
  }

  const handleSelectAllIconClick = () => {
    const newCartListInfo = [...cartListInfo];
    const oldClass = selectAllIconRef.current.className;
    const newState = oldClass === "circle" ? true : false;
    for (let i = 0; i < newCartListInfo.length; i++) {
      cartListInfo[i].selected = newState;
      let ithProductListInfo = cartListInfo[i].productListInfo
      for (let j = 0; j < ithProductListInfo.length; j++) {
        let jthProduct = ithProductListInfo[j];
        jthProduct.selected = newState;
      }
    }
    //selectAllIconRef.current.className = oldClass === "circle" ? "circle circle-active" : "circle";
    setCartListInfo(newCartListInfo);
  }

  // const {request:updateCartRequest} = useRequest<CartUpdateResponseType>({manual: true})

  // const handleCountChange = (shopId: string, productId: string, newCount: string) => {
  //   const newCartListInfo = [...cartListInfo];
  //   const shop = newCartListInfo.find(shop => shop.shopId === shopId);
  //   const product = shop!.productListInfo.find(product => product.productId === productId);
  //   const countNumber = +newCount;     // 强制转换 newCount 为 number类型
  //   product!.count = Number.isNaN(countNumber) ? 0 : countNumber;
  //   setCartListInfo(newCartListInfo);
  //   // updateCartRequest({
  //   //   url: 'api/cart/update-count',
  //   //   method: 'POST',
  //   //   data: {
  //   //     shopId,
  //   //     catId: product?.catId,
  //   //     productId,
  //   //     count: product!.count
  //   //   }
  //   // }).then(response => {
  //   //   if (response.success) {
  //   //     setCartListInfo(newCartListInfo);
  //   //   } else if ('data' in response) {
  //   //     throw new Error(response.data);
  //   //   }
  //   // }).catch(error => {
  //   //   message(error.message);
  //   // })
  // }

  const handleMinusButtonClick = (shopId: string, catId: string, productId: string) => {
    const newCartListInfo = [...cartListInfo];
    const shop = newCartListInfo.find(shop => shop.shopId === shopId);
    const product = shop!.productListInfo.find(product => product.productId === productId);
    if (product!.count === 1) {
      setProductInfo({
        shopId: shopId,
        catId: catId,
        productId: productId
      })
      setShowPopover(true);
    } else {
      product!.count = product!.count - 1;
      setCartListInfo(newCartListInfo);
    }

  }

  const handlePlusButtonClick = (shopId: string, productId: string) => {
    const newCartListInfo = [...cartListInfo];
    const shop = newCartListInfo.find(shop => shop.shopId === shopId);
    const product = shop!.productListInfo.find(product => product.productId === productId);
    product!.count = product!.count + 1;
    setCartListInfo(newCartListInfo);
  }

  const { request: deleteProductRequest } = useRequest<deleteResponseType>({ manual: true })

  const handleProductDelete = () => {
    deleteProductRequest({
      url: '/api/cart/delete',
      method: 'POST',
      data: {
        storeId: productInfo?.shopId,
        catId: productInfo?.catId,
        productId: productInfo?.productId
      }
    }).then((response) => {
        if (response.success) {
          let newCartListInfo = [...cartListInfo];
          const shop = newCartListInfo.find(shop => shop.shopId === productInfo?.shopId);
          const newProductList = shop!.productListInfo.filter(product => product.productId !== productInfo?.productId);
          if (newProductList.length === 0) {
            newCartListInfo = newCartListInfo.filter(item => item.shopId !== productInfo?.shopId);
          } else {
            shop!.productListInfo = newProductList;  
          }
          setCartListInfo(newCartListInfo);
          setShowPopover(false);
        } else {
          throw new Error("Delete product from cart failed");
        }
      })
      .catch((error) => {
        message(error.message)
      })
  }




  useEffect(() => {
    let total = 0;
    let count = 0;
    for (let i = 0; i < cartListInfo.length; i++) {
      let ithProductListInfo = cartListInfo[i].productListInfo
      for (let j = 0; j < ithProductListInfo.length; j++) {
        let jthProduct = ithProductListInfo[j];
        if (jthProduct.selected) {
          total += jthProduct.price * jthProduct.count;
          count++;
        }
      }

    }
    setTotalPrice(total);
    setTotalCount(count);
  }, [cartListInfo])

  const notSelectedShop = cartListInfo.find(shop => shop.selected === false);


  const { request: cartSubmitRequest } = useRequest<SubmitResponseType>({ manual: true })

  const handleCartSubmit = () => {
    const data: CartSubmitArray = [];
    cartListInfo.forEach(shop => {
      shop.productListInfo.forEach(product => {
        if (product.selected) {
          data.push({
            storeId: shop.shopId,
            catId: product.catId,
            productId: product.productId,
            count: product.count
          })
        }
      })
    })
    if (data.length === 0) {
      message("Select at least 1 item to checkout")
    } else {
      cartSubmitRequest({
        url: '/api/cart/submit',
        method: 'POST',
        data: data
      }).then((response) => {
        const { orderId } = response.data;
        navigate(`/order/${orderId}`)
      })
        .catch((error) => {
          message(error.message);
        })
    }
  }

  return (
    <div className="page cart-page" style={{ ...showPopover ? { overflow: 'hidden' } : {} }}>
      <div className="title">Cart</div>
      <div className="container">
        {(cartListInfo).map((item) => {
          return (
            <div className="store" key={item.shopId}>
              <div className="store-title">
                <div className={item.selected ? "circle circle-active" : "circle"}
                  onClick={() => handleStoreIconClick(item.shopId)}></div>
                <div className="iconfont store-icon">&#xe86b;</div>
                <div className="store-name">{item.shopName}</div>
              </div>
              <div className="product-list">
                {item.productListInfo.map((listItem, index) => {
                  return (
                    <div className="list-item" key={listItem.imgUrl + index}>
                      <div className={listItem.selected ? "circle circle-active" : "circle"}
                        onClick={() => { handleProductIconClick(item.shopId, listItem.productId) }}></div>
                      <div className="list-item-content">
                        <img className="list-item-content-img" src={listItem.imgUrl} alt='' />
                        <div className="list-item-content-title">{listItem.title}</div>
                        <div className="list-item-content-specs">{listItem.weight}</div>
                        <div className="list-item-content-price"><span>&#36;</span>{listItem.price}</div>
                        <div className="list-item-content-amount-container">
                          <div className="button" onClick={() => { handleMinusButtonClick(item.shopId, listItem.catId, listItem.productId) }}>-</div>
                          <div className="button">{listItem.count}</div>
                          <div className="button" onClick={() => { handlePlusButtonClick(item.shopId, listItem.productId) }}>+</div>
                        </div>
                        {/* <input className="list-item-content-amount" value={listItem.count} 
                      onChange={(e) => handleCountChange(item.shopId, listItem.productId, e.target.value)}/> */}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
      <div className="bottom">
        <div className="total">
          <div className={cartListInfo.length === 0 || notSelectedShop ? "circle" : "circle circle-active"} ref={selectAllIconRef}
            onClick={handleSelectAllIconClick}></div>
          <div className="select-all-text">Select all</div>
          <div className="total-text">
            Total:
          </div>
          <div className="total-price">
            <span>&#36;</span>{totalPrice.toFixed(2)}
          </div>
          <div className="pay" onClick={handleCartSubmit}>Checkout ({totalCount})</div>
        </div>
        <Docker activeName="cart" />
      </div>
      {showPopover ?
        <Popover>
          <>
            <div className="popover-mask"></div>
            <div className="popover-content">
              <div className="container">
                <div className="text">Remove this item from cart?</div>
                <div className="button-container">
                  <div className="button-left" onClick={() => { setShowPopover(false); }}>Cancel</div>
                  <div className="button-right" onClick={handleProductDelete}>OK</div>
                </div>
              </div>
            </div>
          </>
        </Popover>
        : null}
    </div>
  );
}

export default Cart;


