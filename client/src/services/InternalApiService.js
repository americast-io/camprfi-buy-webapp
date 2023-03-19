
import axios from 'axios';

const http = axios.create({
  baseURL: 'https://api.camprfi.com/api',
  // baseURL: 'http://localhost:8000/api',
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

// will need ICCid 
export const getDeviceStatusByIccid = async () => {
  const res = await http.get('/orders');
  return res.data;

};

export const pauseDevice = async () => {
  const res = await http.post('/orders/pause');
  return res.data;

};

export const unPauseDeviceWithOffer = async () => {
  const res = await http.post('/orders/unpause');
  return res.data;

};


// ------------- PAYMENT API ---------------

// request to create Stripe payment intent
export const createStripePaymentIntent = async (data) => {
  const res = await http.post('/payment/process', data);
  return res.data;
}