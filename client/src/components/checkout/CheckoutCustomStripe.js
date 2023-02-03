import { Link } from "react-router-dom";

import CardIcon from "../../images/credit-card.svg";
import './checkout.css';

// Checkout component that displays plan name, price (from props) and has a buy button which redirects to the Stripe payment form. 
export const CheckoutCustomStripe = (props) => {
    const { nickname, price, priceId } = props;

    return (
        <div className="checkout">
            <p className="checkout-title purple-font">{nickname}</p>
            <h1 className="checkout-price purple-font">${price}</h1>
            <button
                className="checkout-button"
            >
                <div className="grey-circle">
                    <div className="purple-circle">
                        <img className="icon" src={CardIcon} alt="credit-card-icon" />
                    </div>
                </div>
                <div className="text-container">
                    <Link to={`/payment`} style={{ textDecoration: 'none' }}>
                        <p className="text">Buy</p>
                    </Link>
                </div>
            </button>
        </div>
    );
};

export default CheckoutCustomStripe;