import axios from 'axios';
import config from 'config';

export const api = axios.create({
  baseURL: config.api.host,
  withCredentials: true,
});

export function authenticate() {
  return api.get('/auth');
}
