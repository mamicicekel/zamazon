
import axios from 'axios';
import { Env } from '@env';

export const api = axios.create({
  baseURL: Env.API_URL, // API'nin temel URL'si
  timeout: 10000, // İsteklerin maksimum süresi (ms cinsinden)
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchSmartPhones = async () => {
  try {
    const response = await api.get('/products/category/smartphones');
    return response.data.smartphones;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error; // Hata durumunda çağıran koda hata bilgisini iletmek için hatayı tekrar fırlat
  }
};

export const fetchProducts = async () => {
  try {
    const response = await api.get('/products');
    return response.data.products;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error; // Hata durumunda çağıran koda hata bilgisini iletmek için hatayı tekrar fırlat
  }
};