import { useContext, useEffect, useState } from 'react';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/pizza-block';
import Skeleton from '../components/pizza-block/Skeleton';
import Pagination from '../components/pagination';

import { SearchContext } from '../App';

const Home = () => {
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [categoryId, setCategoryId] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [sortType, setSortType] = useState({ name: 'популярности', sort: 'rating' });

    const { searchValue } = useContext(SearchContext);



    useEffect(() => {
        setIsLoading(true);

        const order = sortType.sort.includes('-') ? 'asc' : 'desc';
        const sortBy = sortType.sort.replace('-', '');
        const categoty = categoryId > 0 ? 'category=' + categoryId : '';
        const search = searchValue ? `&search=${searchValue}` : '';

        fetch(`https://651701c309e3260018ca9138.mockapi.io/items?page=${currentPage}&limit=4&${categoty}&sortBy=${sortBy}&order=${order}${search}`)
            .then((res) => {
                return res.json();
            }).then((arr) => {
                setItems(arr);
                setIsLoading(false);
            })
        window.scrollTo(0, 0)
    }, [categoryId, sortType, searchValue, currentPage])

    const pizzas = items.map((data) => (
        <PizzaBlock
            {...data}
            key={data.id} />
    ))

    const skeletons = [...new Array(6)].map((_, i) => <Skeleton key={i} />);

    return (
        <div className="container">
            <div className="content__top">
                <Categories categoryId={categoryId} onClickCategory={(i) => setCategoryId(i)} />
                <Sort sortType={sortType} selectSortType={(i) => setSortType(i)} />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {isLoading ? skeletons : pizzas}
            </div>
            <Pagination setCurrentPage={setCurrentPage} />
        </div>
    )
}

export default Home;