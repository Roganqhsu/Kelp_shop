import React from 'react'
import styles from "./ProductItem.module.scss";
import { Link } from 'react-router-dom';
// component
import Card from '../../card/Card';
// redux
import { useDispatch } from "react-redux"
// slice
import { ADD_TO_CART,    CALCULATE_TOTAL_QUANTITY
} from "../../../redux/slice/cartSlice"
const ProductItem = ({ grid, product, imageURL, desc, price, id, name }) => {
  const dispatch = useDispatch()
  const shortenText = (text, n) => {
    if (text.length > n) {
      const newText = text.substring(0, n).concat("...")
      return newText
    }
    return text
  }
  const addCart = (product) => {
    // console.log(product);
    dispatch(ADD_TO_CART(product));
    dispatch(CALCULATE_TOTAL_QUANTITY());
  }
  return (
    <Card
      cardClass={grid ? `${styles.grid}` : `${styles.list}`}
    >
      <Link to={`/product-details/${id}`}>
        <div className={styles.img}>
          <img src={imageURL} alt={name} />
        </div>
      </Link>
      <div className={styles.content}>

        <div className={styles.details}>
          <p>{price}</p>
          <h4>{name}</h4>
        </div>
        {!grid && <p className={styles.desc}>
          {shortenText(desc, 200)}
        </p>}
        <button onClick={() => { addCart(product) }}>
          Add To Cart
        </button>
      </div>

    </Card>
  )
}

export default ProductItem