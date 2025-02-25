import React from 'react'
import AppContext from '../../context';
import styles from './Card.module.scss'
import ContentLoader from 'react-content-loader';

function Card({ 
    id,
    article, 
    title, 
    imageUrl, 
    price, 
    onFavorite, 
    onPlus, 
    favorited = false, 
    loading = false
}) {
    const {isItemAdded} = React.useContext(AppContext);
    const {isItemFavorited} = React.useContext(AppContext);
    const [isLiked,setIsLiked] = React.useState(favorited);

    

    const onClickPlus=()=>{
        onPlus({id, article, title, imageUrl, price});
    }
    const onClickFavorite=()=>{
        onFavorite({id, article, title, imageUrl, price});
        setIsLiked(!isLiked);
    }

    return(
        <div className={styles.card}>
            {
                loading ? 
                <ContentLoader 
                    speed={2}
                    width={155}
                    height={265}
                    viewBox="0 0 155 265"
                    backgroundColor="#f3f3f3"
                    foregroundColor="#ecebeb"
                >
                    <rect x="0" y="0" rx="10" ry="10" width="150" height="148" /> 
                    <rect x="0" y="160" rx="5" ry="5" width="150" height="21" /> 
                    <rect x="0" y="187" rx="5" ry="5" width="100" height="15" /> 
                    <rect x="118" y="230" rx="10" ry="10" width="32" height="32" /> 
                    <rect x="0" y="233" rx="5" ry="5" width="76" height="25" />
                </ContentLoader> :
                <>
                    <div className={styles.favorite} onClick={onClickFavorite}>
                        {onFavorite && <img className={styles.favorite} src={isItemFavorited(article) ? "img/liked.svg" : "img/unliked.svg"} alt="Unliked" />}
                    </div>
                    <img
                        width={133}
                        height={112}
                        src={imageUrl}
                        alt="Sneakers"
                    ></img>
                    <h5>{title}</h5>
                    <div className="d-flex justify-between align-center">
                        <div className="d-flex flex-column">
                        <span>Цена:</span>
                        <b>{price} руб.</b>
                        </div>
                        {
                            onPlus && <img className={styles.plus} onClick={onClickPlus} src={isItemAdded(article) ? "img/btn-checked.svg" : "img/btn-plus.svg"} alt="+"></img>
                        }
                    </div>
                </>
            }
        </div>
    );
}
export default Card;