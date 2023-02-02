import React, { useEffect, useState } from "react";
import styles from "./CheckoutForm.module.scss";
import { useNavigate } from "react-router-dom";
// components
import Card from "../card/Card";
import CheckoutSummary from "../checkoutSummary/CheckoutSummary"
// img
import SpinnerImg from "../../assets/spinner.jpg";
// firebase
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { db } from "../../firebase/config";
// redux
import { useSelector, useDispatch } from "react-redux";
// slice
import { selectUserID, selectEmail } from "../../redux/slice/authSlice";
import { selectCartTotalAmount, selectCartItems, CLEAR_CART } from "../../redux/slice/cartSlice";
import { selectShippingAddress } from "../../redux/slice/checkoutSlice";
// stripe
import {
    PaymentElement,
    LinkAuthenticationElement,
    useStripe,
    useElements
} from "@stripe/react-stripe-js";
const CheckoutForm = () => {
    // 本地端變數
    const stripe = useStripe();
    const elements = useElements();
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    // redux
    const userId = useSelector(selectUserID)
    const userEmail = useSelector(selectEmail)
    const cartTotalAmount = useSelector(selectCartTotalAmount)
    const cartItems = useSelector(selectCartItems)
    const shippingAddress = useSelector(selectShippingAddress);
    const dispatch = useDispatch()
    // navigation
    const navigate=useNavigate()
    useEffect(() => {
        if (!stripe) {
            return;
        }

        const clientSecret = new URLSearchParams(window.location.search).get(
            "payment_intent_client_secret"
        );

        if (!clientSecret) {
            return;
        }

    }, [stripe]);

    const saveOrder = () => {
       
        console.log("saveOrder");
        const today = new Date();
        const date = today.toDateString();
        const time = today.toLocaleTimeString();
        const orderConfig = {
            userId,
            userEmail,
            cartItems,
            shippingAddress,
            orderAmount: cartTotalAmount,
            orderDate: date,
            orderTime: time,
            orderState: "Order Place",
            createdAt: Timestamp.now().toDate(),
        }
        try {
            addDoc(collection(db, "order"), orderConfig );
            // 還原預設值
            dispatch(CLEAR_CART());
            console.log("saveOrder ok");
            navigate("/checkout-success");

        } catch (error) {
            console.log("addProductError" + error.message);
            console.log(error);
        }
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage(null)
        if (!stripe || !elements) {

            return;
        }

        setIsLoading(true);
        const confirmPayment = await stripe.confirmPayment({
            elements,
            confirmParams: {
                // Make sure to change this to your payment completion page
                // return_url: "http://localhost:3000/checkout-success",
            },
            redirect: "if_required"
        })
            .then((result) => {
                // ok-paymentIntent bad - error
                console.log("Payment");
                if (result.error) {
                    console.log(result.error.message);
                    setMessage(result.error.message);
                    return;
                }
                if (result.paymentIntent) {
                    if (result.paymentIntent.status === "succeeded") {
                        setIsLoading(false);
                        console.log("Payment success");
                        saveOrder()
                    }
                }
            });

        setIsLoading(false);
    };
    const paymentElementOptions = {
        layout: "tabs"
    }
    return (
        <section>
            <div className={`container ${styles.checkout}`}>
                <h2>Checkout</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <Card cardClass={styles.card}>
                            <CheckoutSummary />
                        </Card>
                    </div>
                    <div>
                        <Card cardClass={`${styles.card} ${styles.pay}`}>
                            <h3>Stripe Checkout</h3>
                            <PaymentElement id={styles["payment-element"]} />
                            <button
                                disabled={isLoading || !stripe || !elements}
                                id="submit"
                                className={styles.button}
                            >
                                <span id="button-text">
                                    {isLoading ? (
                                        <img
                                            src={SpinnerImg}
                                            alt="Loading..."
                                            style={{ width: "20px" }}
                                        />
                                    ) : (
                                        "Pay now"
                                    )}
                                </span>
                            </button>
                            {/* Show any error or success messages */}
                            {message && <div id={styles["payment-message"]}>{message}</div>}
                        </Card>
                    </div>
                </form>
            </div>
        </section>
    );
}
export default CheckoutForm;