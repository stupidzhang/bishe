// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
exports.main = async (event, context) => {
  try {
    return await db.collection('plantName').get()
  } catch (e) {
    console.error(e)
  }
  // collection 上的 get 方法会返回一个 Promise，因此云函数会在数据库异步取完数据后返回结
}
