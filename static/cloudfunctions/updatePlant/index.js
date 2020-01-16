// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
exports.main = async (event, context) => {
  console.log(event, context, 'eve')
  try {
    return await db.collection('plantName').where({
      name: event.name
    })
      .update({
        data: {
          isFavor: event.isFavor
        }

      })
  } catch (e) {
    console.error(e)
  }
}
