// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  console.log('plant云函数入参--------', event)
  return await db.collection('plantName').get({
    success: function (res) {
      console.log(res.data)
    }
  })
};
