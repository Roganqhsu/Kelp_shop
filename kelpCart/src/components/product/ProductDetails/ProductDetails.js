import React, { useEffect, useState } from 'react'

import styles from "./ProductDetails.module.scss"
// react dom
import { Link, useParams } from 'react-router-dom'
// firebase API
import { doc, getDoc } from "firebase/firestore";
import { async } from '@firebase/util';
// firebase 
import { db } from '../../../firebase/config';
// redux
import { useDispatch, useSelector } from 'react-redux';
// slice
import {
  ADD_TO_CART,
  DECREASE_CART,
  REMOVE_FROM_CART,
  CLEAR_CART,
  CALCULATE_TOTAL_QUANTITY,
  selectCartItems
} from "../../../redux/slice/cartSlice"

const ProductDetails = () => {
  // 取得ID
  const { id } = useParams();
  // 設立變數
  const [product, setProduct] = useState('');
  const getProduct = async () => {
    const docRef = doc(db, "products", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      let obj = {
        id: id,
        ...docSnap.data()
      };
      setProduct(obj);
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  };
  // 引用redux
  const dispatch = useDispatch()
  const cart = useSelector(selectCartItems)
  const productCart = cart.filter((item) => item.id === id)
  // 新增
  const onClickIncreaseCart = (product) => {
    dispatch(ADD_TO_CART(product));
    dispatch(CALCULATE_TOTAL_QUANTITY())
  }
  // 刪除
  const onClickDecreaseCart = (product) => {
    dispatch(DECREASE_CART(product));
    dispatch(CALCULATE_TOTAL_QUANTITY())

  }
  // 購物車內是否有商品
  const isCartAdded = cart.findIndex(
    (item) => { return item.id === id }
  )
  // console.log(isCartAdded);
  useEffect(
    () => {
      getProduct()
    }
    , [productCart])
  return (
    <section >
      <div className={`container ${styles.product}`}>
        <h2>Product Details</h2>
        <Link to='/#products'>
          back to product
        </Link>
        <div className={styles.details}>
          {/* img */}
          <div className={styles.img}>
            <img src={product.imageURL} alt={product.name} />
          </div>
          {/* content */}
          <div className={styles.content}>
            <h2>{product.name}</h2>
            <div className={styles.price}>
              {product.price}
            </div>
            {/* desc */}
            <p>
              {product.desc}
            </p>
            <p>
              <b>SKU</b>{product.id}
            </p>
            <p>
              <b>Brand</b>{product.brand}
            </p>
            <div className={styles.count}>
              {isCartAdded < 0 ? null : (<>
                <button
                  className="--btn"
                  onClick={() => { onClickDecreaseCart(product) }}
                >
                  -
                </button>
                <p>
                  <b>{productCart[0].cartQuantity}</b>
                </p>
                <button
                  className="--btn"
                  onClick={() => {
                    onClickIncreaseCart(product)
                  }}
                >
                  +
                </button>
              </>)}

            </div>
            <button
              className="--btn --btn-danger"
              onClick={() => {
                onClickIncreaseCart(product)
              }}
            >
              ADD TO CART
            </button>
          </div>
        </div>
      </div>
    </section >
  )
}

export default ProductDetails