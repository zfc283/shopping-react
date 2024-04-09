import useRequest from '../../hooks/useRequest';
import './style.scss';
import { useState, useEffect } from 'react';
import type { CategoryAndTagResponseType, CategoryType, TagType, CategoriesType, TagsType, RequestDataType, CategorySearchListResponseType, CartProductInfoType, CartResponseType, CartChangeResponseType } from './types';
import { message } from '../../utils/message';
import Docker from '../../components/Docker';
import { useNavigate, useLocation } from 'react-router-dom';
import Popover from '../../components/Popover';


const currentCategoryIsAll = { id: '-1', name: 'All' }
const currentCategoryIsWhatsNew = { id: '-1', name: 'What\'s new' }
const currentCategoryIsDiscounts = { id: '-1', name: 'Discounts' }
const currentTagIsAll = { id: '-1', name: 'All'}



const Category = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<CategoriesType>([]);
  const [tags, setTags] = useState<TagsType>([]);
  const [keyword, setKeyword] = useState('');

  const location = useLocation();

  const [currentCategory, setCurrentCategory] = useState<CategoryType>(location.state);
  const [currentTag, setCurrentTag] = useState<TagType>(currentTagIsAll);
  
  const [requestData, setRequestData] = useState<RequestDataType>({
    url: '/api/category/product-list',
    method: 'GET',
    params: {
      keyword: keyword,
      category: currentCategory,
      tag: currentTag
    }
  })
  const { request } = useRequest<CategoryAndTagResponseType>({ manual: true });
  const { data } = useRequest<CategorySearchListResponseType>(requestData);

  const [showPopover, setShowPopover] = useState(false);
  const [productCount, setProductCount] = useState(1);
  // const [productTempCount, setProductTempCount] = useState(1);
  const [cartProductInfo, setCartProductInfo] = useState<CartProductInfoType | null>(null);

  const { request: cartRequest } = useRequest<CartResponseType>({ manual: true });
  const { request: changeCartRequest } = useRequest<CartChangeResponseType>({ manual: true })



  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      const newRequestData = { ...requestData };
      newRequestData.params.keyword = keyword;
      setRequestData(newRequestData);
    }
  }




  useEffect(() => {
    request({
      url: '/api/category',       
      method: 'GET'
    })
      .then((response) => {
        if (response.success) {
          setCategories(response.data.category);
          setTags(response.data.tag);
        }
      })
      .catch((e: any) => {
        message(e.message || 'unknown request error')
      })
  }, [request])


  useEffect(() => {
    const newRequestData = { ...requestData };
    newRequestData.params.category = currentCategory;
    newRequestData.params.tag = currentTag;
    setRequestData(newRequestData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentCategory, currentTag])


  const handleItemClick = (e: React.MouseEvent, catId: string, productId: string) => {
    const eventTarget = e.target as Element
    if (eventTarget.className !== "content-item-button")
    navigate(`/detail/${catId}/${productId}`);
  }

  const addItemToCart = (catId: string, id: string, imgUrl: string, title: string, price: number) => {
    const newCartProductInfo = {
      catId: catId,
      productId: id,
      imgUrl: imgUrl,
      title: title,
      price: price,
    };
    setCartProductInfo(newCartProductInfo);
    setShowPopover(true);
  }

  useEffect(() => {
    cartRequest({
      url: '/api/cart/count',                       // cart.json
      method: 'GET',
      params: {
        catId: cartProductInfo?.catId,
        productId: cartProductInfo?.productId
      }
    }).then((response) => {
      if (response.data.productCount >= 1) {
        setProductCount(response.data.productCount);
        // setProductTempCount(response.data.productCount);
      }
    }).catch((error) => {
      message(error.message);
    })
  }, [cartRequest, cartProductInfo])

  const handleMinusButtonClick = () => {
    // if (productTempCount > 1) {
    //   setProductTempCount(productTempCount - 1)
    // }
    if (productCount > 1) {
      setProductCount(productCount - 1)
    }
  }

  const handlePlusButtonClick = () => {
    // setProductTempCount(productTempCount + 1)
    setProductCount(productCount + 1)
  }

  const changeCartInfo = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    changeCartRequest({
      url: '/api/cart/add',            // cartChange.json
      method: 'POST',
      data: {
        token: localStorage.getItem('token'),
        catId: cartProductInfo?.catId,
        productId: cartProductInfo?.productId,
        // count: productTempCount
        count: productCount
      }
    })
    .then(() => {
      setShowPopover(false);
      //navigate('/cart');
    })
    .catch((error) => {
      message(error.message)
    })
  }



  return (
    <div className="page category-page">
      <div className="title">Category</div>
      <div className="search">
        <div className="iconfont search-icon">&#xe741;</div>
        <input className="search-input"
          placeholder="Search products by name"
          value={keyword}
          onChange={(e) => { setKeyword(e.target.value) }}
          onKeyDown={(e) => { handleKeyDown(e) }} />
      </div>
      <div className="container">
        <div className="left">
          <div className={currentCategory.name === 'All' ? 'left-item left-item-active' : 'left-item'}
            onClick={() => { setCurrentCategory(currentCategoryIsAll) }}>All</div>
          <div className={currentCategory.name === 'What\'s new' ? 'left-item left-item-active' : 'left-item'}
            onClick={() => { setCurrentCategory(currentCategoryIsWhatsNew) }}>New arrivals</div>
          <div className={currentCategory.name === 'Discounts' ? 'left-item left-item-active' : 'left-item'}
            onClick={() => { setCurrentCategory(currentCategoryIsDiscounts) }}>Discounts</div>
          {categories.map((item) => {
            return (
              <div key={item.id}
                className={currentCategory.id === item.id ? 'left-item left-item-active' : 'left-item'}
                onClick={() => { setCurrentCategory(item) }}>{item.name}</div>
            )
          })}
        </div>
        <div className="right">
          <div className="right-top">
            <div className={currentTag.name === 'All' ? 'right-top-item right-top-item-active' : 'right-top-item'}
              onClick={() => { setCurrentTag(currentTagIsAll) }}>All</div>
            {tags.map((item) => {
              return (
                <div key={item.id}
                  className={currentTag.id === item.id ? 'right-top-item right-top-item-active' : 'right-top-item'}
                  onClick={() => { setCurrentTag(item) }}>{item.name}</div>
              )
            })}
          </div>
          <div className="content">
            <div className="content-title">{currentCategory.name} ({data?.data.length})</div>
            {(data?.data || []).map((item) => {
              return (
                <div className="content-item" key={item.id} onClick={(e) => {handleItemClick(e, item.catId, item.id)}}>
                  <img className="content-item-img" src={item.imgUrl} alt='' />
                  <div className="content-item-title">{item.title}</div>
                  <div className="content-item-sales">Sold {item.sales}</div>
                  <div className="content-item-price"><span>&#36;</span>{item.price}</div>
                  <div className="content-item-button"
                    onClick={() => addItemToCart(item.catId, item.id, item.imgUrl, item.title, item.price)}>Add to cart</div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
      <Docker activeName="category" />
      { showPopover ?
        <Popover>
          <>
          <div className="popover-mask" onClick={() => { 
            setShowPopover(false); 
            //setProductTempCount(productCount) 
          }}></div>
          <div className="popover-content">
            <div className="product-info">
              <img src={cartProductInfo?.imgUrl} alt='' />
              <div className="title">{cartProductInfo?.title}</div>
              <div className="price"><span>&#36;</span>{cartProductInfo?.price}</div>
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
              <div className="add-button" onClick={(e) => {changeCartInfo(e)}}>Add to Cart</div>
              <div className="buy-button">Buy (Disabled)</div>
            </div>
          </div>
        </>
        </Popover>
        : null
      }
    </div>
  );
}

export default Category;


