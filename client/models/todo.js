import { request } from './request.js';
import API from './api.js';

export default {
  test (code) {
    return request({ url: API.test })
  },
}