// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
exports.main = async (event, context) => {
  console.log(event, context, 'eve')
  try {
    return await db.collection('plantName').where({
      name: db.RegExp({
        regexp: event.keyWord || '.',
        options: 'i'
      })
    }).skip((event.pageNo - 1) * event.pageSize).get()
  } catch (e) {
    console.error(e)
  }
}
