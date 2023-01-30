import React from "react";
import "./device-info.css";

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import { getDeviceById } from "../../services/InternalApiService";
import { getDeviceDetails, clearErrors } from "../../actions/deviceActions";

import MetaData from "../layout/MetaData";

// component to display device details 
export const DeviceInfo = (props) => {
    // const { name } = props;
    // const [device, setDevice] = useState(null);


    // in state.deviceDetails, deviceDetails came from store.js when we created combinedReducer. 
    const { loading, error, device } = useSelector(state => state.deviceDetails)

    const { id } = useParams();

    const dispatch = useDispatch();

    useEffect(() => {

        dispatch(getDeviceDetails(id))

        // getDeviceById(id)
        //     .then((data) => {
        //         console.log(data);
        //         setDevice(data);
        //     })
        //     .catch((error) => {
        //         console.log(error);
        //     });
    }, [dispatch]);

    return (

        <div>
            <div className="w-50 p-4 rounded mx-auto">
                <h4 className="purple-font-underlined">DEVICE</h4>
            </div>
            <div className="w-50 p-4 rounded mx-auto device">
                <h4 className="white-font">{device.name}</h4>
            </div>

        </div>



    )

};

export default DeviceInfo;
