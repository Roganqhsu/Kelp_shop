import React, { useEffect, useState } from 'react'

import styles from "./ProductDetails.module.scss"
// react dom
import { Link, useParams } from 'react-router-dom'
// firebase API
// firebase 
// customHook
import useFetchDocument  from '../../../customHooks/useFetchDocument';
// import useFetchCollection from '../../../customHooks/useFetchCollection';
// redux
import { useDispatch, useSelector } from 'react-redux';
import useFetchCollection from '../../../customHooks/useFetchCollection';
// slice
import {
  ADD_TO_CART,
  DECREASE_CART,
  CALCULATE_TOTAL_QUANTITY,
  selectCartItems
} from "../../../redux/slice/cartSlice"
// API
import StarsRating from "react-star-rate";
import Card from '../../card/Card';
const ProductDetails = () => {
  // 取得ID

  const { id } = useParams();
  const { document } = useFetchDocument("products", id)
  // 設立變數
  const [product, setProduct] = useState("");
  // const getProduct = async () => {
  //   const docRef = doc(db, "products", id);
  //   const docSnap = await getDoc(docRef);
  //   if (docSnap.exists()) {
  //     let obj = {
  //       id: id,
  //       ...docSnap.data()
  //     };
  //     setProduct(obj);
  //     console.log(obj);
  //   } else {
  //     // doc.data() will be undefined in this case
  //     console.log("No such document!");
  //   }
  // };
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
  // 評價
  const { data } = useFetchCollection("reviews");
  const filteredReviews = data.filter((review) => review.productID === id);

  // 購物車內是否有商品
  const isCartAdded = cart.findIndex(
    (item) => { return item.id === id }
  )
  // console.log(isCartAdded);
  useEffect(
    () => {
      // getProduct()
      setProduct(document);

    }
    , [document])
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
        <Card cardClass={styles.card}>
          <h3>Product Reviews</h3>
          <div>
            {filteredReviews.length === 0 ? (
              <p>There are no reviews for this product yet.</p>
            ) : (
              <>
                {filteredReviews.map((item, index) => {
                  const { rate, review, reviewDate, userName } = item;
                  return (
                    <div key={index} className={styles.review}>
                      <StarsRating value={rate} />
                      <p>{review}</p>
                      <span>
                        <b>{reviewDate}</b>
                      </span>
                      <br />
                      <span>
                        <b>by: {userName}</b>
                      </span>
                    </div>
                  );
                })}
              </>
            )}
          </div>
        </Card>
      </div>
    </section >
  )
}

export default ProductDetails