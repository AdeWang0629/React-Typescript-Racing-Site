import axios from 'axios';
import constants from './constants';
import { getToken } from '../routes/helpers';

const jwtToken = getToken();

const axiosClient = axios.create();

axiosClient.defaults.baseURL = constants.HOST_URL;

// axiosClient.defaults.headers = constants.headers;

// To share cookies to cross site domain, change to true.
axiosClient.defaults.withCredentials = false;

axiosClient.defaults.headers.common['Authorization'] = `Bearer ${jwtToken}`;

export function getRequest(URL: string) {
  return axiosClient.get(`/${URL}`).then(response => response);
}

export function getSpecificRequest(URL: string, payload: any) {
  return axiosClient.get(`/${URL}/${payload}`).then(response => response);
}

export const postRequest = (URL: string, payload: any) : Promise<any> => {
  return axiosClient.post(`/${URL}`, payload).then(response => response);
}

export const putRequest = (URL: string, payload: any) : Promise<any> => {
  return axiosClient.put(`/${URL}/${payload.id}`, payload.data).then(response => response);
}

export function patchRequest(URL: any, payload: any) {
  return axiosClient.patch(`/${URL}`, payload).then(response => response);
}

export function deleteRequest(URL: string, payload: any) {
  return axiosClient.delete(`/${URL}/${payload}`).then(response => response);
}

export default axiosClient;