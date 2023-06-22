import { useEffect, useState, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ReactReduxContext } from 'react-redux'
import PaymentForm from "../payment-form/payment-form.component";
import MetaData from '../layout/MetaData'
import SuccessIcon from "../../images/order_success.png";

import {
    getDeviceStatusByIccid,
    pauseDevice,
    unPauseDeviceWithOffer,
} from "../../services/InternalApiService";

// const order = {

//     productId: "57348757345",
//     firstName: "Front",
//     lastName: "End 2",
//     email: "fromfrontend",
//     // device,
// };

export const Success = (props) => {
    const [deviceStatus, setDeviceStatus] = useState('inactive');
    const [error, setError] = useState('');
    

     // in state.deviceDetails, deviceDetails came from store.js when we created combinedReducer. 
     const { loading, devices } = useSelector(state => state.devices)
     console.log(devices)


    // get device status using iccid
    useEffect(() => {
        // console.log("in use effect");
        // console.log(device)

        // async function fetchData() {

        // move the fetch device status to the device details page and save the status in the redux store,
        // then check status here and call appropriate api pause/unpause or just unpause

        //     try {

        //         const orderResponse = await fetch("http://localhost:8000/api/orders", {
        //             method: "post",
        //             headers: {
        //                 "Content-Type": "application/json",
        //             },
        //             body: JSON.stringify(order),
        //         }).then((res) => res.json());

        //         // const deviceStatusRes = await fetch('http://localhost:8000/api/orders').then(res => res.json());
        //         const deviceStatusRes = await getDeviceStatusByIccid();

        //         console.log(deviceStatusRes)



        //         // check if device is active and pause it, then wait and upause it with an offer customer bought
        //         if (deviceStatusRes.message.webStatus === 'active') {
        //             console.log('in if')
        //             const devicePauseInfo = await pauseDevice();
        //             console.log(devicePauseInfo)

        //             await timeout(30000);

        //             const deviceStatusResAfterPausing = await getDeviceStatusByIccid();
        //             console.log(deviceStatusResAfterPausing)

                    
                    
        //             if (deviceStatusResAfterPausing.message.webStatus === 'suspended') {
        //                 try{
        //                 const deviceUnpauseInfo = await unPauseDeviceWithOffer();
                    
        //                 console.log(deviceUnpauseInfo)
        //                 if (deviceUnpauseInfo.success === true) {
        //                     await timeout(60000);
        //                     const res2 = await getDeviceStatusByIccid();
        //                     console.log(res2)
        //                     if(res2.message.webStatus === 'active')
        //                     setDeviceStatus(res2.message.webStatus)
        //                 }else{
        //                     setError('Something went wrong')
    
        //                 }

        //             }catch(error){
        //                 console.log(error)
        //             }

        //             }

        //         }
        //         if (deviceStatusRes.message.webStatus === 'suspended') {
        //             console.log('in else')
        //             console.log('about to call unpause')
        //             const deviceUnpauseInfo = await unPauseDeviceWithOffer();
                    
        //             console.log(deviceUnpauseInfo)
        //             if (deviceUnpauseInfo.success === true) {
        //                 setDeviceStatus('active')
        //             }else{
        //                 setError('Something went wrong')

        //             }
        //         }

        //     } catch (error) {
        //         console.log(error)
        //     }

        // }
        // fetchData()
    }, []);

    function timeout(delay) {
        return new Promise( res => setTimeout(res, delay) );
    }


    return (
        <Fragment>

            <MetaData title={'Order Success'} />

            <div className="row justify-content-center">
                <div className="col-6 mt-5 text-center">
                    <img className="my-5 img-fluid d-block mx-auto" src={SuccessIcon} alt="Order Success" width="200" height="200" />

                    <h2>Your Order has been placed successfully.</h2>

                </div>

            </div>
            <div className=" p-4 rounded mx-auto shadow">
                <h1>WiFi Name is {devices[0].wifiName}</h1>
                <h1>WiFi Password is {devices[0].wifiPassword}</h1>
            
            </div>

        </Fragment>
    );
};

export default Success;
