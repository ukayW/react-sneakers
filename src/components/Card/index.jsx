import styles from './Card.module.scss'

function Card(props){

    return(
        <div className={styles.card}>
            <div className="favorite">
                <img src="/img/unliked.svg" alt="Unliked" />
            </div>
            <img
                width={133}
                height={112}
                src={props.imageUrl}
                alt="Sneakers"
            ></img>
            <h5>{props.title}</h5>
            <div className="d-flex justify-between align-center">
                <div className="d-flex flex-column">
                <span>Цена:</span>
                <b>{props.price} руб.</b>
                </div>
                <button className="button" onClick={props.onClick}>
                <img width={11} height={11} src="/img/plus.svg" alt="+"></img>
                </button>
            </div>
        </div>
    );
}
export default Card;