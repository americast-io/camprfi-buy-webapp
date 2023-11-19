import {
    useStripe,
    useElements,
    CardNumberElement,
    CardExpiryElement,
    CardCvcElement,
} from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createStripePaymentIntent, unPauseDeviceWithOffer } from "../../services/InternalApiService";
import "./payment-form.css";
import { createOrderAction, clearErrors } from "../../actions/orderActions";

const options = {
    showIcon: true,
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

// Stripe payment form. Sends payment to Stripe and creates order.
export const PaymentForm = ({ price, nickname, priceId }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const stripe = useStripe();
    const elements = useElements();
    const amount = price * 100;
    const [userFirstName, setUserFirstName] = useState("");
    const [userLastName, setUserLastName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [isProcessingPayment, setIsProcessingPayment] = useState(false);
    const [firstNameError, setFirstNameErrors] = useState(null);
    const [lastNameErrors, setLastNameErrors] = useState(null);
    const [emailErrors, setEmailErrors] = useState(null);
    // in state.deviceDetails, deviceDetails came from store.js when we created combinedReducer.
    const { loading, device } = useSelector((state) => state.devices);
    const { error } = useSelector((state) => state.order);
    const order = {
        device,
    };

    // console.log('nickname', nickname)
    // console.log('priceId', priceId)

    useEffect(() => {
        const element = document.getElementById("section-1");
        if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "end" });
        }
    }, []);

    // Form validation on the front end side.
    function validateForm(element, message1, message2) {
        if (!element.trim()) {
            return message1;
        } else if (element.length < 2) {
            return message2;
        }
        return null;
    }

    const paymentHandler = async (e) => {
        e.preventDefault();

        const resultError = validateForm(
            userFirstName,
            "First Name is Required",
            "First Name must be 2 characters or more"
        );

        if (resultError !== null) {
            setFirstNameErrors(resultError);
            return;
        }

        const resultError2 = validateForm(
            userLastName,
            "Last Name is Required",
            "Last Name must be 2 characters or more"
        );

        if (resultError2 !== null) {
            setLastNameErrors(resultError2);
            return;
        }

        const resultError3 = validateForm(
            userEmail,
            "Email is Required",
            "Email must be 2 characters or more"
        );

        if (resultError3 !== null) {
            setEmailErrors(resultError3);
            return;
        }

        if (!stripe || !elements) {
            return;
        }

        setIsProcessingPayment(true);

        const response = await createStripePaymentIntent({
            amount: amount,
            description: `device id: ${device.deviceNumber}, plan: ${nickname}`,
        });
        const { client_secret } = response;
        const paymentResult = await stripe.confirmCardPayment(client_secret, {
            payment_method: {
                card: elements.getElement(CardNumberElement),
                billing_details: {
                    name: `${userFirstName} ${userLastName}`,
                },
            },
        });

        setIsProcessingPayment(false);

        if (paymentResult.error) {
            alert(paymentResult.error);
        } else {
            if (paymentResult.paymentIntent.status === "succeeded") {
                order.paymentInfo = {
                    id: paymentResult.paymentIntent.id,
                    status: paymentResult.paymentIntent.status,
                    priceId: priceId,
                };

                order.firstName = userFirstName;
                order.lastName = userLastName;
                order.email = userEmail;
                // const response2 = await createOrder(order);
                dispatch(createOrderAction(order));

                console.log("iccid", device.iccid);
                console.log("priceId", order.paymentInfo.priceId);

                const data = {
                    "priceId": order.paymentInfo.priceId,
                    "iccid": device.iccid,
                }
                const deviceUnpauseInfo = await unPauseDeviceWithOffer(data);



                navigate("/success");
            }
        }
    };

    return (
        <div id="section-1">
            <div className="">
                <div className="mx-auto col-12 col-lg-11">
                    <div id="section-2" className="container p-0">
                        <div className="card px-4">
                            <form onSubmit={paymentHandler}>
                                <p className="h8 py-3">Payment Details</p>
                                <div className="row gx-3">
                                    <div className="col-6">
                                        <div className="d-flex flex-column">
                                            <label className="text mb-1">First Name</label>
                                            {firstNameError && (
                                                <span style={{ color: "red" }}> {firstNameError}</span>
                                            )}
                                            <input
                                                onChange={(event) => {
                                                    setUserFirstName(event.target.value);
                                                }}
                                                className="form-control mb-3"
                                                type="text"
                                                placeholder="Enter your first name"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="d-flex flex-column">
                                            <label className="text mb-1">Last Name</label>
                                            {lastNameErrors && (
                                                <span style={{ color: "red" }}> {lastNameErrors}</span>
                                            )}
                                            <input
                                                onChange={(event) => {
                                                    setUserLastName(event.target.value);
                                                }}
                                                className="form-control mb-3"
                                                type="text"
                                                placeholder="Enter your last name"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="d-flex flex-column">
                                            <label className="text mb-1">Email</label>
                                            {emailErrors && (
                                                <span style={{ color: "red" }}> {emailErrors}</span>
                                            )}
                                            <input
                                                onChange={(event) => {
                                                    setUserEmail(event.target.value);
                                                }}
                                                className="form-control mb-3"
                                                type="email"
                                                placeholder="Enter your email"
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
                                            disabled={isProcessingPayment}
                                            id="pay_btn"
                                            type="submit"
                                            className="payment  btn btn-block py-3 btn-primary mb-3"
                                        >
                                            <span className="ps-3">
                                                Pay -{" "}
                                                {price.toLocaleString("en-us", {
                                                    style: "currency",
                                                    currency: "USD",
                                                })}
                                            </span>
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
