import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from 'react-redux';
import { getDeviceByNumber } from '../actions/deviceActions';


// Page where user enters their device number. Also our home page. 
export const SearchDevice = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, devices, error, deviceId } = useSelector(state => state.devices)
  const [deviceNumber, setDeviceNumber] = useState("");
  const [errors, setErrors] = useState(null);
  

  // Need use effect here since after user clicks on the button, it should redirect to the plan page but deviceId is not set yet. This needs to be fixes since now user cannot go back to the search page. 
  useEffect(() => {
    if(deviceId) {
      navigate(`/devices/${deviceId}`);
    }
  }, [deviceId]);

  // Form validation on the front end side.
  function validateForm(deviceNumber) {
    if (!deviceNumber.trim()) {
      return "Device number is required";
    } else if (deviceNumber.length < 6) {
      return "Device number needs to be 6 characters or more";
    }
    return null;
  }

  const handleDeviceSubmit = (event) => {
    event.preventDefault();
    const resultError = validateForm(deviceNumber);

    if (resultError !== null) {
      setErrors(resultError);
      return;
    }

    dispatch(getDeviceByNumber(deviceNumber));
    
  };

  return (
    <div className="search-device-container">
      <div className="w-50 p-4 rounded mx-auto shadow">
        <form onSubmit={(e) => handleDeviceSubmit(e)}>
          <div className="form-group">
            <label className="h3">Enter Device Number:</label>
            {errors && <span style={{ color: "red" }}> {errors}</span>}
            <input
              onChange={(event) => {
                setDeviceNumber(event.target.value);
              }}
              type="text"
              className="form-control search-box"
              placeholder="XXXXXX"
            />
          </div>
          <button className="btn">Choose a plan!</button>
        </form>
      </div>
    </div>
  );
};

export default SearchDevice;
