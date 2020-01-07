// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  console.log('plant云函数入参--------', event)
//   return await db.collection('plantName')
//     .where({
//       title: db.RegExp({
//         regexp: event.keyWord || '.',
//         options: 'i'
//       }),
//       isShow: event.isShow
//     })
//     .skip((event.pageNo - 1) * event.pageSize) // 跳过结果集中的前 n 条，从第 n+1 条开始返回
//     .limit(event.pageSize || 10) // 限制返回数量，默认10条
//     .get()
}
