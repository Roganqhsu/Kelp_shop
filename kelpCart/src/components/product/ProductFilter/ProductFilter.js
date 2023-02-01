import React, { useState, useEffect } from 'react'
import styles from "./ProductFilter.module.scss"
// redux
import { useSelector, useDispatch } from 'react-redux'
// slice
import { selectProducts, selectMinPrice, selectMaxPrice }
  from '../../../redux/slice/productSlice'
import { FILTER_BY_CATEGORY, FILTER_BY_BRAND, FILTER_BY_PRICE } from '../../../redux/slice/filterSlice'
const ProductFilter = () => {
  const dispatch = useDispatch()
  // slice
  const products = useSelector(selectProducts)
  const min = useSelector(selectMinPrice)
  const max = useSelector(selectMaxPrice)
  // 本地端變數
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("All");
  const [brand, setBrand] = useState("All");
  // 送出所有總類
  const allProducts = [
    "All",
    ...new Set(products.map(
      (product) => (
        product.category
      )
    ))
  ];
  // 送出所有品牌
  const allBrand = [
    "All",
    ...new Set(products.map(
      (product) => (
        product.brand
      )
    ))
  ];
  // effect事件
  // 依品牌搜尋
  useEffect(() => {
    dispatch(
      FILTER_BY_BRAND({ products, brand })
    )
  }, [dispatch, brand, setBrand]);
  // 依價格搜尋
  useEffect(
    () => {
      dispatch(
        FILTER_BY_PRICE(
          { products, price }
        )
      )
    }
    , [dispatch, price, products])
  // 點擊事件
  const clickFilter = (cat) => {
    setCategory(cat)
    dispatch(
      FILTER_BY_CATEGORY(
        { products, category: cat }
      )
    )
  }
  // 清除搜尋
  const clearFilter = () => {
    setCategory('All');
    setBrand('All');
    setPrice(max);
  }
  return (
    <div className={styles.filter}>
      {/* Categories */}
      <h4>Categories</h4>
      <div className={styles.category}>
        {allProducts.map(
          (cat, index) => {
            return (
              <button
                key={index}
                type="button"
                className={category == cat ? `${styles.active}` : null}
                onClick={() => clickFilter(cat)}
              >
                {cat}
              </button>
            )
          })}
      </div>
      {/* brand */}
      <h4>Brand</h4>
      <div className={styles.brand}>
        <select
          value={brand}
          onChange={(e) => {
            setBrand(e.target.value);
          }}
        >
          {allBrand.map(
            (brand, index) => {
              return (
                <option
                  key={index}
                  value={brand}

                >{brand}</option>

              )
            }
          )}
        </select>
      </div>
      <h4>Price</h4>
      <div className={styles.price}>
        <p>{`$${price}`}
        </p>
        <input
          type="range"
          value={price}
          onChange={
            (e) => {
              setPrice(e.target.value)
            }}
          max={max}
          min={min}
        />
      </div>
      <button
        className='--btn --btn-danger'
        onClick={()=>{clearFilter()}}
        >
        Clear Filter
      </button>
    </div>
  )
}

export default ProductFilter