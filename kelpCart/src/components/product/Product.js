import React, { useState, useEffect } from 'react'
import styles from "./Product.module.scss"
// redux
import { useSelector, useDispatch } from 'react-redux';
// Slice
import { STORE_PRODUCTS, GET_PRICES_RANGE, selectProducts } from '../../redux/slice/productSlice';
// useFetch
import useFetchCollection from '../../customHooks/useFetchCollection';
// components
import ProductFilter from "./ProductFilter/ProductFilter"
import ProductItem from "./ProductItem/ProductItem";
import ProductDetail from "./ProductDetails/ProductDetails";
import ProductList from "./ProductList/ProductList";
// img
import Spinner from "../../assets/spinner.jpg";
// icon 
import { FaCogs } from "react-icons/fa"
const Product = () => {

  const { data, isLoading } = useFetchCollection("products");
  // 本地端變數
  const [filterShow, setFilterShow] = useState(false)
  // const onClickFilter = () => {
  //   setFilterShow(!filterShow)
  //   console.log(filterShow);
  // }

  const products = useSelector(selectProducts)

  const dispatch = useDispatch()

  useEffect(
    () => {
      dispatch(
        STORE_PRODUCTS({
          products: data
        })
      )
      dispatch(
        GET_PRICES_RANGE({
          products: data
        })
      )
    }
    , [dispatch, data]);

  return (
    <section>
      <div className={`container ${styles.product}`}>
        <aside className={filterShow ? `${styles.filter} ${styles.show}` : `${styles.filter}`}>
          {isLoading ? null : <ProductFilter />}
        </aside>
        <div className={styles.content}>
          {isLoading ?
            <img src={Spinner} style={{ width: "50%" }} className="--center-all" /> :
            (
              <>
                <ProductList products={products} />
                <div
                  className={styles.icon}
                  onClick={() => { setFilterShow(!filterShow) }}
                >
                  <FaCogs size={20} />
                  <p>
                    <b>{filterShow ? "Hide filter" : 'Show filter'}</b>
                  </p>

                </div>
              </>
            )
          }
        </div>
      </div>
    </section>
  )
}

export default Product