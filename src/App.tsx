import 'normalize.css';
import './styles/border.css';
import './styles/base.css';

//import { HashRouter, Routes, Route } from 'react-router-dom';
import { createHashRouter, RouterProvider } from 'react-router-dom';

import Guide from './containers/Guide';
import Account from './containers/Account';
import Login from './containers/Account/Login';
import Register from './containers/Account/Register';
import Home from './containers/Home';
import Nearby from './containers/Nearby';
import Search from './containers/Search';
import SearchList from './containers/SearchList';
import Detail from './containers/Detail';
import Category from './containers/Category';
//import Category2 from './containers/Category2';
import Cart from './containers/Cart';
import Order from './containers/Order';
import PaymentSuccess from './containers/PaymentSuccess';
import Profile from './containers/Profile';
import Address from './containers/Address';
import AddAddress from './containers/AddAddress';
import EditAddress from './containers/EditAddress';


const router = createHashRouter([{
  path: '/',
  element: <Guide />
}, {
  path: '/account',
  element: <Account />,
  children: [{
    path: '/account/login',
    element: <Login />
  }, {
    path: '/account/register',
    element: <Register />
  }]
}, {
  path: '/home',
  element: <Home />
}, {
  path: '/nearby',
  element: <Nearby />
}, {
  path: '/search/:shopId',
  element: <Search />
}, {
  path: '/searchList/:shopId/:keyword',
  element: <SearchList />
}, {
  path: '/detail/:catId/:productId',
  element: <Detail />
}, {
  // path: '/category/:initialCatIdentifier',      // initialCatIdentifier = 0: 'All'; initialCatIdentifier = 1: 'What's new'; initialCatIdentifier = 2: 'Discounts'
  path: '/category',
  element: <Category />
}, {
  path: '/cart',
  element: <Cart />
}, {
  path: '/order/:orderId',
  element: <Order />
}, {
  path: '/payment-success',
  element: <PaymentSuccess />
}, {
  path: '/me',
  element: <Profile />
}, {
  path: '/address',
  element: <Address />
}, {
  path: '/add-address',
  element: <AddAddress />
}, {
  path: '/edit-address',
  element: <EditAddress />
}, {
  path: '/*',
  element: <Home />
}
])

function App() {
  return (
    <RouterProvider router={router}/>
  );
}

export default App;


