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
      if (typeof data === 'object') {
        if (data.code !== 0) {
          logger.info('network error', data, '\nurl:', response && response.config && response.config.url);
        }
      }
      return data;
    } else {
      logger.info('network error', response, '\nurl:', response && response.config && response.config.url);
      return Promise.reject(response);
    }
  },
  error => {
    logger.info('network error', error, '\nurl:', error && error.config && error.config.url);
  },
);

export default client;
