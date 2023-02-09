import React, { useEffect, useState } from 'react'
// style
import styles from "./OrderHistory.module.scss"
// component
import useFetchCollection from '../../customHooks/useFetchCollection'
// 
import { useNavigate } from 'react-router-dom';
// redux
import {
  useSelector,
  useDispatch
} from 'react-redux';
// slice
import {
  STORE_ORDER,
  ORDER_AMOUNT,
  selectOrderHistoryItem,
  selectOrderHistoryAmount
} from '../../redux/slice/orderSlice'
import {
  selectUserID
} from '../../redux/slice/authSlice'
const OrderHistory = () => {
  // 本地端變數
  const { data, isLoading } = useFetchCollection("order")
  // API
  const dispatch = useDispatch()
  // redux
  const orderHistoryItem = useSelector(selectOrderHistoryItem)
  const orderHistoryAmount = useSelector(selectOrderHistoryAmount)
  const userID = useSelector(selectUserID)
  // 
  const navigate = useNavigate()
  useEffect(
    () => {
      dispatch(
        STORE_ORDER(data)
      )
    }, [dispatch, data]
  )
  const filteredOrders = orderHistoryItem.filter(
    (item) => (
      item.userId === userID
    )
  )
  const handleClick = (id) => {
    navigate(`/order-details/${id}`)
  }
  return (
    <section>
      <div className="container">
        <h2>Your Order History</h2>
        <p>open on order to leave a <b>Product review</b></p>
        <>
          <div className={styles.table}>
            {filteredOrders.length == 0 ? (
              <div>no product found</div>
            ) :
              (<table >
                <thead>
                  <tr>
                    <th>s/n</th>
                    <th>Date</th>
                    <th>Order ID</th>
                    <th>Order Amount</th>
                    <th>Order Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map((order, index) => {
                    const { id } = order
                    return (
                      <tr key={order.id} onClick={() => { handleClick(id) }}>
                        <td>{index + 1}</td>
                        <td>{order.orderDate} at {order.orderTime}</td>
                        <td>{order.id}</td>
                        <td>{order.orderAmount}</td>
                        <td>
                          <p className={order.orderState !== "deliver" ? `${styles.pending}` : `${styles.delivered}`}>
                            {order.orderState}
                          </p>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>)}
          </div>
        </>
      </div>
    </section>
  )
}

export default OrderHistory