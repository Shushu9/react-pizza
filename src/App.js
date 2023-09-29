import { useState } from 'react';

import './scss/app.scss';

import Header from './components/header';
import Categories from './components/categories';
import Sort from './components/sort';
import PizzaBlock from './components/pizza-block';

function App() {
  const [items, setItems] = useState([])

  fetch('https://651701c309e3260018ca9138.mockapi.io/items').then((res) => {
    return res.json();
  }).then((arr) => {
    setItems(arr)
  })

  return (
    <div className="App">
      <div className="wrapper">
        <Header />
        <div className="content">
          <div className="container">
            <div className="content__top">
              <Categories />
              <Sort />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
              {items.map((data) => (
                <PizzaBlock
                  {...data}
                  key={data.id} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
