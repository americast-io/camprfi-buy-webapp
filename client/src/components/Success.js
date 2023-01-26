import { useEffect, useState } from "react";
import PaymentForm from "../components/payment-form/payment-form.component";

import ProductCard from "../components/product-card/product-card.component";
import CardIcon from "../images/credit-card.svg";
import {
    getDeviceStatusByIccid,
    pauseDevice,
    unPauseDeviceWithOffer,
} from "../services/InternalApiService";

const order = {

    productId: "57348757345",
    firstName: "Front",
    lastName: "End 2",
    email: "fromfrontend",
    // device,
};

export const Success = (props) => {
    const [deviceStatus, setDeviceStatus] = useState('inactive');
    const [error, setError] = useState('');

    // get device status using iccid
    useEffect(() => {
        console.log("in use effect");

        async function fetchData() {

            try {

                const orderResponse = await fetch("http://localhost:8000/api/orders", {
                    method: "post",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(order),
                }).then((res) => res.json());

                // const deviceStatusRes = await fetch('http://localhost:8000/api/orders').then(res => res.json());
                const deviceStatusRes = await getDeviceStatusByIccid();

                console.log(deviceStatusRes)



                // check if device is active and pause it, then wait and upause it with an offer customer bought
                if (deviceStatusRes.message.webStatus === 'active') {
                    console.log('in if')
                    const devicePauseInfo = await pauseDevice();
                    console.log(devicePauseInfo)

                    await timeout(30000);

                    const deviceStatusResAfterPausing = await getDeviceStatusByIccid();
                    console.log(deviceStatusResAfterPausing)

                    
                    
                    if (deviceStatusResAfterPausing.message.webStatus === 'suspended') {
                        try{
                        const deviceUnpauseInfo = await unPauseDeviceWithOffer();
                    
                        console.log(deviceUnpauseInfo)
                        if (deviceUnpauseInfo.success === true) {
                            await timeout(60000);
                            const res2 = await getDeviceStatusByIccid();
                            console.log(res2)
                            if(res2.message.webStatus === 'active')
                            setDeviceStatus(res2.message.webStatus)
                        }else{
                            setError('Something went wrong')
    
                        }

                    }catch(error){
                        console.log(error)
                    }

                    }

                }
                if (deviceStatusRes.message.webStatus === 'suspended') {
                    console.log('in else')
                    console.log('about to call unpause')
                    const deviceUnpauseInfo = await unPauseDeviceWithOffer();
                    
                    console.log(deviceUnpauseInfo)
                    if (deviceUnpauseInfo.success === true) {
                        setDeviceStatus('active')
                    }else{
                        setError('Something went wrong')

                    }
                }

            } catch (error) {
                console.log(error)
            }

        }
        fetchData()
    }, []);

    function timeout(delay) {
        return new Promise( res => setTimeout(res, delay) );
    }


    return (
        <div>
            <h2>Thank you for your purchase from not custom</h2>

            {  error? <p>{error}</p>: <p>Your device status is {deviceStatus} </p>}


        </div>
    );
};

export default Success;
