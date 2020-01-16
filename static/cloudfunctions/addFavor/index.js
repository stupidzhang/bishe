// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
exports.main = async (event, context) => {
  console.log(event, context, 'eve')
  try {
    return await db.collection('favor').add({
      data: {
        name: event.name,
        city: event.city,
        description: event.description,
        image: event.image
      }
    })
  } catch (e) {
    console.error(e)
  }
}
