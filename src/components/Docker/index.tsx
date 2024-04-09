import './style.scss';
import { useNavigate } from 'react-router-dom';

const items = [{
    name: 'home',
    url: '/home',
    icon: '&#xe607;',
    text: 'Home'
}, {
    name: 'category',
    url: '/category',
    icon: '&#xe6b0;',
    text: 'Category'
}, {
    name: 'cart',
    url: '/cart',
    icon: '&#xe600;',
    text: 'Cart'
}, {
    name: 'me',
    url: '/me',
    icon: '&#xe660;',
    text: 'Me'
}]

const Docker = (props: {activeName: 'home' | 'category' | 'cart' | 'me'}) => {
    const navigate = useNavigate();

    return (
        <div className="docker">
            {items.map((item) => {
                return (
                    <div key={item.name} 
                    className={item.name === props.activeName ?  "docker-item docker-item-active" : "docker-item"}  
                    onClick={() => {navigate(item.url, {state:{id:'-1',name:'All'}})}}>
                        <p className="iconfont docker-item-icon" dangerouslySetInnerHTML={{
                            __html: item.icon}}></p>
                        <p className="docker-item-title">{item.text}</p>
                    </div>
                )
            })}
        {/* <div className="docker-item">
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
        </div> */}
      </div>
    )
}

export default Docker;