import { request } from './request.js';
import API from './api.js';

export default {
  index (params) {
    return request({ url: API.okr, data: params})
  },
  insert (params) {
    return request({ url: API.okr, method: 'POST', data: params })
  },
  update (id, params) {
    return request({ url: API.okrItem(id), method: 'PUT', data: params })
  },
  show(id) {
    return request({ url: API.okrItem(id) })
  }
}