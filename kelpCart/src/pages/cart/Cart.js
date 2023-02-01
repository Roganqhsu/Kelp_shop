import React, { useEffect } from "react";
import styles from "./Cart.module.scss";

import { Link, useNavigate } from "react-router-dom";
// component
import Card from "../../components/card/Card";
// redux
import { useDispatch, useSelector } from "react-redux";
// slice
import {
    ADD_TO_CART,
    DECREASE_CART,
    REMOVE_FROM_CART,
    CLEAR_CART,
    CALCULATE_SUBTOTAL,
    CALCULATE_TOTAL_QUANTITY,
    SAVE_URL,
    selectCartItems,
    selectCartTotalAmount,
    selectCartTotalQuantity,
    selectPreviousURL
} from "../../redux/slice/cartSlice";
import {
    selectIsLoggedIn
} from "../../redux/slice/authSlice"
// icon
import { FaTrashAlt } from "react-icons/fa";

const Cart = () => {
    // 本地端變數
    const url = window.location.href;
    // router
    const navigate= useNavigate()
    // select
    const cartItems = useSelector(selectCartItems);
    const cartTotalAmount = useSelector(selectCartTotalAmount);
    const cartTotalQuantity = useSelector(selectCartTotalQuantity);
    const isLoggedIn =useSelector(selectIsLoggedIn);
    const dispatch = useDispatch();
    // 新增商品
    const onClickIncreaseCart = (cart) => {
        dispatch(ADD_TO_CART(cart));
    }
    // 減少商品
    const onClickDecrease = (cart) => {
        dispatch(DECREASE_CART(cart))
    }
    // 刪除商品
    const onClickRemove = (cart) => {
        dispatch(REMOVE_FROM_CART(cart));
    }
    // 清空購物車
    const onClickCart = () => {
        dispatch(CLEAR_CART())
    }
    // 結算金額
    useEffect(
        () => {
            dispatch(CALCULATE_SUBTOTAL())
        }, [dispatch, cartItems]
    )
    // 計算數量
    useEffect(
        () => {
            dispatch(CALCULATE_TOTAL_QUANTITY())
            dispatch(SAVE_URL(''))
        }, [dispatch, cartItems]
    )
    const onClickCalculate = () => {
    }
    const checkOut = () => {
        if(isLoggedIn){
            navigate("/checkout-details")
        }else{
            dispatch(SAVE_URL(url))
            navigate("/login")
        }
    }
    return (
        <section>
            <div className={`container ${styles.table}`}>
                <h2>Shopping Cart</h2>
                {cartItems.length === 0 ? (
                    <>
                        <p>Your cart is currently empty.</p>
                        <br />
                        <div>
                            <Link to="/#products">&larr; Continue shopping</Link>
                        </div>
                    </>
                ) : (
                    <>
                        <table>
                            <thead>
                                <tr>
                                    <th>s/n</th>
                                    <th>Product</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                    <th>Total</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cartItems.map((cart, index) => {
                                    const { id, name, price, imageURL, cartQuantity } = cart;
                                    return (
                                        <tr key={id}>
                                            <td>{index + 1}</td>
                                            <td>
                                                <p>
                                                    <b>{name}</b>
                                                </p>
                                                <img
                                                    src={imageURL}
                                                    alt={name}
                                                    style={{ width: "100px" }}
                                                />
                                            </td>
                                            <td>{price}</td>
                                            <td>
                                                <div className={styles.count}>
                                                    <button
                                                        className="--btn"
                                                        onClick={() => { onClickDecrease(cart) }}
                                                    >
                                                        -
                                                    </button>
                                                    <p>
                                                        <b>{cartQuantity}</b>
                                                    </p>
                                                    <button
                                                        className="--btn"
                                                        onClick={() => {
                                                            // increaseCart
                                                            onClickIncreaseCart(cart)
                                                        }}
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                            </td>
                                            <td>{(price * cartQuantity).toFixed(2)}</td>
                                            <td className={styles.icons}>
                                                <FaTrashAlt
                                                    size={19}
                                                    color="red"
                                                    onClick={() => { onClickRemove(cart) }}
                                                    className={styles.test}
                                                />
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                        <div className={styles.summary}>
                            <button className="--btn --btn-danger" onClick={() => { onClickCart() }}>
                                Clear Cart
                            </button>
                            <div className={styles.checkout}>
                                <div>
                                    <Link to="/#products">&larr; Continue shopping</Link>
                                </div>
                                <br />
                                <Card cardClass={styles.card}>
                                    <button onClick={() => {
                                        onClickCalculate()
                                    }}>test</button>
                                    <p>
                                        <b> {`Cart item(s): ${cartTotalQuantity}`}</b>
                                    </p>
                                    <div className={styles.text}>
                                        <h4>Subtotal:</h4>
                                        <h3>{`$${cartTotalAmount.toFixed(2)}`}</h3>
                                    </div>
                                    <p>Tax an shipping calculated at checkout</p>
                                    <button
                                        className="--btn --btn-primary --btn-block"
                                        onClick={() => {checkOut()}}
                                    >
                                        Checkout
                                    </button>
                                </Card>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </section>
    );
};

export default Cart;
