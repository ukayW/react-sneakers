import Card from '../Card';
import React from 'react';

function Home({
    items, 
    searchValue, 
    setSearchValue, 
    onChangeSearchInput, 
    onAddToFavorite, 
    onAddToCart,
    isLoading
    }) {


    const renderItems = () => {
        const filtredItems = items.filter(item => item.title.toLowerCase().includes(searchValue.toLowerCase()));
        return (isLoading ? [...Array(8)] : filtredItems)
        .map((item, index) => (
            <Card 
            key={index}
            onFavorite={(obj)=> onAddToFavorite(obj)}
            onPlus={(obj)=> onAddToCart(obj)}
            loading={isLoading}
            {...item}
            />
        ))
    };

    return(
        <div className="content p-40">
            <div className="d-flex align-center justify-between mb-40">
                <h1>{searchValue ? `Поиск по запросу: "${searchValue}"` : 'Все кроссовки'}</h1>
                <div className="search-block d-flex">
                    <img src="img/search.svg" alt="Search"></img>
                    {searchValue && 
                        <img
                            onClick={()=> setSearchValue('')}
                            className="clear removeBtn cu-p"
                            src="img/btn-remove.svg"
                            alt="clear"
                        />
                    }
                    <input onChange={onChangeSearchInput} value={searchValue} placeholder="Поиск..." />
                </div>
            </div>
            <div className="cards d-flex flex-wrap">
                {renderItems()}
            </div>
      </div>
    );
}

export default Home;