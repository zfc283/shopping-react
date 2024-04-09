import './style.scss';
import { useNavigate } from 'react-router-dom';




const PaymentSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="page payment-success-page">
      <div className="container">
        <img src={require('../../images/success.png')} alt="" />
        <div className="success-text">Payment successful</div>
        <div className="button" onClick={() => {navigate('/home')}}>Return to home page</div>
      </div>
    </div>
  );
}

export default PaymentSuccess;


