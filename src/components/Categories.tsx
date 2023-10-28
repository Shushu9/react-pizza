import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { setCategoryId, setCurrentPage } from '../redux/filter/slice'
import { selectFilter } from '../redux/filter/selectors';

const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые']

const Categories: React.FC = React.memo(() => {
  const { categoryId, currentPage } = useSelector(selectFilter)
  const dispatch = useDispatch()

  const changeCathegory = useCallback((index: number) => {
    dispatch(setCategoryId(index));
    if (currentPage !== 1) {
      dispatch(setCurrentPage(1));
    }
  }, [currentPage, dispatch])

  return (
    <div className="categories">
      <ul>
        {categories.map((el, i) =>
          <li key={el} onClick={() => changeCathegory(i)} className={categoryId === i ? 'active' : ''}>
            {el}
          </li>
        )}
      </ul>
    </div>
  )
})

export default Categories;