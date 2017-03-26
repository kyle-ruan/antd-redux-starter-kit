import { apiConfig } from '../configs';
import axios from 'axios';

const { coreplusWebClientURL, headers } = apiConfig;

export const get = (url) => {
  const requestUrl = `${coreplusWebClientURL}api/${url}`;
  return axios.get(requestUrl, { headers });
};

export const post = (url, payload) => {
  const requestUrl = `${coreplusWebClientURL}api/${url}`;
  return axios.post(requestUrl, JSON.stringify(payload), { headers });
};
