function Categories({ categoryId, onClickCategory }) {
  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые']

  return (
    <div className="categories">
      <ul>
        {categories.map((el, i) =>
          <li key={el} onClick={() => onClickCategory(i)} className={categoryId === i ? 'active' : ''}>
            {el}
          </li>
        )}
      </ul>
    </div>
  )
}

export default Categories;