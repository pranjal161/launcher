import axios from 'axios';
import { AppConfig } from '../config/appConfig';

export const get = async function (url: string) {
    const res = await axios.get(url, { headers: AppConfig.headers});
    return res.data;
  };