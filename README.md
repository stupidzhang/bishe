mpvue + 云开发 + 百度植物识别api

1.同步异步还没封装解决
2.展示图片路径地址不支持本地图片要转换成base64展示
3.数据库更新刷新展示(无刷新方法，偏方：1.直接调用onLoad( )，此方法风险极高，不建议使用。2.跳转到当前页面，页面会刷新，这个比较保险，但是要注意保留参数) 退回上一页要刷新则在onShow中执行需要更新的方法。
4.个人类型和海外类型的小程序不支持 web-view 标签===个人申请的小程序，就别想跳转到外部。
5.手机调试报错 远程调试工具cmdld 1005 ,errCode 1
6.云函数更改过要记得部署
7.调试报error:缺少js文件可能是文件路径不对
8.源码包超出最大限制 压缩图片及删除无用代码，把图片传至云端
9.小程序分享需要有app 无法分享