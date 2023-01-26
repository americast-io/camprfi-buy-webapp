import { useEffect, useState } from "react";

import { getDeviceStatusByIccid } from "../services/InternalApiService";

import { getAllProducts } from "../services/InternalApiService";

import ProductCard from "../components/product-card/product-card.component";


export const SuccessNotCustom = (props) => {

  const [deviceStatus, setDeviceStatus] = useState('');
  const [products, setProducts] = useState([]);

  useEffect(() => {
    console.log("in use effect");
    getAllProducts()
        .then((data) => {
            console.log("data " + data);
            console.log(data);
            console.log(data.data[0].default_price);
            console.log(data.data[0].description);
            setProducts(data.data);
            console.log("set products data");
        })
        .catch((error) => {
            console.log(error);
        });
}, []);

//   useEffect(() => {
//     console.log("in success page use effect");
//     getDeviceStatusByIccid()
//         .then((data) => {
//             console.log("data " + data);
//             console.log(data);
//             setDeviceStatus(data.webStatus);
//             console.log("set device status");
//         })
//         .catch((error) => {
//             console.log(error);
//         });
// }, []);

  // const order = {
  //   orderNumber: "123456",
  //   productId: "57348757345",
  //   amount: "Front",
  //   priceId: "fdsjhafjjfdkfs"
    // device,
// };

// const response2 = fetch("http://localhost:8000/api/orders", {
//                     method: "post",
//                     headers: {
//                         "Content-Type": "application/json",
//                     },
//                     body: JSON.stringify(order),
//                 }).then((res) => res.json());

  return (
    <div>
      <h1>Success</h1>
      <h2>Thank you for your purchase from not custom</h2>

      <div className="products-container">
      {products.map((product) => (
          <ProductCard key={product.id} product={product} />
      ))}
  </div>

  <div className="products-container">
      {products
          .filter((product) => product.name.includes("10Gb for 1 Day"))
          .map((product) => (
              <ProductCard key={product.id} product={product} />
          ))}
  </div>

     
    </div>
  );
};

export default SuccessNotCustom;
