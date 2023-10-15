import { useEffect, useRef } from 'react';

import qs from "qs";

import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';

import { setCurrentPage, setFilters } from '../redux/filter/slice'
import { fetchPizzas } from '../redux/pizza/slice'

import Categories from '../components/Categories';
import Sort, { LIST } from '../components/Sort';
import PizzaBlock from '../components/pizza-block';
import Skeleton from '../components/pizza-block/Skeleton';
import Pagination from '../components/pagination';


const Home = () => {
    const isSearch = useRef(false);
    const isMounted = useRef(false);
    const { items, status } = useSelector((state) => state.pizza)
    const { categoryId, sortType, currentPage, searchValue } = useSelector((state) => state.filter)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onChangePage = (num) => {
        dispatch(setCurrentPage(num))
    }

    const getPizzas = async () => {
        const order = sortType.sort.includes('-') ? 'asc' : 'desc';
        const sortBy = sortType.sort.replace('-', '');
        const categoty = categoryId > 0 ? 'category=' + categoryId : '';
        const search = searchValue ? `&search=${searchValue}` : '';

        dispatch(fetchPizzas({
            order,
            sortBy,
            categoty,
            search,
            currentPage,
        }));
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
            getPizzas()
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
            {status === 'error' ? (
                <div className="content__error-info">
                    <h2>Произошла ошибка 😕</h2>
                    <p>К сожалению, не удалось получить пиццы. Попробуйте повторить попытку позже.</p>
                </div>
            ) : (
                <div className="content__items">
                    {status === 'loading' ? skeletons : pizzas}
                </div>
            )}

            < Pagination currentPage={currentPage} setCurrentPage={(i) => onChangePage(i)} />
        </div>
    )
}

export default Home;