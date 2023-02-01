import React, { useState, useEffect } from 'react'
import styles from "./ProductList.module.scss"

// redux
import { useDispatch, useSelector } from "react-redux";
import {
  FILTER_BY_SEARCH,
  SORT_PRODUCT,
  selectFilterProducts
} from '../../../redux/slice/filterSlice';

// components
import Search from "../../search/Search"
import Pagination from '../../pagination/Pagination';
// icons
import { BsFillGridFill } from "react-icons/bs";
import { FaListAlt } from "react-icons/fa";
import ProductItem from '../ProductItem/ProductItem';

const ProductList = ({ products }) => {
  // API變數
  const dispatch = useDispatch()
  // redux
  const filteredProducts = useSelector(selectFilterProducts)
  // 本地端變數
  const [grid, setGrid] = useState(true)
  const [sort, setSort] = useState("Latest")
  const [search, setSearch] = useState('');
  // 設定頁數
  //     目前頁碼
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPrePage] = useState(5);
  const indexOfLastProduct = currentPage * productsPrePage;
  const indexOfFirstProduct = indexOfLastProduct - productsPrePage;
  const currentProduct = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalProduct = products.length;
  //      
  // 執行端
  useEffect(
    () => {
      dispatch(
        FILTER_BY_SEARCH({ products, search })
      )
    }
    , [dispatch, search, products])
  useEffect(
    () => {
      dispatch(
        SORT_PRODUCT(
          { products, sort }
        )
      )
    }
    , [dispatch, sort, products])
  return (
    <div className={styles["product-list"]}>
      {/* top */}
      <div className={styles.top}>
        <div className={styles.icons}>
          <BsFillGridFill size={22} color="orangered" onClick={() => setGrid(true)} />
          <FaListAlt size={24} color="#0066d4" onClick={() => setGrid(false)} />
          <p>
            <b>{filteredProducts.length}</b> Products fund
          </p>
        </div>
        <div>
          <Search value={search} onChange={(e) => { setSearch(e.target.value) }} />
        </div>
        <div className={styles.sort}>
          <label>Sort by</label>
          <select value={sort} onChange={(e) => { setSort(e.target.value) }}>
            <option>Latest</option>
            <option>Lowest Price</option>
            <option>Highest Price</option>
            <option>A - Z</option>
            <option>Z - A</option>
          </select>
        </div>
      </div>
      {/* 產品列表 */}
      <div className={
        grid ? `${styles.grid}` : `${styles.list}`
      }>
        {products == null ? <>products is not found</> : <>
          {currentProduct.map((product) => {
            return (
              <>
                <div key={product.id}>
                  <ProductItem {...product} grid={grid}
                    product={product}
                  />
                </div>
              </>
            )
          })}
        </>}
        {/* 頁碼 */}
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          productsPrePage={productsPrePage}
          totalProduct={totalProduct}
        />
      </div>
    </div>
  )
}

export default ProductList