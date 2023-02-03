import {
    useStripe,
    useElements,
    CardNumberElement,
    CardExpiryElement,
    CardCvcElement,
} from "@stripe/react-stripe-js";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
    createStripePaymentIntent,
    createOrder
 } from "../../services/InternalApiService";
import "./payment-form.css";

const options = {
    style: {
        base: {
            color: "#32325d",
            fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
            fontSmoothing: "antialiased",
            fontSize: "16px",
            "::placeholder": {
                color: "#aab7c4",
            },
        },
        invalid: {
            color: "#fa755a",
            iconColor: "#fa755a",
        },
    },
};

// stripe payment form. 3rd page.
export const PaymentForm = () => {
    const navigate = useNavigate();
    const stripe = useStripe();
    const elements = useElements();
    // const amount = useSelector('amount');
    const amount = "70";
    const [userName, setUserName] = useState("");
    const [isProcessingPayment, setIsProcessingPayment] = useState(false);
    const order = {
        orderNumber: "123456",
        productId: "57348757345",
        firstName: "Front",
        lastName: "End",
        email: "fromfrontend",
        // device,
    };

    const paymentHandler = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        setIsProcessingPayment(true);

        // amount should come from Redux store
        const response = await createStripePaymentIntent({ amount: amount * 100 });
        const { client_secret } = response;
        const paymentResult = await stripe.confirmCardPayment(client_secret, {
            payment_method: {
                card: elements.getElement(CardNumberElement),
                billing_details: {
                    name: userName,
                },
            },
        });

        setIsProcessingPayment(false);

        if (paymentResult.error) {
            alert(paymentResult.error);
        } else {
            if (paymentResult.paymentIntent.status === "succeeded") {
                // alert("Payment Successful");
                // navigate('/success');

                order.paymentInfo = {
                    id: paymentResult.paymentIntent.id,
                    status: paymentResult.paymentIntent.status,
                };

                const response2 = await createOrder(order);

                navigate("/success");
            }
        }
    };

    return (
        <div>
            <div className="row wrapper">
                <div className="col-12 col-lg-5">
                    <div className="container p-0">
                        <div className="card px-4">
                            <form onSubmit={paymentHandler}>
                                <p className="h8 py-3">Payment Details</p>
                                <div className="row gx-3">
                                    <div className="col-12">
                                        <div className="d-flex flex-column">
                                            <label className="text mb-1">Person Name</label>
                                            <input
                                                onChange={(event) => {
                                                    setUserName(event.target.value);
                                                }}
                                                className="form-control mb-3"
                                                type="text"
                                                placeholder="Enter your name"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="d-flex flex-column">
                                            <div className="form-group">
                                                <label htmlFor="card_num_field" className="text mb-1">
                                                    Card Number
                                                </label>
                                                <CardNumberElement
                                                    type="text"
                                                    id="card_num_field"
                                                    className="form-control mb-3"
                                                    options={options}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="d-flex flex-column">
                                            <div className="form-group">
                                                <label htmlFor="card_exp_field" className="text mb-1">
                                                    Card Expiry
                                                </label>
                                                <CardExpiryElement
                                                    type="text"
                                                    id="card_exp_field"
                                                    className="form-control mb-3"
                                                    options={options}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="d-flex flex-column">
                                            <div className="form-group">
                                                <label htmlFor="card_cvc_field" className="text mb-1">
                                                    Card CVC
                                                </label>
                                                <CardCvcElement
                                                    type="text"
                                                    id="card_cvc_field"
                                                    className="form-control mb-3 pt-2"
                                                    options={options}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <button
                                            id="pay_btn"
                                            type="submit"
                                            className="payment  btn btn-block py-3 btn-primary mb-3"
                                        >
                                            <span className="ps-3">Pay</span>
                                            <span className="fas fa-arrow-right"></span>
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentForm;
