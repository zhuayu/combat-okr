import { request } from './request.js';
import API from './api.js';

export default {
  index (id) {
    return request({ url: API.todoKeyresult(id)})
  },
  insert (id,params) {
    return request({ url: API.todoKeyresult(id), method: 'POST', data: params })
  },
  delete (id, params) {
    return request({ url: API.todoKeyresult(id), method: 'DELETE', data: params})
  },
}