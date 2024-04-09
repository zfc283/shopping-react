import useRequest from '../../hooks/useRequest';
import './style.scss';
import { useState, useEffect } from 'react';
import type { CategoryAndTagResponseType, CategoriesType, TagsType, ProductType, CategorySearchListResponseType } from './types';
import { message } from '../../utils/message';



const Category2 = () => {
  const [categories, setCategories] = useState<CategoriesType>([]);
  const [tags, setTags] = useState<TagsType>([]);
  const [keyword, setKeyword] = useState('');
  const [products, setProducts] = useState<Array<ProductType>>([]);
  const [currentCategory, setCurrentCategory] = useState('全部');
  const [currentTag, setCurrentTag] = useState('全部');
  
  const { request: tagRequest } = useRequest<CategoryAndTagResponseType>({ manual: true });
  const { request: productRequest } = useRequest<CategorySearchListResponseType>({manual: true});

  

  const handleKeyDown = (key: string, target: EventTarget & HTMLInputElement) => {
    if (key === 'Enter') {
      setKeyword(target.value);
    }
  }

  useEffect(() => {
    productRequest({
      url: '/category-search-list.json',
      method: 'GET',
      params: {
        keyword: keyword,
        category: currentCategory,
        tag: currentTag
      }
    })
      .then((response) => {
        if (response.success) {
          setProducts(response.data);
        }
      })
      .catch((e: any) => {
        message(e.message || 'unknown request error')
      })
      // Input框的值不绑定响应式变量 keyword，只有当按下回车键时，才设置 keyword 的值
  }, [productRequest, keyword, currentCategory, currentTag])


  useEffect(() => {
    tagRequest({
      url: '/categoryAndTagList.json',
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
  }, [tagRequest])


  




  return (
    <div className="page category-page">
      <div className="iconfont back-icon">&#xe601;</div>
      <div className="title">Category</div>
      <div className="search">
        <div className="iconfont search-icon">&#xe741;</div>
        <input className="search-input"
          placeholder="Please enter search item name"
          onKeyDown={(e) => { handleKeyDown(e.key, e.currentTarget) }} />
      </div>
      <div className="container">
        <div className="left">
          <div className={currentCategory === '全部' ? 'left-item left-item-active' : 'left-item'}
          onClick={() => {setCurrentCategory('全部')}}>全部</div>
          {categories.map((item) => {
            return (
              <div key={item.id} 
              className={currentCategory === item.name ? 'left-item left-item-active' : 'left-item'}
              onClick={() => {setCurrentCategory(item.name)}}>{item.name}</div>
            )
          })}
        </div>
        <div className="right">
          <div className="right-top">
            <div className={currentTag === '全部' ? 'right-top-item right-top-item-active' : 'right-top-item'}
            onClick={() => {setCurrentTag('全部')}}>全部</div>
            {tags.map((item, index) => {
              return (
                <div key={index} 
                className={currentTag === item ? 'right-top-item right-top-item-active' : 'right-top-item'}
                onClick={() => {setCurrentTag(item)}}>{item}</div>
              )
            })}
          </div>
          <div className="content">
            <div className="content-title">{currentCategory} ({products.length})</div>
            {products.map((item) => {
              return (
                <div className="content-item" key={item.id}>
                  <img className="content-item-img" src={item.imgUrl} alt='' />
                  <div className="content-item-title">{item.title}</div>
                  <div className="content-item-sales">月售{item.sales}</div>
                  <div className="content-item-price"><span>&yen;</span>{item.price}</div>
                  <div className="content-item-button">购买</div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
      <div className="docker">
        <div className="docker-item">
          <p className="iconfont docker-item-icon">&#xe607;</p>
          <p className="docker-item-title">Home</p>
        </div>
        <div className="docker-item docker-item-active">
          <p className="iconfont docker-item-icon">&#xe6b0;</p>
          <p className="docker-item-title">Category</p>
        </div>
        <div className="docker-item">
          <p className="iconfont docker-item-icon">&#xe600;</p>
          <p className="docker-item-title">Cart</p>
        </div>
        <div className="docker-item">
          <p className="iconfont docker-item-icon">&#xe660;</p>
          <p className="docker-item-title">Me</p>
        </div>
      </div>
    </div>
  );
}

export default Category2;


