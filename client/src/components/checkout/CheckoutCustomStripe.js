import { useState, Fragment, useRef } from 'react';

import { Link } from "react-router-dom";

import { PaymentForm } from '../../components/payment-form/payment-form.component'

import CardIcon from "../../images/credit-card.svg";
import './checkout.css';

// Checkout component that displays plan name, price (from props) and has a buy button which displays the Stripe payment form. 
export const CheckoutCustomStripe = (props) => {
    const [components, setComponents] = useState([]); 
    const { nickname, price, priceId } = props;
    const [showPayment, setShowPayment] = useState(false);
    const scrollTo = useRef();

    function addComponent() { 
    
        setComponents([...components, "Payment Component"]) 
      } 

      const handleClick = () => {
        setShowPayment(!showPayment)
        const element = document.getElementById('section-1');
        if (element) {
          element.scrollIntoView({ block: 'end' });
        }
      }

      let content =  <button
      onClick={handleClick}
          className="checkout-button"
      >
          <div className="grey-circle">
              <div className="purple-circle">
                  <img className="icon" src={CardIcon} alt="credit-card-icon" />
              </div>
          </div>
          <div className="text-container">
          <p className="text">Checkout</p>
          </div>
      </button>;
      if(showPayment) {
        content = <PaymentForm price={price} nickname={nickname}/>
      }

    return (
        <Fragment>
        <div className="checkout">
            <p className="checkout-title purple-font">{nickname}</p>
            <h1 className="checkout-price purple-font">{price.toLocaleString("en-us", {style:"currency", currency:"USD"})}</h1>
            <div id="section-1">{content}</div>
        </div>
        </Fragment>
    );
};

export default CheckoutCustomStripe;