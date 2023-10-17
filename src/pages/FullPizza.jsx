import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const FullPizza = () => {
    const [pizza, setPizza] = useState();

    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchPizza() {
            try {
                const { data } = await axios.get(`https://651701c309e3260018ca9138.mockapi.io/items/?${id}`);
                setPizza(data[0]);
            } catch (error) {
                alert('Ошибка при получении пиццы!');
                navigate('/');
            }
        }
        fetchPizza();
    }, [id, navigate]);

    if (!pizza) {
        return <>Загрузка...</>;
    }

    return (
        <div className="container">
            <img src={pizza.imageUrl} alt='pizza' />
            <h2>{pizza.title}</h2>
            <h4>{pizza.price} ₽</h4>
            <Link to="/">
                <button className="button button--outline button--add">
                    <span>Назад</span>
                </button>
            </Link>
        </div>
    );
};

export default FullPizza;