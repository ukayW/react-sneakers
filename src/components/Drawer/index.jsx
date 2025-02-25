import React from 'react';
import AppContext from "../../context";
import axios from "axios";

import Info from "../Info";
import { useCart } from '../../hooks/useCart';

import styles from './Drawer.module.scss';



function Drawer({ onClose, onRemove, items = [], opened }){
    const {cartItems, setCartItems, totalPrice} = useCart();
    const [isOrderComplete, setIsOrderComplete] = React.useState(false);
    const [orderId, setOrderId] = React.useState(null);
    const [isLoading, setIsLoading] = React.useState(false);

    const onClickOrder = async () => {
        try {
            setIsLoading(true);
            const {data} = await axios.post('https://54cb928091c661b1.mokky.dev/orders', {
                items: cartItems,
            });
            await axios.patch('https://54cb928091c661b1.mokky.dev/cart', []);
            setOrderId(data.id);
            setIsOrderComplete(true);
            setCartItems([]);
            
        } catch (error) {
            alert('Ошибка при создании заказа :(');
        }
        setIsLoading(false);
    }


    return(
        <div className={`${styles.overlay} ${opened ? styles.overlayVisible : ''}`}>
            <div className={`${styles.drawer} d-flex flex-column flex-1`}>
                <h2 className="d-flex justify-between mb-30 ">
                    Корзина
                    <img
                    className="removeBtn cu-p"
                    src="img/btn-remove.svg"
                    alt="Close"
                    onClick={onClose}
                    />
                </h2>

                {
                    items.length > 0 ? 
                    (
                        <div className="d-flex flex-column flex">
                            <div className="items">
                            {
                                items.map((obj)=>(
                                <div key={obj.article} className="cartItem d-flex align-center">
                                    <div
                                        style={{ backgroundImage: `url(${obj.imageUrl})` }}
                                        className="cartItemImg"
                                        >
                                    </div>

                                    <div className="mr-20 flex">
                                        <p className="mb-5">{obj.title}</p>
                                        <b>{obj.price} руб.</b>
                                    </div>
                                    <img
                                        onClick={() => onRemove(obj)}
                                        className="removeBtn"
                                        src="img/btn-remove.svg"
                                        alt="Remove"
                                    />
                                </div>
                            ))
                            }
                            </div>
                            <div className="cartTotalBlock">
                                <ul>
                                    <li className="d-flex">
                                        <span>Итого:</span>
                                        <div></div>
                                        <b>{totalPrice} руб.</b>
                                    </li>
                                    <li className="d-flex">
                                        <span>Налог 5%:</span>
                                        <div></div>
                                        <b>{totalPrice * 0.05} руб.</b>
                                    </li>
                                </ul>
                                <button disabled={isLoading} onClick={onClickOrder} className="greenButton">
                                    Оформить заказ <img className='arrow__img' src="img/arrow.svg" alt="arrow" />
                                </button>
                            </div>
                        </div>
                    
                    ) : (
                        
                        <Info 
                            title={isOrderComplete ? "Заказ оформлен!" : "Корзина пустая"} 
                            description={isOrderComplete ? `Ваш заказ #${orderId} скоро будет передан курьерской доставке` : 'Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.'} 
                            image={isOrderComplete ? "/img/complete-order.jpg" : "/img/empty-cart.jpg"}
                        />
                    )
                }

                

                
            </div>
        </div>
    );
}
export default Drawer;