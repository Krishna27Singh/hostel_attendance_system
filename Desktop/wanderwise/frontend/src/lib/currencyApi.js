import axios from 'axios';

// Access the base URL from the .env file
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const fetchLatestRate = async (base = 'USD', symbols = 'INR') => {
  const response = await axios.get(`${API_BASE_URL}?base=${base}&symbols=${symbols}`);
  return response.data;
};

export const fetchHistoricalRate = async (date, base = 'USD', symbols = 'INR') => {
  const response = await axios.get(`${API_BASE_URL}?date=${date}&base=${base}&symbols=${symbols}`);
  return response.data;
};

export const fetchCurrencySymbols = async () => {
  const response = await axios.get(`${API_BASE_URL}/symbols`);
  return response.data;
};
