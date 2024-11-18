import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export const API_BASE_URL = process.env.EXPO_PUBLIC_BASE_API_URL || "https://tots.literesults.net/api";
let TOKEN = '';
const getToken = async () => {
  const res = await AsyncStorage.getItem("APPTOKEN");
  if (!res) {
    return null;
  }
  TOKEN = `Bearer ${res}`;
  return TOKEN;
};

const timeoutConfig = {
  timeout: 30000,
  timeoutErrorMessage: "Server taking too long to respond. Try again.",
};

export const apiWithOutAuth = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    'Cache-Control': 'no-cache',
    'Pragma': 'no-cache',
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  ...timeoutConfig,
});


export const apiWithAuth = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    'Cache-Control': 'no-cache',
    'Pragma': 'no-cache',
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  ...timeoutConfig,
});


apiWithAuth.interceptors.request.use(
  async (config) => {
    const token = await getToken(); 
    if (token) {
      config.headers['Authorization'] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const getApiResponse = (data) => {
  return {
    status: true,
    data: data.data,
  };
};

export const getErrorResponse = (error) => {
  if (error.response.status === 401) {

  }
  return {
    status: false,
    data: error?.response?.data,
  };
};
