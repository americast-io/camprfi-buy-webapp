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


export const Success = (props) => {
    const [deviceStatus, setDeviceStatus] = useState('inactive');
    const [error, setError] = useState('');
    

     // in state.deviceDetails, deviceDetails came from store.js when we created combinedReducer. 
     const { loading, devices } = useSelector(state => state.devices)
     const { order } = useSelector(state => state.order)
     console.log('Device', devices)
     console.log('Order', order)
    //  console.log('PriceId', order.paymentInfo.priceId)


    // get device status using iccid
    useEffect(() => {
        // console.log("in use effect");
        // console.log(devices[0].iccid)
        // console.log(order.paymentInfo.priceId)

        // const data = {
        //     "priceId": order.paymentInfo.priceId,
        //     "iccid": devices[0].iccid,
        // }
        // unPauseDeviceWithOffer(data).then(res => console.log(res));

    //     async function fetchData() {

    //     // move the fetch device status to the device details page and save the status in the redux store,
    //     // then check status here and call appropriate api pause/unpause or just unpause
    //         // make sure device is paused before unpausing it
    //         try {

    //             // const deviceStatusRes = await fetch('http://localhost:8000/api/orders').then(res => res.json());
    //             const deviceStatusRes = await getDeviceStatusByIccid(devices[0].iccid);

    //             console.log(deviceStatusRes)



    //             // check if device is active and pause it, then wait and upause it with an offer customer bought
    //             if (deviceStatusRes.message.webStatus === 'active') {
    //                 console.log('Device is active, about to call pause')
    //                 const devicePauseInfo = await pauseDevice(devices[0].iccid);
    //                 console.log('Device status after calling pause', devicePauseInfo)

    //                 await timeout(30000);

    //                 const deviceStatusResAfterPausing = await getDeviceStatusByIccid(devices[0].iccid);
    //                 console.log('Confirm device status by calling device status by iccid', 
    //                             deviceStatusResAfterPausing)

    //                 console.log('data priceId', order.paymentInfo.priceId)
    //                 const data = {
    //                     "priceId": order.paymentInfo.priceId,
    //                     "iccid": devices[0].iccid,
    //                 }
    //                 // console.log('data priceId', data.priceId)
    //                 if (deviceStatusResAfterPausing.message.webStatus === 'suspended') {
    //                     try{
    //                     const deviceUnpauseInfo = await unPauseDeviceWithOffer(data);
                    
    //                     console.log(deviceUnpauseInfo)
    //                     if (deviceUnpauseInfo.success === true) {
    //                         await timeout(60000);
    //                         const res2 = await getDeviceStatusByIccid();
    //                         console.log(res2)
    //                         if(res2.message.webStatus === 'active')
    //                         setDeviceStatus(res2.message.webStatus)
    //                     }else{
    //                         setError('Something went wrong')
    
    //                     }

    //                 }catch(error){
    //                     console.log(error)
    //                 }

    //                 }

    //             }
    //             else if (deviceStatusRes.message.webStatus === 'suspended') {
    //                 console.log('in else')
    //                 console.log('about to call unpause')
    //                 const data = {
    //                     "priceId": order.paymentInfo.priceId,
    //                     "iccid": devices[0].iccid,
    //                 }
    //                 const deviceUnpauseInfo = await unPauseDeviceWithOffer(data);
                    
    //                 console.log(deviceUnpauseInfo)
    //                 if (deviceUnpauseInfo.success === true) {
    //                     setDeviceStatus('active')
    //                 }else{
    //                     setError('Something went wrong')

    //                 }
    //             }

    //         } catch (error) {
    //             console.log(error)
    //         }

    //     }
    //     fetchData()
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
