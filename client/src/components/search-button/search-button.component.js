import "./hero.css";
import { Fragment } from "react";

import React from "react";


// Device search button from the 1st page. 
export const SearchButton = (props) => {
    const { enterDeviceNumber, searchButton } = props;

    return (
        <Fragment>
            <div className="enter-device-number-1 myriadpro-regular-normal-gray-15px">
                {enterDeviceNumber}
            </div>
            <img className="search-button-1" src={searchButton} alt="Search Button" />
        </Fragment>
    );
};

export default SearchButton;
