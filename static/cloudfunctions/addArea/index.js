// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
exports.main = async (event, context) => {
  console.log(event, context, 'eve')
  try {
    return await db.collection('area').where({
      name: event.name
    }).update({
      data: {
        'value': event.value
      }
    }).then(res => { console.log(event.value) })
  } catch (e) {
    console.error(e)
  }
}
