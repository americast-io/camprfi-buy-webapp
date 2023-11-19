
import axios from 'axios';

const http = axios.create({
  baseURL: 'https://api.camprfi.com/api/v1',
  // baseURL: 'http://localhost:8000/api/v1',
});

export const getAllDevices = async () => {
  const res = await http.get('/devices');
  return res.data;
};

export const getDeviceById = async (id) => {
  const res = await http.get(`/devices/${id}`);
  return res.data;
};

export const getDeviceByKeyword = async (keyword) => {
  const res = await http.get(`/devices?keyword=${keyword}`);
  return res.data;

};

export const getAllProducts = async () => {
  const res = await http.get('/products');
  return res.data;
};

export const getPriceById = async (id) => {
  const res = await http.get(`/prices/${id}`);
  return res.data;
};

export const getAllPrices = async () => {
  const res = await http.get('/prices');
  return res.data;
};

// ----------- ORDER API --------------

export const createOrder = async (data, config) => {
  const res = await http.post('/orders', data, config);
  return res.data;
}

export const getDeviceStatusByIccid = async (iccid) => {
  const res = await http.get(`/orders/details/${iccid}`);
  return res.data;

};

export const pauseDevice = async (iccid) => {
  const res = await http.post(`/orders/pause/${iccid}`);
  return res.data;

};
// MAIN METHOD unpause device with offer with timer
export const unPauseDeviceWithOffer = async (data) => {
  const res = await http.post('/orders/upausejob/schedule', data);
  return res.data;

};

export const processOrder = async () => {
  const res = await http.post('/orders/process');
  return res.data;

};


// ------------- PAYMENT API ---------------

// request to create Stripe payment intent
export const createStripePaymentIntent = async (data) => {
  const res = await http.post('/payment/process', data);
  return res.data;
}