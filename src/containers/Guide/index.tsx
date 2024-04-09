import { useRef, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.scss';


// 自定义 Hook, 处理动画相关的逻辑
const useRefAnimation = () => {
  const ref = useRef<HTMLDivElement>(null!);
  useEffect(() => {
    ref.current.style.opacity = '1';
  }, []);
  return ref;
}

// 自定义 Hook, 处理页面跳转相关的逻辑
const useNavigateLogin = () => {
  const navigate = useNavigate();

  const handleIconClick = useCallback(() => {
    if (localStorage.getItem('token')) {
      navigate('/home');
    } else {
      navigate('/account/login');
    } 
  }, [navigate]);

  return handleIconClick;
}


function Guide() {
  const ref = useRefAnimation();
  const handleIconClick = useNavigateLogin();

  return (
    <div ref={ref} className="page guide-page">
      <img className="main-pic" alt="Shopping Mall" src={require('../../images/logo_@2x.png')}/>
      <p className="title">GrocerGo</p>
      <div className="slogan">Freshness Delivered Daily</div>
      {/* <img className="sub-pic" alt="Slogan" src={require('../../images/slogn_word_icon_@2x.png')}/> */}
      <div className="iconfont arrow-icon" onClick={handleIconClick}>&#xe60c;</div>
    </div>
  );
}

export default Guide;


