const host = 'https://aip.baidubce.com'

function request (url, method, data, header = {}) {
  console.log(data, 'datadata')
  wx.showLoading({
    title: '加载中' // 数据请求前loading
  })
  return new Promise((resolve, reject) => {
    wx.request({
      url: host + url, // 仅为示例
      method: method,
      data: data,
      header:
        header, // 默认值

      success: function (res) {
        wx.hideLoading()
        resolve(res.data)
      },
      fail: function (res) {
        wx.hideLoading()
        // reject(false)
      },
      complete: function () {
        wx.hideLoading()
      }
    })
  })
}

function get (obj) {
  return request(obj.url, 'GET', obj.data)
}

function post (obj) {
  console.log(obj, 'limiande')
  return request(obj.url, 'POST', obj.data, obj.header)
}

export default {
  request,
  get,
  post,
  host
}
