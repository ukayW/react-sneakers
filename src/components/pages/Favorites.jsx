import Card from '../Card';
import AppContext from '../../context';
import React from 'react';

function Favorites(){
    const {favorites} = React.useContext(AppContext);
    const {onAddToFavorite} = React.useContext(AppContext);
    const {onAddToCart} = React.useContext(AppContext);
    return(
        <div className="content p-40">
            <div className="d-flex align-center justify-between mb-40">
                <h1>Мои закладки</h1>
                
            </div>
            <div className="d-flex flex-wrap">
                {favorites.map((item, index) => (
                    <Card 
                    key={index}
                    favorited={true}
                    onFavorite={onAddToFavorite}
                    onPlus={onAddToCart}
                    {...item}
                    />
                ))}
            </div>
      </div>
    );
}

export default Favorites;