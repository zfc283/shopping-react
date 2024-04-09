import { useNavigate } from "react-router-dom";

type Props = {
    freshes: Array<{
        catId: string;
        id: string;
        title: string;
        imgUrl: string;
        price: string;
    }> | undefined;
}

const Freshes = ({freshes} : Props) => {
  const navigate = useNavigate();

  const handleItemClick = (catId: string, productId: string) => {
    navigate(`/detail/${catId}/${productId}`);
  }

    return (
        <div className="card">
        <h3 className="card-title">
          <img className="card-title-icon" src={require('../../../images/hot.png')} alt="hot" />
          New arrivals
          <div className="card-title-more">
            More
            <span className="iconfont card-more-icon" onClick={() => {navigate('/category', {state:{id:'-1',name:'What\'s new'}})}}>&#xe631;</span>
          </div>
        </h3>
        <div className="card-content">
          {(freshes || []).map((item) => {
            return (
              <div className="card-content-item" key={item.id} onClick={() => {handleItemClick(item.catId, item.id)}}>
                <img alt="" src={item.imgUrl} className="card-content-item-pic" />
                <p className="card-content-item-desc">{item.title}</p>
                <div className="card-content-item-price">
                  <span className="card-content-item-yen">&#36;</span>
                  {item.price}
                  <span className="iconfont">&#xe7e0;</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
}

export default Freshes;