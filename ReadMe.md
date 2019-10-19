# 微博项目

## 数据库的配置

sql文件为根目录下面的hanjia.sql

```
var connection = mysql.createConnection({     
  host     : 'localhost',       
  user     : 'root',              
  password : 'password',       
  port: '3305',                   
  database: 'hanjia' 
});
```



### 安装koa2脚手架

```
npm install -g koa-generator

```

### 使用脚手架生成koa2项目

```
koa2  projectName
```

### 启动项目

```
npm install
npm start
```

[koa2]: https://www.cnblogs.com/cckui/p/9958355.html



# node连接mysql

------

### 安装驱动

```
npm install mysql
```

### 连接到数据库 (以hanjia下的user为例)

```
const mysql = require('mysql');
var connection = mysql.createConnection({     
  host     : 'localhost',       
  user     : 'root',              
  password : 'password',       
  port: '3305',                   
  database: 'hanjia' 
});
connection.connect();
```

   最后要 connection.end();

### 查询数据

```
const mysql = require('mysql');
var connection = mysql.createConnection({     
  host     : 'localhost',       
  user     : 'root',              
  password : 'password',       
  port: '3305',                   
  database: 'hanjia' 
});
connection.connect();

var  sql = 'SELECT * FROM user';
//查
connection.query(sql,function (err, result) {
        if(err){
          console.log('[SELECT ERROR] - ',err.message);
          return;
        }
 
       console.log('--------------------------SELECT----------------------------');
       console.log(result);  
       console.log('------------------------------------------------------------\n\n');  
});
```

#### 结果

返回结果为对象形式

用result[0]进行访问

```
--------------------------SELECT----------------------------
[ RowDataPacket { name: 'userA', age: 17, password: 'passworda' },
  RowDataPacket { name: 'userB', age: 19, password: 'passwordB' },
  RowDataPacket { name: 'userC', age: 20, password: 'passwordC' } ]
------------------------------------------------------------
```

### 删除数据

```
var delSql = 'DELETE FROM user where age=21';
//删
connection.query(delSql,function (err, result) {
        if(err){
          console.log('[DELETE ERROR] - ',err.message);
          return;
        }        
 
       console.log('--------------------------DELETE----------------------------');
       console.log('DELETE affectedRows',result.affectedRows);
       console.log('-----------------------------------------------------------------\n\n');  
});

```

### 更新数据

```
var modSql = 'UPDATE user SET age = ?, password= ? WHERE name = ?';
var modSqlParams = [17, 'passworda',"userA"];
//改
connection.query(modSql,modSqlParams,function (err, result) {
   if(err){
         console.log('[UPDATE ERROR] - ',err.message);
         return;
   }        
  console.log('--------------------------UPDATE----------------------------');
  console.log('UPDATE affectedRows',result.affectedRows);
  console.log('-----------------------------------------------------------------\n\n');
});

```

### 增加数据

```
var  addSql = 'INSERT INTO user(name,age,password) VALUES(?,?,?)';
var  addSqlParams = ['userD', 21,'passwordD'];
//增
connection.query(addSql,addSqlParams,function (err, result) {
        if(err){
         console.log('[INSERT ERROR] - ',err.message);
         return;
        }        
 
       console.log('--------------------------INSERT----------------------------');
       //console.log('INSERT ID:',result.insertId);        
       console.log('结果',result);        
       console.log('-----------------------------------------------------------------\n\n');  
});
```

[node连接mysql]: https://www.runoob.com/nodejs/nodejs-mysql.html	"参考"

有空再看sequelize



# koa-router

[官方文档]: https://www.npmjs.com/package/koa-router

### 基本引入

```
var Koa = require('koa');
var Router = require('koa-router');
 
var app = new Koa();
var router = new Router();
 
router.get('/', (ctx, next) => {
  // ctx.router available
});
 
app
  .use(router.routes())
  .use(router.allowedMethods());
```

例子

```
router
  .get('/', (ctx, next) => {
    ctx.body = 'Hello World!';
  })
  .post('/users', (ctx, next) => {
    // ...
  })
  .put('/users/:id', (ctx, next) => {
    // ...
  })
  .del('/users/:id', (ctx, next) => {
    // ...
  })
  .all('/users/:id', (ctx, next) => {
    // ...
  });
```

#### 完整例子

```
const Koa = require('koa'); // Koa 为一个class
const Router = require('koa-router') // koa 路由中间件
const app = new Koa();
const router = new Router(); // 实例化路由

// 添加url
router.get('/hello/:name', async (ctx, next) => {
  var name = ctx.params.name; // 获取请求参数
  ctx.response.body = `<h5>Hello, ${name}!</h5>`;
});

router.get('/', async (ctx, next) => {
  ctx.response.body = '<h5>Index</h5>';
});

app.use(router.routes());

app.listen(3333, () => {
  console.log('This server is running at http://localhost:' + 3333)
})
```

# koa-bodyparser

#### 使用方法

```
var Koa = require('koa');
var bodyParser = require('koa-bodyparser');
 
var app = new Koa();
app.use(bodyParser());
 
app.use(async ctx => {
  // the parsed body will store in ctx.request.body
  // if nothing was parsed, body will be an empty object {}
  ctx.body = ctx.request.body;
});
```

### post方法

html

```
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
</head>
<body>
  
	<form action="http://localhost:3000/upload" method="POST"  enctype="multipart/form-data">

		<p>姓名：</p>

		<input type="text" name="stuName"><br>

		<p>学号：</p>

		<input type="text" name="stuNo"><br>

		<p>爱好：</p>

		<input type="text" name="hobby"><br>

		

		<p>选择文件</p>

		<input type="file" name="file"><br>

		<br>

		<input type="submit">

	</form>

</body>
</html>
```

app.js (读取到为对象格式)

```javascript
router.post('/upload',upload.single('file'),async(ctx,next)=>{
  console.log('abc');
    //也可以用ctx.request.body
  // console.log(ctx.req);
  ctx.body = {
    body:ctx.req.body,
    file:ctx.file,
    filename: ctx.req.file.filename,//返回文件名,
    path:ctx.req.file.destination+ctx.req.file.filename,
  }
  
})

//{"body":{"stuName":"姓名","stuNo":"学号","hobby":"爱好"},"filename":"1565761642759.jpg","path":"./image/1565761642759.jpg"}
```

#### get方法

```
router.get('/get',ctx=>{
  console.log(ctx.request.query);
});
```

# 跨域解决

### 安装koa-cors

```
var koa = require('koa');
var route = require('koa-route');
var cors = require('koa-cors');
var app = koa();

app.use(cors());

app.use(route.get('/', function() {
  this.body = { msg: 'Hello World!' };
}));

app.listen(3000);
```

** 要把app.use那句话写在所有中间件前面 **

## 整合静态资源

```
const path=require("path")
const static =require("koa-static")
const staticPath = './image'
app.use(static(
    path.join( __dirname, staticPath)
))
```

安装koa-static