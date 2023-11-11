import React from 'react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

import styles from './full-pizza-block.module.scss';

const FullPizzaBlock: React.FC = () => {
    const [pizza, setPizza] = useState<{
        imageUrl: string;
        title: string;
        price: number;
    }>();

    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchPizza() {
            try {
                if (id) {
                    const { data } = await axios.get(`https://651701c309e3260018ca9138.mockapi.io/items/?${id}`);
                    setPizza(data[id]);
                }
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
        <div className={styles.root}>
            <div className={styles.image}>
                <img src={pizza.imageUrl} alt='pizza' />
            </div>

            <div className={styles.info}>
                <h2>{pizza.title}</h2>
                <h4>Стоимость: {pizza.price} ₽</h4>
                <p className={styles.desc}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>
                <Link to="/">
                    <button className="button button--outline button--add">
                        <span>Назад</span>
                    </button>
                </Link>
            </div>

        </div>
    );
};

export default FullPizzaBlock;