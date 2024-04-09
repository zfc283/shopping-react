import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import './style.scss';





const Account = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const isLoginActivated = location.pathname === '/account/login';
    const loginActiveClass = isLoginActivated ? 'tab-item-active' : '';
    const registerActiveClass = !isLoginActivated ? 'tab-item-active' : '';

    //如果已经登陆，自动跳转到商城首页
    useEffect(() => {
        if(localStorage.getItem('token')) {
            navigate('/home');
        } 
    }, [navigate])

    return (
        <div className="page account-page">
            <div className="tab">
                <div className={`tab-item tab-item-left ${loginActiveClass}`}>
                    <Link to="/account/login">Log in</Link>
                </div>
                <div className={`tab-item tab-item-right ${registerActiveClass}`}>
                    <Link to="/account/register">Register</Link>
                </div>
            </div>
            <Outlet />
        </div>
    );
}

export default Account;