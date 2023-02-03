import React from "react";
import "./device-info.css";

import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import { getDeviceDetails } from "../../actions/deviceActions";


// component to display device details. Used on the second page. 
export const DeviceInfo = () => {

    // in state.deviceDetails, deviceDetails came from store.js when we created combinedReducer. 
    const { loading, error, device } = useSelector(state => state.deviceDetails)

    const { id } = useParams();

    const dispatch = useDispatch();

    useEffect(() => {

        dispatch(getDeviceDetails(id))

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
