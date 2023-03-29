import {
    FIND_DEVICE_REQUEST,
    FIND_DEVICE_SUCCESS,
    FIND_DEVICE_FAIL,
    DEVICE_DETAILS_REQUEST,
    DEVICE_DETAILS_SUCCESS,
    DEVICE_DETAILS_FAIL,
    CLEAR_ERRORS
} from '../constants/deviceConstants'

export const deviceReducer = (state = { devices: [] }, action) => {
    switch (action.type) {
        case FIND_DEVICE_REQUEST:
            return {
                loading: true,
                devices: []
            }

        case FIND_DEVICE_SUCCESS:
            return {
                loading: false,
                devices: action.payload,
                device: action.payload[0],
                deviceId: action.payload[0]._id,
                deviceNumber: action.payload[0].deviceNumber
            }

        case FIND_DEVICE_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }




        default:
            return state;
    }
}

export const deviceDetailsReducer = (state = { device: {} }, action) => {
    switch (action.type) {

        case DEVICE_DETAILS_REQUEST:
            return {
                ...state,
                loading: true
            }

        case DEVICE_DETAILS_SUCCESS:
            return {
                loading: false,
                device: action.payload
            }

        case DEVICE_DETAILS_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }


        default:
            return state
    }
}