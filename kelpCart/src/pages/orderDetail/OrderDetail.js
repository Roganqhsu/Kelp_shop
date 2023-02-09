import React, { useState, useEffect } from 'react'
// styles
import styles from "./OrderDetail.module.scss"
// react dom
import { useParams,Link } from 'react-router-dom'
// get data
import useFetchDocument from "../../customHooks/useFetchDocument"

const OrderDetail = () => {
    // 本地端變數
    const [data, setDate] = useState(null)
    // API
    const { id } = useParams()
    // get data 
    const { document } = useFetchDocument("order", id)
    // 
    useEffect(
        () => {
            setDate(document)
        }
        , [document])
    // const newData =data.cartItems.map((cart,index)=>{
    //     const {name,price}=cart
    //     return ( name,price )
    // })
    // console.log(newData);
    return (
        <section>
            <div className="container">
                <h2>Order Detail</h2>
                <p><b>
                    Back to Orders
                </b></p>
                <p><b> Order Amount </b></p>
                <p><b>Order Status</b></p>
                <div className={styles.table}>
                    <table>
                        <thead>
                            <tr>
                                <th>s/n</th>
                                <th>Product</th>
                                <th>price</th>
                                <th>Quantity</th>
                                <th>Total</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        {data === null ? (<div>null</div>) : (
                            <tbody>
                                {data.cartItems.map((cart, index) => {
                                    const { id, name, price, cartQuantity } = cart
                                    return (
                                        <tr>
                                            <td>
                                                <b>{index + 1}</b>
                                            </td>
                                            <td>
                                                <b>{name}</b>
                                            </td>
                                            <td><b>{price}</b></td>
                                            <td><b>{cartQuantity}</b></td>
                                            <td><b>{price * cartQuantity}</b></td>
                                            <Link to={`/review-product/${id}`}>
                                                <button className="--btn --btn-primary">
                                                    Review Product
                                                </button>
                                            </Link>
                                        </tr>
                                    )
                                })}

                                {/* {newData} */}
                            </tbody>
                        )
                        }
                    </table>
                </div>
            </div>
        </section>
    )
}

export default OrderDetail