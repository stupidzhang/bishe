// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
exports.main = async (event, context) => {
  console.log(event, context, 'eve')
  try {
    if (event.name) {
      return await db.collection('area').where({
        name: event.name,
        openId: event.openId
      }).get()
    } else if (event.openId) {
      return await db.collection('area').where({
        openId: event.openId
      }).get()
    } else {
      return await db.collection('area').get()
    }
  } catch (e) {
    console.error(e)
  }
}
