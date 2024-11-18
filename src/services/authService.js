import axios from "axios";
import { apiWithAuth, apiWithOutAuth, getApiResponse, getErrorResponse } from "./httpService";

export const Appregister = (formData) => apiWithOutAuth.post("/register", formData).then(getApiResponse).catch(getErrorResponse);
export const Applogin = (formData) => apiWithOutAuth.post("/login", formData).then(getApiResponse).catch(getErrorResponse);
export const Appforgotten = (formData) => apiWithOutAuth.post("/recover/send_otp", formData).then(getApiResponse).catch(getErrorResponse);
export const AppVerifyOtp = (formData) => apiWithOutAuth.post("/recover/verify_otp", formData).then(getApiResponse).catch(getErrorResponse);
export const AppNewPassword = (formData) => apiWithOutAuth.post("/recover/create_new_password", formData).then(getApiResponse).catch(getErrorResponse);
export const addLocation = (formData) => apiWithAuth.post("app/onboarding/add_user_location", formData).then(getApiResponse).catch(getErrorResponse);




export const fetchCities = async (e, x) => {
    const data = await axios.post("https://countriesnow.space/api/v0.1/countries/state/cities", { "country": e, "state": x }).then(res => { return res })
    return data
}


export const fetchStates = async (e) => {
    const data = await axios.post("https://countriesnow.space/api/v0.1/countries/states", { "country": e }).then(res => { return res })
    return data
}


export const fetchCountry = async () => {
    const data = await axios.get("https://countriesnow.space/api/v0.1/countries/states").then(res => { return res })
    return data
}

// https://countriesnow.space/api/v0.1/countries/states




export const fetchPrefrence = () => apiWithAuth.post("/app/onboarding/fetch_app_preference").then(getApiResponse).catch(getErrorResponse);
export const updateUserPrefrence = (formData) => apiWithAuth.post("/app/onboarding/update_user_preference", formData).then(getApiResponse).catch(getErrorResponse);


