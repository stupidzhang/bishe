// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
const $ = db.command.aggregate
exports.main = async (event, context) => {
  try {
    return await db.collection('plantName').aggregate().sortByCount('$name')
      .end()
  } catch (e) {
    console.error(e)
  }
}
