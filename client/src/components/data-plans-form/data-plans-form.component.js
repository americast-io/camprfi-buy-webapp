import { useState, useEffect } from "react";
import { CheckoutCustomStripe } from "../checkout/CheckoutCustomStripe";

import {
  getAllPrices,
} from "../../services/InternalApiService";

// Component used on the 2nd page. Its a plans form and buy button.
export const DataPlansForm = (props) => {
  let [amountOfData, setAmountOfData] = useState("1");
  let [planDuration, setPlanDuration] = useState("1");
  const [priceId, setPriceId] = useState(null);
  const [price, setPrice] = useState("");
  const [prices, setPrices] = useState(null);
  const [errors, setErrors] = useState(null);
  const [filteredPrice, setFilteredPrice] = useState("");
  const [nickname, setNickname] = useState("");

  // get all the prices from Stripe account
  useEffect(() => {
    getAllPrices()
      .then((data) => {
        setPrices(data.data);
        const filteredPrices = data.data.filter((price) =>
          price.nickname.includes(`${amountOfData}Gb for ${planDuration} Day`)
        );
        setNickname(filteredPrices[0].nickname);
        setFilteredPrice(parseInt(filteredPrices[0].unit_amount) / 100);
        setPriceId(filteredPrices[0].id);
        setPrice(filteredPrices[0].unit_amount / 100);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleDataPlansSubmit = (event) => {
    const filteredPrices = prices.filter((price) =>
      price.nickname.includes(`${amountOfData}Gb for ${planDuration} Day`)
    );
    setNickname(filteredPrices[0].nickname);
    setFilteredPrice(filteredPrice);
    setPriceId(filteredPrices[0].id);
    setPrice(filteredPrices[0].unit_amount / 100);
  };

  return (
    <div>
    <div className="p-4">
      <div className="plan-div ">
        <h4 className="purple-font-underlined">PLAN</h4>
      </div>

      <div className="form-group">
        <label className="h6 purple-font">How much data do you need? </label>
        {errors?.amountOfData && (
          <span style={{ color: "red" }}> {errors?.amountOfData?.message}</span>
        )}
        <select
          onChange={(event) => {
            amountOfData = event.target.value;
            setAmountOfData(amountOfData);
            handleDataPlansSubmit(event);
          }}
          type="text"
          className="form-control"
        >
          <option value="1">1Gb</option>
          <option value="2">2Gb</option>
          <option value="4">4Gb</option>
          <option value="8">8Gb</option>
          <option value="10">10Gb</option>
          <option value="20">20Gb</option>
        </select>
      </div>

      <div className="form-group">
        <label className="h6 purple-font">Plan Duration </label>
        {errors?.amountOfData && (
          <span style={{ color: "red" }}> {errors?.amountOfData?.message}</span>
        )}
        <select
          onChange={(event) => {
            planDuration = event.target.value;
            setPlanDuration(planDuration);
            handleDataPlansSubmit(event);
          }}
          type="text"
          className="form-control"
        >
          <option value="1">1 Day</option>
          <option value="3">3 Days</option>
          <option value="7">1 Week</option>
        </select>
      </div>
      </div>

      <div className="products-container">
        <CheckoutCustomStripe
          nickname={nickname}
          price={price}
          priceId={priceId}
        ></CheckoutCustomStripe>
      </div>
    </div>
  );
};

export default DataPlansForm;
