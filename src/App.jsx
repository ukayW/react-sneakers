import React from 'react';
import { Route, Routes } from "react-router-dom";
import axios from 'axios';
import AppContext from './context';

import Header from './components/Header';
import Drawer from './components/Drawer';
import Home from './components/pages/Home';
import Favorites from './components/pages/Favorites';
import Orders from './components/pages/Orders';


function App() {
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [favorites, setFavorites] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState('');
  const [cartOpened, setCartOpened] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  
  React.useEffect(() => {
    async function fetchData(){
      const favoritesResponse = await axios.get('https://54cb928091c661b1.mokky.dev/favorites');
      const cartResponse = await axios.get('https://54cb928091c661b1.mokky.dev/cart');
      const itemsResponse = await axios.get('https://54cb928091c661b1.mokky.dev/items');

      setIsLoading(false);

      setCartItems(cartResponse.data);
      setFavorites(favoritesResponse.data);
      setItems(itemsResponse.data);
    }

    fetchData();
  }, []);

  const onAddToCart = async (obj) => {
    if(cartItems.find((item) => Number(item.article) === Number(obj.article))){
      const product = await axios.get(`https://54cb928091c661b1.mokky.dev/cart/?article=${obj.article}`);
      axios.delete(`https://54cb928091c661b1.mokky.dev/cart/${product.data[0].id}`);
      setCartItems((prev) => prev.filter((item) => Number(item.article) !== Number(obj.article)))
    }
    else{
      obj.id--
      const {data} = await axios.post('https://54cb928091c661b1.mokky.dev/cart', obj);
      setCartItems((prev) => [...prev, data]);
    }
  };

  const onRemoveItem = async (obj) => {
    const product = await axios.get(`https://54cb928091c661b1.mokky.dev/cart/?article=${obj.article}`);
    axios.delete(`https://54cb928091c661b1.mokky.dev/cart/${product.data[0].id}`);
    setCartItems((prev) => prev.filter(item => Number(item.article) !==Number(obj.article)));
  };
  
  const onAddToFavorite = async (obj) => {
    try {
      if(favorites.find((item) => Number(item.article) === Number(obj.article))){
      const product = await axios.get(`https://54cb928091c661b1.mokky.dev/favorites/?article=${obj.article}`);
      axios.delete(`https://54cb928091c661b1.mokky.dev/favorites/${product.data[0].id}`);
      setFavorites((prev) => prev.filter(item => Number(item.article) !== Number(obj.article)));
      }
      else{
        obj.id--
        const {data} = await axios.post('https://54cb928091c661b1.mokky.dev/favorites', obj);
        setFavorites((prev) => [...prev, data]);
      }
    } catch (error) {
      alert('Не удалось добавить в фавориты');
    }
    
  };

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  };

  const isItemAdded = (article) => {
    return cartItems.some((obj) => Number(obj.article) === Number(article));
  }
  const isItemFavorited = (article) => {
    return favorites.some((obj) => Number(obj.article) === Number(article));
  }

  return (
    <AppContext.Provider value={{items, cartItems, favorites, isItemAdded, isItemFavorited, onAddToFavorite, setCartOpened, setCartItems, onAddToCart}}>
      <div className="wrapper clear">
        <Drawer items={cartItems} onClose={() => setCartOpened(false)} onRemove={onRemoveItem} opened={cartOpened} />
        <Header onClickCart={() => setCartOpened(true)}/>
        
        <Routes>
          <Route path='/' element={
            <Home 
              items={items} 
              cartItems={cartItems}
              searchValue={searchValue} 
              setSearchValue={setSearchValue} 
              onChangeSearchInput={onChangeSearchInput} 
              onAddToFavorite={onAddToFavorite} 
              onAddToCart={onAddToCart}
              isLoading={isLoading}
            />
            }/>

          <Route path='/favorites' element={
            <Favorites />
            }/>

          <Route path='/orders' element={
            <Orders />
            }/>
        </Routes>
      </div>
    </AppContext.Provider>
  );
}
export default App;
