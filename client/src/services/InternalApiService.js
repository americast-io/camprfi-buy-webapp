
import axios from 'axios';

const http = axios.create({
  // baseURL: 'http://34.239.108.218/api',
  baseURL: 'http://localhost:8000/api',
});

export const getAllDevices = async () => {
  console.log('calling getAllDevices')
  const res = await http.get('/devices');
  return res.data;
};

export const getDeviceById = async (id) => {
  const res = await http.get(`/devices/${id}`);
  return res.data;
};

export const getDeviceByKeyword = async (keyword) => {
  const res = await http.get(`/devices?keyword=${keyword}`);
  console.log(res.data)
  return res.data;

};

export const getAllProducts = async () => {
  console.log('calling getAllProducts')
  const res = await http.get('/products');
  return res.data;
};

export const getPriceById = async (id) => {
  console.log('calling getPriceById')
  const res = await http.get(`/prices/${id}`);
  return res.data;
};

export const getAllPrices = async () => {
  console.log('calling getAllPrices')
  const res = await http.get('/prices');
  return res.data;
};

// ----------- ORDER API --------------

// will need ICCid 
export const getDeviceStatusByIccid = async () => {
  console.log('calling getDeviceStatusByIccid');
  const res = await http.get('/orders');
  return res.data;

};

export const pauseDevice = async () => {
  console.log('calling pauseDevice');
  const res = await http.post('/orders/pause');
  return res.data;

};

export const unPauseDeviceWithOffer = async () => {
  console.log('calling unPauseDeviceWithOffer');
  const res = await http.post('/orders/unpause');
  return res.data;

};