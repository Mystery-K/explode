import axios from 'axios';
import logger from '../common/logger';

const client = axios.create({
  // headers: {
  //   'Content-Type': 'application/json',
  // },
});

client.interceptors.response.use(
  response => {
    if (response.status === 200) {
      const { data } = response;
      // if (typeof data === 'object') {
      //   if (data.message !== 'success') {
      //     logger.error('network error', JSON.stringify(data));
      //     logger.info('url:', response && response.config && response.config.url);
      //   }
      // }
      return data;
    } else {
      logger.error('network error', JSON.stringify(response));
      logger.info('url:', response && response.config && response.config.url);
      return Promise.reject(response);
    }
  },
  error => {
    logger.error('network error', JSON.stringify(error));
    logger.info('url:', error && error.config && error.config.url);
  },
);

export default client;
