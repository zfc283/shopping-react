import { useNavigate } from "react-router-dom";

type DiscountProps = {
    discounts: Array<{
        catId: string;
        id: string;
        title: string;
        imgUrl: string;
        price: string;
    }> | undefined;
}




const Discounts = ({ discounts }: DiscountProps) => {
    const navigate = useNavigate();

    const handleItemClick = (catId: string, productId: string) => {
        navigate(`/detail/${catId}/${productId}`);
    }

    return (
        <div className="card">
            <h3 className="card-title">
                <img className="card-title-icon2" src={require('../../../images/clock.png')} alt="hot" />
                Discounts
                <div className="card-title-time">
                    <div className="left-time">
                        24</div>
                    :
                    <div className="left-time">45</div>
                    :
                    <div className="left-time">56</div>
                </div>
                <div className="card-title-more">
                    More
                    <span className="iconfont card-more-icon" onClick={() => { navigate('/category', { state: { id: '-1', name: 'Discounts' } }) }}>&#xe631;</span>
                </div>
            </h3>
            <div className="card-content">
                {
                    (discounts || []).map((item) => {
                        return (
                            <div className="card-content-item" key={item.id} onClick={() => { handleItemClick(item.catId, item.id) }}>
                                <img alt="" src={item.imgUrl} className="card-content-item-pic" />
                                <p className="card-content-item-desc">{item.title}</p>
                                <p className="card-content-item-price">
                                    <span className="card-content-item-yen">&#36;</span>
                                    {item.price}
                                    <span className="iconfont">&#xe7e0;</span>
                                </p>
                            </div>
                        )
                    })
                }
                {/* <div className="card-content-item" onClick={() => {handleItemClick('1132385')}}>
                    <img alt="" src={require('../../../images/carambola.png')} className="card-content-item-pic" />
                    <p className="card-content-item-desc">Malaysia imported star fruit</p>
                    <p className="card-content-item-price">
                        <span className="card-content-item-yen">&#36;</span>
                        6.98
                        <span className="iconfont">&#xe7e0;</span>
                    </p>
                </div>
                <div className="card-content-item" onClick={() => {handleItemClick('1132386')}}>
                    <img alt="" src={require('../../../images/kiwi.png')} className="card-content-item-pic" />
                    <p className="card-content-item-desc">Home grown golden kiwi</p>
                    <p className="card-content-item-price">
                        <span className="card-content-item-yen">&#36;</span>
                        4.97
                        <span className="iconfont">&#xe7e0;</span>
                    </p>
                </div>
                <div className="card-content-item" onClick={() => {handleItemClick('1132387')}}>
                    <img alt="" src={require('../../../images/apple.png')} className="card-content-item-pic" />
                    <p className="card-content-item-desc">Fresh red fuji apples</p>
                    <p className="card-content-item-price">
                        <span className="card-content-item-yen">&#36;</span>
                        4.36
                        <span className="iconfont">&#xe7e0;</span>
                    </p>
                </div>
                <div className="card-content-item" onClick={() => {handleItemClick('1132388')}}>
                    <img alt="" src={require('../../../images/pear.jpeg')} className="card-content-item-pic" />
                    <p className="card-content-item-desc">Thailand imported pears</p>
                    <p className="card-content-item-price">
                        <span className="card-content-item-yen">&#36;</span>
                        5.94
                        <span className="iconfont">&#xe7e0;</span>
                    </p>
                </div> */}
            </div>
        </div>
    )
}

export default Discounts;