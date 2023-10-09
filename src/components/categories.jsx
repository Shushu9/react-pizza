import { useSelector, useDispatch } from 'react-redux'
import { setCategoryId } from '../redux/filter/slice'

function Categories() {
  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые']

  const categoryId = useSelector((state) => state.filter.categoryId)
  const dispatch = useDispatch()

  return (
    <div className="categories">
      <ul>
        {categories.map((el, i) =>
          <li key={el} onClick={() => dispatch(setCategoryId(i))} className={categoryId === i ? 'active' : ''}>
            {el}
          </li>
        )}
      </ul>
    </div>
  )
}

export default Categories;