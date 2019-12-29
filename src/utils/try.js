
var AipImageClassifyClient = require('baidu-aip-sdk').imageClassify
var APP_ID = 'wx4ee8079852e7d6bf'
var API_KEY = 'iiSMXGQk0KvLx3leMiSQTq7L'
var SECRET_KEY = 'wZY08RW8IOd8W1c4YwmEi0oKWY3XaKkX'

// 新建一个对象，建议只保存一个对象调用服务接口
var client = new AipImageClassifyClient(APP_ID, API_KEY, SECRET_KEY)
var fs = require('fs')
var options = {}
options['baike_num'] = '5'
var image1 = fs.readFileSync('src/assets/images/li.jpg').toString('base64')
console.log(image1)
// var img = ('http://tmp/wx4ee8079852e7d6bf.o6zAJs0QQMoHVLP0wVJFW2_6IToA.xQa91DfdBF7377c1e5c32053aff16db63424bf4c9c90.jpg').toString('base64')

client.plantDetect(image1, options).then(function (result) {
  console.log(JSON.stringify(result))
}).catch(function (err) {
  // 如果发生网络错误
  console.log(err)
})

// var https = require('https')
// var qs = require('querystring')

// const param = qs.stringify({
//   'grant_type': 'client_credentials',
//   'client_id': 'iiSMXGQk0KvLx3leMiSQTq7L',
//   'client_secret': 'wZY08RW8IOd8W1c4YwmEi0oKWY3XaKkX'

// })

// https.get(
//   {
//     hostname: 'aip.baidubce.com',
//     path: '/oauth/2.0/token?' + param + "&image='src/assets/images/li.jpg'",
//     agent: false
//   },
//   function (res) {
//     // 在标准输出中查看运行结果
//     res.pipe(process.stdout)
//   }
// )
