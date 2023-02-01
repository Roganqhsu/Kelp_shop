import React from 'react';

import  { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./AddProduct.module.scss";
// redux
import { useSelector } from "react-redux";
import { selectProducts } from "../../../redux/slice/productSlice";

// firebaseStore
// 上傳檔案用
import { addDoc, collection, doc, setDoc, Timestamp } from "firebase/firestore";
// 取得資料 
import {
  // 刪除
  deleteObject,
  // 取得圖片網址
  getDownloadURL,
  ref,
  // 取得上傳進度
  uploadBytesResumable,
} from "firebase/storage";
import { async } from "@firebase/util";
// 取得資料庫
import { db, storage } from "../../../firebase/config";

import Card from "../../card/Card";
import Loader from "../../loader/Loader";
import { toast } from "react-toastify";

// 預設值
const categories = [
  { id: 1, name: "Laptop" },
  { id: 2, name: "Electronics" },
  { id: 3, name: "Fashion" },
  { id: 4, name: "Phone" },
];

const initialState = {
  name: "",
  imageURL: "",
  price: 0,
  category: "",
  brand: "",
  desc: "",
};

const AddProduct = () => {
  // 從網址取得ID，但Router那邊要用/:id，window才知道id值
  const { id } = useParams();
  // console.log("useParams" + id);
  // 判斷為新增或編輯
  const detectForm = (id, f1, f2) => {
    if (id == "ADD") {
      return (
        f1
      )
    }
    return (
      f2
    )
  }

  const products = useSelector(selectProducts)
  const productEdit = products.find((item) => item.id === id)

  const [product, setProduct] = useState(
    () => {
      const newState = detectForm(id,
        { ...initialState },
        productEdit
      )
      return newState
    }
  );
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value })
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    // 設定上傳位置
    const storageRef = ref(storage, `E_Shop/${Date.now()} ${file.name}`);
    console.log(file.name);
    // 上傳檔案
    const uploadTask = uploadBytesResumable(storageRef, file);
    //進度條 + 取得圖片網址
    uploadTask.on('state_changed',
      // 
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
      },
      (error) => {
        console.log(error.message);
      },
      // 取得圖片網址
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref)
          .then(
            (downloadURL) => {
              // 將圖片位址傳入
              setProduct({ ...product, imageURL: downloadURL })
            }
          );
      }
    );
  };
  // 新增商品
  const addProduct = (e) => {
    e.preventDefault();
    console.log("addProduct");
    console.log(e);
    // setIsLoading(true)
    try {
      const docRef = addDoc(collection(db, "products"), {
        name: product.name,
        imageURL: product.imageURL,
        price: Number(product.price),
        category: product.category,
        brand: product.brand,
        desc: product.desc,
        createdAt: Timestamp.now().toDate(),
      });
      // 還原預設值
      setProduct({ ...initialState })
      setUploadProgress(0);
      setTimeout(() => {
        setIsLoading(false)
        navigate('/admin/all-products');
      }, 2000)
    } catch (error) {
      console.log("addProductError" + error.message);
      console.log(error);
    }
  }
  // 修改商品
  const editProduct = (e) => {
    e.preventDefault();
    console.log("editProduct");
    if (product.imageURL !== productEdit.imageURL) {
      const storageRef = ref(storage, productEdit.imageURL);
      deleteObject(storageRef);
    }
    try {
      setDoc(doc(db, "products", id), {
        name: product.name,
        imageURL: product.imageURL,
        price: Number(product.price),
        category: product.category,
        brand: product.brand,
        desc: product.desc,
        createdAt: product.createdAt,
        productEditAt: Timestamp.now().toDate()
      }
      );
    }
    catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      {isLoading && <Loader />}
      <div className={styles.product}>
        <h2>{detectForm(id, 'ADD New Product', "EDIT Product")}</h2>
        <Card cardClass={styles.card}>
          <form onSubmit={() => addProduct()}
          >
            <label>Product name:</label>
            <input
              type="text"
              placeholder="Product name"
              required
              name="name"
              value={product.name}
              onChange={(e) => handleInputChange(e)}
            />
            <label>Product image:</label>
            <Card cardClass={styles.group}>
              {/* 進度條 */}
              {uploadProgress === 0 ? null : (
                <div className={styles.progress}>
                  <div
                    // 如果樣式名稱有虛線，則引用時需要用["..."]匡列
                    className={styles["progress-bar"]}
                    style={{ width: `${uploadProgress}%` }}
                  >
                    {uploadProgress < 100
                      ? `Uploading ${uploadProgress}`
                      : `Upload Complete ${uploadProgress}%`}
                  </div>
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                placeholder="Product Image"
                name="image"
                onChange={(e) => handleImageChange(e)}
              />
              {product.imageURL}
            </Card>
            <label>Product price:</label>
            <input
              type="number"
              placeholder="Product price"
              required
              name="price"
              value={product.price}
              onChange={(e) => handleInputChange(e)}
            />
            {/* 需要練一下 */}
            <label>Product Category:</label>
            <select
              required
              name="category"
              value={product.category}
              onChange={(e) => handleInputChange(e)}
            >
              <option value="" disabled>
                -- choose product category --
              </option>
              {categories.map((cat) => {
                return (
                  <option key={cat.id} value={cat.name}>
                    {cat.name}
                  </option>
                );
              })}
            </select>
            <label>Product Company/Brand:</label>
            <input
              type="text"
              placeholder="Product brand"
              required
              name="brand"
              value={product.brand}
              onChange={(e) => handleInputChange(e)}
            />
            <label>Product Description</label>
            <textarea
              name="desc"
              required
              value={product.desc}
              onChange={(e) => handleInputChange(e)}
              cols="30"
              rows="10"
            >
            </textarea>
            {/* <input type='submit' value='送出' className="--btn --btn-primary"/> */}
            <button
              // type="submit" 
              onClick={
                detectForm(id, addProduct, editProduct)
              }
              className="--btn --btn-primary">
              {detectForm(id, "Add Product", "Edit Product")}
            </button>
          </form>
        </Card>
      </div>
    </>
  );
};

export default AddProduct;
