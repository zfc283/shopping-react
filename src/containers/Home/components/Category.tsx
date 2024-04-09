import { useNavigate } from 'react-router-dom';


type CategoryProps = {
    categories: Array<{
        id: string;
        name: string;
        imgUrl: string;
    }> | undefined;
}

const Category = ({ categories }: CategoryProps) => {
    const navigate = useNavigate();

    return (
        <div className="category">
            {(categories || []).map((item) => {
                return (
                    <div className="category-item" key={item.id} onClick={() => {navigate('/category', {state:{id:item.id, name:item.name}})}}>
                        <img className="category-item-img" alt={item.name} src={item.imgUrl} />
                        <p className="category-item-desc">{item.name}</p>
                    </div>
                )
            })}
        </div>
    )
}

export default Category;