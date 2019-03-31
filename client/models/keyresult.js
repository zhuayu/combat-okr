import { request } from './request.js';
import API from './api.js';

export default {
  delete (id) {
    return request({ url: API.keyresultItem(id), method: 'DELETE'})
  },
  update (id, params) {
    return request({ url: API.keyresultItem(id), method: 'PUT', data: params })
  },
}