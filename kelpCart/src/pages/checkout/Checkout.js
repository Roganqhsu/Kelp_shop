import React, { useState, useEffect } from 'react'
// import { loadStripe } from '@stripe/stripe-js';
// import { Elements } from '@stripe/react-stripe-js';

import CheckoutForm from "../../components/checkoutForm/CheckoutForm";

import { useDispatch, useSelector } from 'react-redux';
// slice
import {
  selectCartItems,
  CALCULATE_SUBTOTAL,
  CALCULATE_TOTAL_QUANTITY,
  selectCartTotalAmount
} from "../../redux/slice/cartSlice";
import { selectEmail } from "../../redux/slice/authSlice";
// import {
//   selectBillingAddress,
//   selectShippingAddress
// }
//   from '../../redux/slice/checkoutSlice';

// const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK);

const Checkout = () => {
  // 本地端變數
  const [clientSecret, setClientSecret] = useState('');
  const [message, setMessage] = useState('Initializing checkout...');
  // 引用函式
  const dispatch = useDispatch();
  // select
  const cartItems = useSelector(selectCartItems);
  const cartTotalAmount = useSelector(selectCartTotalAmount);
  const Email = useSelector(selectEmail);
  // const billingAddress = useSelector(selectBillingAddress);
  // const shippingAddress = useSelector(selectShippingAddress);
  // useEffect(() => {
  //   dispatch(CALCULATE_SUBTOTAL());
  //   dispatch(CALCULATE_TOTAL_QUANTITY());

  // }, []
  // );
  const description = `eShop payment: email: ${Email}, Amount: ${cartTotalAmount}`
  // useEffect(() => {
  //   // Create PaymentIntent as soon as the page loads
  //   fetch("/create-payment-intent", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({
  //       items: cartItems,
  //       userEmail: Email,
  //       shipping: shippingAddress,
  //       billing: billingAddress,
  //       description,
  //     }),
  //   })
  //     .then((res) => {
  //       if (res.ok) {
  //         return res.json()
  //       }
  //       return res.json().then((json) => Promise.reject(json))
  //     })
  //     .then((data) => {
  //       setClientSecret(data.clientSecret)
  //     })
  //     .catch((error) => {
  //       setMessage("error")
  //       console.log(error);
  //     })
  // }, []);
  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };
  return (
    <>
      {/* <CheckoutForm options={options} stripe={stripePromise} /> */}

      {/* <Elements>
        <CheckoutForm options={options} stripe={stripePromise} />
      </Elements> */}
      {/* <section>
        <div className="container">
          {!clientSecret && <h3>{message}</h3>}
        </div>
      </section>
      {clientSecret && (
        <Elements>
          <CheckoutForm options={options} stripe={stripePromise} />
        </Elements>
      )} */}
    </>
  )
}

export default Checkout