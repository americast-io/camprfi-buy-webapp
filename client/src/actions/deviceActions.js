import {
    FIND_DEVICE_REQUEST,
    FIND_DEVICE_SUCCESS,
    FIND_DEVICE_FAIL,
    DEVICE_DETAILS_REQUEST,
    DEVICE_DETAILS_SUCCESS,
    DEVICE_DETAILS_FAIL,
    CLEAR_ERRORS
} from '../constants/deviceConstants'

import {
    getDeviceByKeyword,
    getDeviceById,
} from "../services/InternalApiService";


export const getDeviceByNumber = (deviceNumber) => async (dispatch) => {
    try{
        console.log("in get device dispatch")
        dispatch({ type: FIND_DEVICE_REQUEST })

        const data = await getDeviceByKeyword(deviceNumber)

        console.log('dispatch data', data)

        dispatch({
            type: FIND_DEVICE_SUCCESS,
            payload: data
        })

    }catch(error) {
        dispatch({
            type: FIND_DEVICE_FAIL,
            payload: error.response.data.message
        })
    }
}

// Clear errors 
export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS

    })
}


export const getDeviceDetails = (id) => async (dispatch) => {
    try{
        console.log("in get device details dispatch")
        dispatch({ type: DEVICE_DETAILS_REQUEST })

        const data = await getDeviceById(id)

        console.log('dispatch data', data)

        dispatch({
            type: DEVICE_DETAILS_SUCCESS,
            payload: data
        })

    }catch(error) {
        dispatch({
            type: DEVICE_DETAILS_FAIL,
            payload: error.response.data.message
        })
    }
}
