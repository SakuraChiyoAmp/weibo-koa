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

根目录下dbToll下的文件更改数据库配置

根目录下app.js更改配置

### 启动项目

```
npm install
npm start
```

[koa2]: https://www.cnblogs.com/cckui/p/9958355.html


