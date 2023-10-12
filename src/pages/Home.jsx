import { useEffect, useRef, useState } from 'react';

import qs from "qs";

import axios from 'axios';

import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';

import { setCurrentPage, setFilters } from '../redux/filter/slice'

import Categories from '../components/Categories';
import Sort, { LIST } from '../components/Sort';
import PizzaBlock from '../components/pizza-block';
import Skeleton from '../components/pizza-block/Skeleton';
import Pagination from '../components/pagination';


const Home = () => {
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const isSearch = useRef(false);
    const isMounted = useRef(false);
    const { categoryId, sortType, currentPage, searchValue } = useSelector((state) => state.filter)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onChangePage = (num) => {
        dispatch(setCurrentPage(num))
    }

    const fetchPizzas = () => {
        setIsLoading(true);

        const order = sortType.sort.includes('-') ? 'asc' : 'desc';
        const sortBy = sortType.sort.replace('-', '');
        const categoty = categoryId > 0 ? 'category=' + categoryId : '';
        const search = searchValue ? `&search=${searchValue}` : '';

        axios.get(`https://651701c309e3260018ca9138.mockapi.io/items?page=${currentPage}&limit=4&${categoty}&sortBy=${sortBy}&order=${order}${search}`)
            .then((res) => {
                setItems(res.data);
                setIsLoading(false);
            }).catch((error) => {
                console.log(error);
            })
    }

    useEffect(() => {
        if (window.location.search) {
            const params = qs.parse(window.location.search.substring(1))
            const sort = LIST.find(obj => obj.sort === params.sortType)

            dispatch(
                setFilters({
                    categoryId: Number(params.categoryId),
                    currentPage: Number(params.currentPage),
                    sortType: sort
                })
            )
            isSearch.current = true;
        }
    }, [dispatch])

    useEffect(() => {
        window.scrollTo(0, 0)

        if (!isSearch.current) {
            fetchPizzas()
        }

        isSearch.current = false;
        // eslint-disable-next-line
    }, [categoryId, sortType, searchValue, currentPage])

    useEffect(() => {
        if (isMounted.current) {
            const queryString = qs.stringify({
                sortType: sortType.sort,
                categoryId,
                currentPage,
            });

            navigate(`?${queryString}`)
        }

        isMounted.current = true;
    }, [categoryId, currentPage, navigate, sortType, searchValue])

    const pizzas = items.map((data) => (
        <PizzaBlock
            {...data}
            key={data.id} />
    ))

    const skeletons = [...new Array(6)].map((_, i) => <Skeleton key={i} />);

    return (
        <div className="container">
            <div className="content__top">
                <Categories />
                <Sort />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {isLoading ? skeletons : pizzas}
            </div>
            <Pagination currentPage={currentPage} setCurrentPage={(i) => onChangePage(i)} />
        </div>
    )
}

export default Home;