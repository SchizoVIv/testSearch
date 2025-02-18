import axios from 'axios';
import {API_URL, CLIENT_ID} from '@/utils/constants'

export const searchPhotos = async (query: string, page: number = 1) => {
  const response = await axios.get(API_URL, {
    params: {
      client_id: CLIENT_ID,
      query,
      page,
      per_page: 19,
    },
  });
  return response.data;
};