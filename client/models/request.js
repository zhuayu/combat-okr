export const request = (params) => {
  let token = wx.getStorageSync('token')
  if(token) {
    params.headers = params.headers ? params.headers : {}
    params.headers['Authorization'] = token
  }

  return new Promise((resolve, reject)=> {
    wx.request({
      url: params.url,
      header: params.headers,
      method: params.method || 'GET',
      data: params.data || {},
      success: (res) => {
        if(res.data.code === 200){
          resolve(res.data.data)
        }else{
          reject()
        }
      },
      fail: (err) => {
        reject()
      }
    })
  })
}