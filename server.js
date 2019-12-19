var mysql = require('mysql')
 
var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '', // 密码填写你们自己的
	port: '3306',
	database: 'plant', // 填写你们自己的数据库名称
  pass: 'wx4ee8079852e7d6bf'
})
 
connection.connect()
var server = http.createServer(function(req, res) {
	res.setHeader("Access-Control-Allow-Origin", "*"); 
	//如果你发一个GET到http://127.0.0.1:9000/test
	var url_info = require('url').parse(req.url, true)
	//检查是不是给/test的request
	if (url_info.pathname === '/test') {
		res.writeHead(200, { 'Content-Type': 'text/plain;charset=utf-8' })
 
		connection.query('SELECT * FROM user order by rand()  LIMIT 5', function(err, rows, fields) {
			//处理你的结果
			// res.end(rows.constructor);
			// 输出结果
			res.end(JSON.stringify(rows))
 
			console.log(rows.constructor)
			console.log(typeof rows)
			res.end(rows.join)
			console.log(err)
			console.log(fields)
		})
	}
	//这个是用来回复上面那个post的，显示post的数据以表示成功了。你要是有别的目标，自然不需要这一段。
	else {
		req.pipe(res)
	}
})
server.listen(9000, '127.0.0.1')
//在server关闭的时候也关闭mysql连接
server.on('close', function() {
	connection.end()
})
console.log('listening on port  9000')
 
// var sql = 'SELECT * FROM user'
// //查
// connection.query(sql, function(err, result) {
// 	if (err) {
// 		console.log('[SELECT ERROR] - ', err.message)
// 		return
// 	}
 
// 	console.log('--------------------------SELECT----------------------------')
// 	console.log(result)
// 	console.log('------------------------------------------------------------\n\n')
// })
 
// connection.end()
 
var addSql = 'INSERT INTO plant(Id,name) VALUES(?,?)'
var addSqlParams = ['2','桂花']
//增
connection.query(addSql, addSqlParams, function(err, result) {
	if (err) {
		console.log('[INSERT ERROR] - ', err.message)
		return
	}
 
	console.log('--------------------------INSERT----------------------------')
	//console.log('INSERT ID:',result.insertId);
	console.log('INSERT ID:', result)
	console.log('-----------------------------------------------------------------\n\n')
})
 
connection.end()
 
// var modSql = 'UPDATE user SET name = ?,gender = ? WHERE Id = ?'
// var modSqlParams = ['高圆圆', '女', 1]
// //改
// connection.query(modSql, modSqlParams, function(err, result) {
// 	if (err) {
// 		console.log('[UPDATE ERROR] - ', err.message)
// 		return
// 	}
// 	console.log('--------------------------UPDATE----------------------------')
// 	console.log('UPDATE affectedRows', result.affectedRows)
// 	console.log('-----------------------------------------------------------------\n\n')
// })
 
// connection.end()
 
// var delSql = 'DELETE FROM websites where id=2'
// //删
// connection.query(delSql, function(err, result) {
// 	if (err) {
// 		console.log('[DELETE ERROR] - ', err.message)
// 		return
// 	}
 
// 	console.log('--------------------------DELETE----------------------------')
// 	console.log('DELETE affectedRows', result.affectedRows)
// 	console.log('-----------------------------------------------------------------\n\n')
// })
 
// connection.end()
