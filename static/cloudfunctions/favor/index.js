// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
exports.main = async (event, context) => {
  console.log(event, context, 'eve')
  try {
    if (event.keyWord) {
      return await db.collection('favor').where({
        name: event.keyWord
      }).get()
    } else {
      return await db.collection('favor').where({

      }).get()
    }
  } catch (e) {
    console.error(e)
  }
}
