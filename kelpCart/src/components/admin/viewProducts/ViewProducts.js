import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import styles from "./ViewProducts.module.scss"
// components
import Search from "../../search/Search";
// firebase
import { collection, doc, setDoc } from "firebase/firestore";
import { query, where, onSnapshot, orderBy, deleteDoc } from "firebase/firestore";
import { ref, deleteObject } from 'firebase/storage'
import { db, storage } from '../../../firebase/config'

// redux
import { useDispatch, useSelector } from 'react-redux';
// slice
import { selectProducts, STORE_PRODUCTS } from '../../../redux/slice/productSlice';
import {
  FILTER_BY_SEARCH,
  selectFilterProducts,
} from "../../../redux/slice/filterSlice";
// useFetch
import useFetchCollection from '../../../customHooks/useFetchCollection';
// 其他套件
import { FaEdit, FaTrashAlt } from 'react-icons/fa'
import { toast } from 'react-toastify';
import Notiflix from 'notiflix';
// import { async } from '@firebase/util';

const ViewProducts = () => {
  // 本地端變數
  const [search, setSearch] = useState("");

  const dispatch = useDispatch()
  const { data, isLoading } = useFetchCollection('products')
  const products = useSelector(selectProducts)
  const filteredProducts = useSelector(selectFilterProducts);

  useEffect(
    () => {
      dispatch(
        STORE_PRODUCTS({
          products: data
        })
      )
    }
    , [dispatch, data])
  useEffect(() => {
    dispatch(FILTER_BY_SEARCH({ products, search }));
  }, [dispatch, products, search]);
  const confirmDelete = (id, imageURL) => {
    Notiflix.Confirm.show(
      'Delete product',
      'You want delete product?',
      'yes',
      'no',
      function okCb() {
        deleteProduct(id, imageURL)
      },
      function cancelCb() {
        alert('😪 ...');
      },
      {
        width: "320px",
        borderRadius: "3px",
        titleColor: "orangered",
        okButtonBackground: "orangered",
        cssAnimationStyle: "zoom",
      },
    );
  }
  const deleteProduct = async (id, ImageURL) => {
    try {
      // 刪除對應ID之商品
      await deleteDoc(doc(db, "products", id));
      // 刪除照片
      // 取得對應位置，及照片
      const storageRef = ref(storage, ImageURL);
      // 執行刪除
      await deleteObject(storageRef);
    }
    catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <div className={styles.table}>
        <h2>All Products</h2>
        <div className={styles.search}>
          <p>
            <b>{filteredProducts.length}</b> products found
          </p>
          <Search value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        {products.length === 0 ?
          (<p>No product found</p>) : (
            <table>
              <thead>
                <tr>
                  <th>s/n</th>
                  <th>Image</th>
                  <th>Name</th>
                  <th>category</th>
                  <th>price</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {
                  filteredProducts.map((product, index) => {
                    const { id, name, imageURL, category, price } = product
                    return (
                      <tr key={id}>
                        <td>
                          {index + 1}
                        </td>
                        <td>
                          <img src={imageURL} style={{ width: '100px' }} alt={name} />
                        </td>
                        <td>
                          {name}
                        </td>
                        <td>
                          {category}
                        </td>
                        <td>
                          {`$${price}`}
                        </td>
                        <td className={styles.icons}>
                          <Link to={`/admin/add-product/${id}`}>
                            <FaEdit size={20} color="green" />
                          </Link>
                          &nbsp;
                          <FaTrashAlt
                            size={18}
                            color="red"
                            onClick={() => {
                              confirmDelete(id, imageURL);
                            }}
                          />
                        </td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </table>
          )
        }
      </div>
    </>
  )
}

export default ViewProducts