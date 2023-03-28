import React from "react";
import "./device-info.css";

import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import { getDeviceDetails } from "../../actions/deviceActions";

import { useSearchParams } from 'react-router-dom';
import { getDeviceByNumber } from '../../actions/deviceActions';


// component to display device details. Used on the second page. 
export const DeviceInfo = () => {

    // in state.deviceDetails, deviceDetails came from store.js when we created combinedReducer. 
    const { loading, error, devices, deviceId, deviceNumber } = useSelector(state => state.devices)

    const [searchParams] = useSearchParams();
  const keyword = searchParams.get("keyword");
 
    const { id } = useParams();

    const dispatch = useDispatch();

    useEffect(() => {

        // dispatch(getDeviceDetails('641cfd0f4d07cc989e99fa20'))
        // dispatch(getDeviceDetails(keyword))
        dispatch(getDeviceByNumber(keyword));

    }, [dispatch, keyword]);

    if (deviceId === null) {
        // display nothing until we have data.
        return null;
      }

    return (
        <div >
            <div className=" p-4 rounded mx-auto">
                <h4 className=" welcome purple-font-underlined">DEVICE</h4>
            </div>
            <div className=" p-4 rounded mx-auto device">
                <h4 className="white-font">{deviceNumber}</h4>
            </div>
        </div>
    )

};

export default DeviceInfo;
