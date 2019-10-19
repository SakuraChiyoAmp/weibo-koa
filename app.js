const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const jwt = require("jsonwebtoken");
//解决路径问题
const path=require("path")
//解决跨域
var cors = require('koa-cors');
//静态资源
const static =require("koa-static")
//连接到mysql
const mysql = require('mysql');
//引入koa-router
var Router = require('koa-router');
var router = new Router();
//token相关
const createToken=require("./tocken/createToken");
const checkToken=require("./tocken/checkToken");
//session
const session=require("koa-session");
app.keys = ['some secret hurr'];
const UserInfo=require("./dbTool/UserInfo")
const GetInterface=require("./GetInterface")
const CONFIG = {
  key: 'koasess', 
  maxAge: 1000*5,
  overwrite: true, 
  httpOnly: true,  
  signed: true,  
  rolling: false,
  renew: false,
  resave:true,
  saveUninitialized: true, 
};

//静态资源
const staticPath = './image'
app.use(static(
    path.join( __dirname, staticPath)
))
//解决文件上传
const multer=require("koa-multer")
var storage = multer.diskStorage({
  //文件保存路径
  destination: function (req, file, cb) {
    cb(null, './image')
  },
  //修改文件名称
  filename: function (req, file, cb) {
    var fileFormat = (file.originalname).split(".");  //以点分割成数组，数组的最后一项就是后缀名
    cb(null,Date.now() + "." + fileFormat[fileFormat.length - 1]);
  }
})
//加载配置
const upload = multer({ storage: storage });



 
  

const index = require('./routes/index')
const users = require('./routes/users')

// error handler
onerror(app)

//连接到数据库
var connection = mysql.createConnection({     
  host     : 'localhost',       
  user     : 'root',              
  password : 'password',       
  port: '3305',                   
  database: 'hanjia' 
});
connection.connect();





// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(cors({credentials:true}));
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))
//拦截登录状态
app.use(session(CONFIG, app));
app.use(checkToken);
// app.use(async(ctx,next)=>{
//   console.log(ctx.path);
//   if (ctx.path!="/Login"&&ctx.path!="/SignUp"){
//     const authorization = ctx.request.header.authorization;
//     console.log("拿到的token"+authorization)
//     if (authorization === '') {
//           ctx.body={
//             LogMsg:"UnLogged"
//           }
//         }
//       const token = authorization.split(' ')[1];
//       try {
//         console.log("拿到的token头"+token)
//         tokenContent = await jwt.verify(token, 'TOKEN').then(result=>{
//           console.log("验证成功");
//         }); 
//         await next();
//         return;//如果token过期或验证失败，将抛出错误
//       } catch (err) {
//         console.log("验证失败");
//        ctx.body={
//         LogMsg:"UnLogged"
//        }
//       }
//   }else{
//     await next();
//     return;
//   }
// })
app.use(router.routes()).use(router.allowedMethods());

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})


// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});
//

//测试post和get请求
router.post("/testPost",async(ctx,next)=>{
  console.log(ctx.request.body)
  ctx.body = "nmsl"; 
  
}) 
router.get("/testGet",async(ctx,next)=>{
  console.log(ctx.request.query);
  ctx.body= ctx.request.query; 
})
// router.get("*",async(ctx)=>{
//   ctx.body={
//     msg:"全匹配"
//   }
// })

//一些用到的接口

//注册
router.post("/regist",async(ctx,next)=>{
     let UserName=ctx.request.body.UserName;
     let Password=ctx.request.body.Password;
     console.log(UserName);
     console.log(Password);
    //  let sqlUserName='SELECT UserName FROM USERINFO WHERE UserName="'+UserName+'"';
    let sqlUserName=`SELECT UserName FROM USERINFO WHERE UserName="${UserName}"`;
    console.log(sqlUserName);
     const queryUserName=function checkUserName(sql){
       return new Promise((resolve,reject)=>{
        connection.query(sql,function(err,result){
          console.log(sql);
          if (err){
            console.log("查询出错");
          }else{
            
            resolve(result);
          }
       })
       })
     }
    let resultUserName=await queryUserName(sqlUserName);
    console.log(typeof resultUserName)
    console.log(resultUserName[0])
    console.log(resultUserName.length);
    if (resultUserName.length!=0){
      ctx.body={
        state:"failed",
      }
    }else{
         let sql=`insert INTO USERINFO (USERNAME,PASSWORD) VALUES ("${UserName}","${Password}")`;
         let queryRegist=function checkRegist(sql){
             return new Promise((resolve,reject)=>{
              connection.query(sql,function (err, result) {
                if(err){
                 console.log('[INSERT ERROR] - ',err.message);
                 return;
                }else{
                  resolve(result);
                }   
            });
          })
        }
        let resultRegist=await  queryRegist(sql);
        if (resultRegist.affectedRows!=0){
          ctx.body={
            state:"success"
          }
        }
    }
    

})
//登录
// router.post("/login",async(ctx,next)=>{
//     let UserName=ctx.request.body.UserName;
//     let Password=ctx.request.body.Password;
//     let sqlUserName=`SELECT Password FROM USERINFO WHERE UserName="${UserName}"`;
//  console.log(sqlUserName);
//   const queryUserName=function checkUserName(sql){
//     return new Promise((resolve,reject)=>{
//      connection.query(sql,function(err,result){
//        console.log(sql);
//        if (err){
//          console.log("查询出错");
//        }else{
         
//          resolve(result);
//        }
//     })
//     })
//   }
//  let resultUserName=await queryUserName(sqlUserName);
//  console.log(resultUserName);
//  console.log(resultUserName[0]);
//  if (resultUserName[0].Password!=Password){
//    ctx.body={
//      state:"failed"
//    }
//  }else{

//    let token=await createToken(ctx.request.body.UserName);

//    console.log("签发的token是"+token);
//    ctx.session.token=token;
//    ctx.body={
//      state:"success",
//      token:token
//    }
//  }
// })
router.post("/checkToken",async(ctx,next)=>{
  let state=await checkToken(ctx);
  let show="nmsl"
  ctx.body={
    state:state,
    show:show
  }
})
//获取用户个人信息
router.get("/getUserInfo",async(ctx,next)=>{
        let UserName=ctx.request.query.UserName;
        let sqlUserName=`SELECT * FROM USERINFO WHERE UserName="${UserName}"`;
        console.log(sqlUserName);
         const queryUserName=function checkUserName(sql){
           return new Promise((resolve,reject)=>{
            connection.query(sql,function(err,result){
              console.log(sql);
              if (err){
                console.log("查询出错");
              }else{
                
                resolve(result);
              }
           })
           })
         }
        let resultUserName=await queryUserName(sqlUserName);
        ctx.body={
          UserName:UserName,
          HeadImage:resultUserName[0].HeadImage,
        }
      
})
//发微博
router.post("/FaWeibo",async(ctx,next)=>{
  let UserName=ctx.request.body.UserName;
  let Content=ctx.request.body.Content;
  let date=ctx.request.body.Time;
  let ImageList=ctx.request.body;

  console.log(typeof date);
  let sql=`insert INTO WEIBO (USERNAME,ZanCount,CONTENT,TIME) VALUES ("${UserName}",0,"${Content}",${date})`;
         let queryRegist=function checkRegist(sql){
             return new Promise((resolve,reject)=>{
              connection.query(sql,function (err, result) {
                if(err){
                 console.log('[INSERT ERROR] - ',err.message);
                 return;
                }else{
                  resolve(result);
                }   
            });
          })
        }
        let resultRegist=await  queryRegist(sql);
        if (resultRegist.affectedRows!=0){
          ctx.body={
            state:"success"
          }
        }

})
//获取微博的唯一id
router.get("/GetWeiboId",async(ctx,next)=>{
  let UserName=ctx.request.query.UserName;
  let date=ctx.request.query.Time;
  //得到微博的唯一id
  let sqlUserName=`SELECT WeiboId FROM weibo WHERE UserName="${UserName}" and Time="${date}"`;
  console.log(sqlUserName);
   const queryUserName=function checkUserName(sql){
     return new Promise((resolve,reject)=>{
      connection.query(sql,function(err,result){
        console.log(sql);
        if (err){
          console.log('[INSERT ERROR] - ',err.message);
        }else{
          console.log("___结果"+result)
          resolve(result);
        }
     })
     })
   }
  let re=await queryUserName(sqlUserName);
  let id=re[0].WeiboId;
  console.log("---------id"+id);
   ctx.body={
     WeiboId:id,
   }
  ////
})
//微博发图片
router.post('/ImageUpload', upload.array('avatar', 5), async (ctx) => {
  var id=ctx.query.userName;
  console.log("接收到了id"+id)
  const files = ctx.request.files; //上传过来的文件  
  console.log("----------");
  console.log(ctx.req.files);
  // console.log(ctx.request.files);
  console.log("---------");
    var ImageList=new Array();
    ctx.req.files.forEach(item=>{
          ImageList.push(item.filename);
    });
    console.log("--------ImageList");
    console.log(ImageList);
       var i=new Array();
     ImageList.forEach(function(item){
      let queryRegist=function checkRegist(item){
        
        console.log("内部接受到id"+id)
        let sql=`INSERT INTO weiboimage (WeiboId,Url) VALUES (${id},"${item}")`
        console.log("接收到的sql"+sql)
          return new Promise((resolve,reject)=>{
           connection.query(sql,function (err, result) {
             if(err){
              console.log('[INSERT ERROR] - ',err.message);
              return;
             }else{
               resolve(result);
             }   
         });
       })
     } 
        
       
       i.push(queryRegist(item));
       
      })
    //   console.log(i);
    let Final=await Promise.all(i).then(result=>{
      console.log(result);
    });
  //   console.log("-----------");
  //  console.log(Final);
  ctx.body = {msg: '添加成功'};  //返回数据
}) 

//测试用的接口们
//带头像的注册
router.post('/SignUp', upload.array('avatar', 1), async (ctx) => {
  let UserName=ctx.query.username;
  let Password=ctx.query.pass;
  console.log("接收到了pass"+Password);
  console.log("接收到了usernam"+UserName)
  console.log("收到的文件的信息"+ctx.req.files[0].filename);
    let sqlUserName=`SELECT UserName FROM USERINFO WHERE UserName="${UserName}"`;
     const queryUserName=function checkUserName(sql){
       return new Promise((resolve,reject)=>{
        connection.query(sql,function(err,result){
          if (err){
            console.log("查询出错");
          }else{
            resolve(result);
          }
       })
       })
     }
    let resultUserName=await queryUserName(sqlUserName);
    console.log(typeof resultUserName)
    console.log(resultUserName[0])
    console.log(resultUserName.length);
    if (resultUserName.length!=0){
      ctx.body={
        state:"该用户名已被注册",
      }
    }else{
         let filename="http://localhost:3000/"+ctx.req.files[0].filename;
         let sql=`insert INTO USERINFO (USERNAME,PASSWORD,HEADIMAGE) VALUES ("${UserName}","${Password}","${filename}")`;
         let queryRegist=function checkRegist(sql){
             return new Promise((resolve,reject)=>{
              connection.query(sql,function (err, result) {
                if(err){
                 console.log('[INSERT ERROR] - ',err.message);
                 return;
                }else{
                  resolve(result);
                }   
            });
          })
        }
        let resultRegist=await  queryRegist(sql);
        
        
        if (resultRegist.affectedRows!=0){
          ctx.body={
            state:"success"
          }
        }
    }
   
  
}) 
//登录
router.post("/Login",async(ctx,next)=>{
  let UserName=ctx.request.body.UserName;
  let Password=ctx.request.body.Password;
  let sqlUserName=`SELECT Password FROM USERINFO WHERE UserName="${UserName}"`;
const queryUserName=function checkUserName(sql){
  return new Promise((resolve,reject)=>{
   connection.query(sql,function(err,result){
     if (err){
       console.log("查询出错");
     }else{
       resolve(result);
     }
  })
  })
}
let resultUserName=await queryUserName(sqlUserName);

  // let TokenX=`SELECT Token FROM Token WHERE UserName="${UserName}"`;
  // const queryToken=function checkToken(sql){
  //   return new Promise((resolve,reject)=>{
  //    connection.query(sql,function(err,result){
  //      if (err){
  //        console.log("查询出错");
  //      }else{
  //        resolve(result);
  //      }
  //   })
  //   })
  // }
  // let resultToken=await queryToken(TokenX);

if (resultUserName[0].Password!=Password){
 ctx.body={
   state:"failed"
 }
}else{
  let token=await createToken(ctx.request.body.UserName);
//   console.log("签发的token是"+token);
//   let sql=`insert INTO token (USERNAME,TOKEN) VALUES ("${UserName}","${token}")`;
//   let queryRegist=function checkRegist(sql){
//       return new Promise((resolve,reject)=>{
//        connection.query(sql,function (err, result) {
//          if(err){
//           console.log('[INSERT ERROR] - ',err.message);
//           return;
//          }else{
//            resolve(result);
//          }   
//      });
//    })
//  }
//  let resultRegist=await  queryRegist(sql);
//  console.log(resultRegist);
//  if (resultRegist.affectedRows!=0){
 
  //  console.log("设置了session了");
  //  ctx.session.logged=true;
  //  console.log("session是"+ctx.session.logged);
   
  ctx.body={
    state:"success",
    token:token,
    username:UserName,
  } 
// }

}
})
//退出登录
router.post("/LogOut",async(ctx,next)=>{
  // let re;
  //  await UserInfo.LogOut(ctx.request.body.UserName).then(result=>{
  //    re=result;
  //  });
  //  ctx.session.logged=false;
   ctx.body={
     state:"success", 
   }
})
router.post("/PushWeibo",upload.array('avatar', 5),async(ctx,next)=>{
  
  let UserName=ctx.query.UserName;
  console.log("用户名"+UserName);

  let Content=ctx.query.Content;
  console.log("内容"+Content);
  let time=Date.now();
  let name;
  await GetInterface.GetUserInfo(UserName).then(result=>{
    name=result;
  }); 
  // console.log(UserName);
  // console.log(Content); 
  const files = ctx.request.files; //上传过来的文件  
  // console.log("----------");
  // console.log(ctx.req.files);
  
  let sql=`insert INTO weibo (UserName,ZanCount,Content,time) VALUES ("${UserName}",0,"${Content}","${time}")`;
  let queryRegist=function checkRegist(sql){
      return new Promise((resolve,reject)=>{
       connection.query(sql,function (err, result) {
         if(err){
          console.log('[INSERT ERROR] - ',err.message);
          return;
         }else{
           resolve(result);
         }   
     });
   })
 }
 let resultRegist=await  queryRegist(sql);
 if (resultRegist.affectedRows!=0){
  let sqlUserName=`SELECT WeiboId FROM weibo WHERE UserName="${UserName}" And time="${time}"`;
  const queryUserName=function checkUserName(sql){
    return new Promise((resolve,reject)=>{
     connection.query(sql,function(err,result){
       if (err){
         console.log("查询出错");
       }else{
         resolve(result);
       }
    })
    })
  }
 let resultUserName=await queryUserName(sqlUserName);
 console.log(resultUserName[0]);
 console.log(resultUserName[0].WeiboId);
 if (resultUserName.length!=0){
   var WeiboId=resultUserName[0].WeiboId;
   var ImageList=new Array();
   ctx.req.files.forEach(item=>{
         item.filename="http://localhost:3000/"+item.filename;
         ImageList.push(item.filename);
   });
   console.log("--------ImageList");
   console.log(ImageList);
      var i=new Array();
    ImageList.forEach(function(item){
     let queryRegist=function checkRegist(item){
       console.log(WeiboId);
       console.log(typeof WeiboId);
       let sql=`INSERT INTO weiboimage (WeiboId,Url) VALUES (${WeiboId},"${item}")`
         return new Promise((resolve,reject)=>{
          connection.query(sql,function (err, result) {
            if(err){
             console.log('[INSERT ERROR] - ',err.message);
             return;
            }else{
              resolve(result);
            }   
        });
      })
    } 
       
      
      i.push(queryRegist(item));
      
     })
   //   console.log(i);
   let Final=await Promise.all(i).then(result=>{
     console.log(result);
   });
 }

 }

  ctx.body={
    state:"success"
  }
})
//评论
router.post("/Comment",async(ctx,next)=>{
  console.log(ctx.request.body.UserName);
  console.log(ctx.request.body.Content);
  console.log(ctx.request.body.Id);
  let UserName=ctx.request.body.UserName;
  let Content=ctx.request.body.Content;
  let WeiboId=ctx.request.body.Id;

  let sql=`insert INTO weibocomment (WeiboId,UserName,Comment) VALUES ("${WeiboId}","${UserName}","${Content}")`;
  let queryRegist=function checkRegist(sql){
      return new Promise((resolve,reject)=>{
       connection.query(sql,function (err, result) {
         if(err){
          console.log('[INSERT ERROR] - ',err.message);
          return;
         }else{
           resolve(result);
         }   
     });
   })
 }
 let resultRegist=await  queryRegist(sql);
 
 
 if (resultRegist.affectedRows!=0){
   ctx.body={
     state:"success"
   }
 }

})
//关注
router.post("/Focus",async(ctx,next)=>{
  let UserName=ctx.request.body.UserName;
  let OtherUserName=ctx.request.body.OtherUserName;
  let FocusFlag="1";
  if(ctx.request.body.FocusFlag==true){
    FocusFlag="1";
  }else{
     FocusFlag="0"
  }
  console.log(ctx.request.body.UserName);
  console.log(ctx.request.body.OtherUserName);
  console.log(ctx.request.body.FocusFlag);
  console.log(FocusFlag);
  
  let sqlUserName=`SELECT FocusFlag FROM Focus WHERE UserName="${UserName}" And OtherUserName="${OtherUserName}"`;
  const queryUserName=function checkUserName(sql){
    return new Promise((resolve,reject)=>{
     connection.query(sql,function(err,result){
       if (err){
         console.log("查询出错");
       }else{
         resolve(result);
       }
    })
    })
  }
  let resultUserName=await queryUserName(sqlUserName);
  console.log(resultUserName);
  if (resultUserName.length==0){
    let sql=`insert INTO Focus (USERNAME,OtherUserName,FocusFlag) VALUES ("${UserName}","${OtherUserName}","${FocusFlag}")`;
    console.log(sql);
    let queryRegist=function checkRegist(sql){
        return new Promise((resolve,reject)=>{
         connection.query(sql,function (err, result) {
           if(err){
            console.log('[INSERT ERROR] - ',err.message);
            return;
           }else{
             resolve(result);
           }   
       });
     })
   }
   let resultRegist=await  queryRegist(sql);
   console.log("之前没有关系"+resultRegist);
  }else{
    console.log("flag为"+FocusFlag);
        let sql=`UPDATE Focus SET FocusFlag ="${FocusFlag}" WHERE UserName="${UserName}" And OtherUserName="${OtherUserName}"`;
        console.log(sql);
        let queryRegist=function checkRegist(sql){
          return new Promise((resolve,reject)=>{
           connection.query(sql,function (err, result) {
             if(err){
              console.log('[INSERT ERROR] - ',err.message);
              return;
             }else{
               resolve(result);
             }   
         });
       })
     }
     let resultRegist=await  queryRegist(sql).then(result=>{
       console.log("改变成功");
     });
     console.log("之前有关系"+resultRegist);
  }

  ctx.body={
    state:"success",
  }
})
//点赞
router.post("/Dianzan",async(ctx,next)=>{
  console.log(ctx.request.body.UserName);
  console.log(ctx.request.body.Id);
  console.log(ctx.request.body.DianzanFlag);
  let UserName=ctx.request.body.UserName;
  let Id=ctx.request.body.Id;
  let DianzanFlag="1";
  if(ctx.request.body.DianzanFlag==true){
    DianzanFlag="1";
  }else{
    DianzanFlag="0"
  }
  let sqlUserName=`SELECT ZanFlag FROM zan WHERE UserName="${UserName}" And WeiboId=${Id}`;
  const queryUserName=function checkUserName(sql){
    return new Promise((resolve,reject)=>{
     connection.query(sql,function(err,result){
       if (err){
         console.log("查询出错");
       }else{
         resolve(result);
       }
    })
    })
  }
  let resultUserName=await queryUserName(sqlUserName);
  console.log(resultUserName);
  if (resultUserName.length==0){
    let sql=`insert INTO zan (USERNAME,WeiboId,ZanFlag) VALUES ("${UserName}",${Id},"${DianzanFlag}")`;
    let queryRegist=function checkRegist(sql){
      console.log(sql); 
        return new Promise((resolve,reject)=>{
         connection.query(sql,function (err, result) {
           if(err){
            console.log('[INSERT ERROR] - ',err.message);
            return;
           }else{
             resolve(result);
           }   
       });
     })
   }
   let resultRegist=await  queryRegist(sql);
   console.log("之前没有关系"+resultRegist);
  }else{
        let sql=`UPDATE zan SET ZanFlag ="${DianzanFlag}" WHERE UserName="${UserName}" And WeiboId=${Id}`;
        console.log("点赞的操作语句"+sql);
        let queryRegist=function checkRegist(sql){
          return new Promise((resolve,reject)=>{
           connection.query(sql,function (err, result) {
             if(err){
              console.log('[INSERT ERROR] - ',err.message);
              return;
             }else{
               resolve(result);
             }   
         });
       })
     }
     let resultRegist=await  queryRegist(sql);
     console.log("之前有关系"+resultRegist);
  }
  if (DianzanFlag==1){
    let sql=`UPDATE weibo SET ZanCount =ZanCount+1 WHERE WeiboId=${Id}`;
    let queryRegistX=function checkRegist(sql){
      return new Promise((resolve,reject)=>{
       connection.query(sql,function (err, result) {
         if(err){
          console.log('[INSERT ERROR] - ',err.message);
          return;
         }else{
           resolve(result);
         }   
     });
   })
  }
  let resultRegist=await  queryRegistX(sql);
  }else{
    let sql=`UPDATE weibo SET ZanCount =ZanCount-1 WHERE WeiboId=${Id}`;
    let queryRegistX=function checkRegist(sql){
      return new Promise((resolve,reject)=>{
       connection.query(sql,function (err, result) {
         if(err){
          console.log('[INSERT ERROR] - ',err.message);
          return;
         }else{
           resolve(result);
         }   
     });
   })
  }
  let resultRegist=await  queryRegistX(sql);
  }



  ctx.body={ 
    state:"success",
  } 
})

//获取自己的信息
router.get("/GetMyInfo",async(ctx,next)=>{
  let UserName=ctx.request.query.UserName;
   let FinalResult={};
   await GetInterface.GetUserInfo(UserName).then(result=>{
    FinalResult=result;
   });
    ctx.body=FinalResult;
})
//获取他人的信息
router.get("/GetOtherInfo",async(ctx,next)=>{
  console.log(ctx.request.query);
  let FinalResult;
   await GetInterface.GetOtherInfo(ctx.request.query.UserName,ctx.request.query.OtherUserName).then(result=>{
        FinalResult=result;
        console.log(FinalResult);
   });
   ctx.body=FinalResult;
    // ctx.body={
    //   UserName:"其他人",
    //   HeadImage:"http://localhost:3000/test.jpg",
    //   FocusFlag:false,
    //   Fans:[
    //     {UserName:"粉丝1",HeadImage:"http://localhost:3000/1.jpg"},
    //     {UserName:"粉丝2",HeadImage:"http://localhost:3000/2.jpg"},
    //     {UserName:"粉丝3",HeadImage:"http://localhost:3000/3.jpg"},
    //     {UserName:"粉丝4",HeadImage:"http://localhost:3000/4.jpg"},
    //     {UserName:"粉丝5",HeadImage:"http://localhost:3000/5.jpg"},
    //   ],
    //   Focus:[
    //     {UserName:"关注1",HeadImage:"http://localhost:3000/1.jpg"},
    //     {UserName:"关注2",HeadImage:"http://localhost:3000/2.jpg"},
    //     {UserName:"关注3",HeadImage:"http://localhost:3000/3.jpg"},
    //     {UserName:"关注4",HeadImage:"http://localhost:3000/4.jpg"},
    //     {UserName:"关注5",HeadImage:"http://localhost:3000/5.jpg"},
    //   ],
    //   WeiboList:[
    //     {UserName:"用户1",
    //     HeadImage:"http://localhost:3000/1.jpg",
    //     Content:"这是一条微博",
    //     ImageList:["http://localhost:3000/1.jpg","http://localhost:3000/2.jpg","http://localhost:3000/3.jpg","http://localhost:3000/4.jpg","http://localhost:3000/5.jpg"]
    //   },
    //   {UserName:"用户2",
    //     HeadImage:"http://localhost:3000/1.jpg",
    //     Content:"这是一条微博",
    //     ImageList:["http://localhost:3000/1.jpg","http://localhost:3000/2.jpg","http://localhost:3000/3.jpg","http://localhost:3000/4.jpg","http://localhost:3000/5.jpg"]
    //   },
    //   {UserName:"用户3",
    //     HeadImage:"http://localhost:3000/1.jpg",
    //     Content:"这是一条微博",
    //     ImageList:["http://localhost:3000/1.jpg","http://localhost:3000/2.jpg","http://localhost:3000/3.jpg","http://localhost:3000/4.jpg","http://localhost:3000/5.jpg"]
    //   },
    //   {UserName:"用户4",
    //     HeadImage:"http://localhost:3000/1.jpg",
    //     Content:"这是一条微博",
    //     ImageList:["http://localhost:3000/1.jpg","http://localhost:3000/2.jpg","http://localhost:3000/3.jpg","http://localhost:3000/4.jpg","http://localhost:3000/5.jpg"]
    //   },
    //   {UserName:"用户5",
    //     HeadImage:"http://localhost:3000/1.jpg",
    //     Content:"这是一条微博",
    //     ImageList:["http://localhost:3000/1.jpg","http://localhost:3000/2.jpg","http://localhost:3000/3.jpg","http://localhost:3000/4.jpg","http://localhost:3000/5.jpg"]
    //   },
    //   ]
    // }
})
router.get("/GetMyPageInfo",async(ctx,next)=>{
  console.log(ctx.request.query);
  let FinalResult;
   await GetInterface.GetMyInfo(ctx.request.query.UserName).then(result=>{
        FinalResult=result;
        console.log(FinalResult);
   });  
   ctx.body=FinalResult;
//   ctx.body={
//     UserName:"测试用户",
//     HeadImage:"http://localhost:3000/test.jpg",
//     WeiboList:[
//       {UserName:"用户1",
//       HeadImage:"http://localhost:3000/1.jpg",
//       Content:"这是一条微博",
//       ImageList:["http://localhost:3000/1.jpg","http://localhost:3000/2.jpg","http://localhost:3000/3.jpg","http://localhost:3000/4.jpg","http://localhost:3000/5.jpg"]
//     },
//     {UserName:"用户2",
//       HeadImage:"http://localhost:3000/1.jpg",
//       Content:"这是一条微博",
//       ImageList:["http://localhost:3000/1.jpg","http://localhost:3000/2.jpg","http://localhost:3000/3.jpg","http://localhost:3000/4.jpg","http://localhost:3000/5.jpg"]
//     },
//     {UserName:"用户3",
//       HeadImage:"http://localhost:3000/1.jpg",
//       Content:"这是一条微博",
//       ImageList:["http://localhost:3000/1.jpg","http://localhost:3000/2.jpg","http://localhost:3000/3.jpg","http://localhost:3000/4.jpg","http://localhost:3000/5.jpg"]
//     },
//     {UserName:"用户4",
//       HeadImage:"http://localhost:3000/1.jpg",
//       Content:"这是一条微博",
//       ImageList:["http://localhost:3000/1.jpg","http://localhost:3000/2.jpg","http://localhost:3000/3.jpg","http://localhost:3000/4.jpg","http://localhost:3000/5.jpg"]
//     },
//     {UserName:"用户5",
//       HeadImage:"http://localhost:3000/1.jpg",
//       Content:"这是一条微博",
//       ImageList:["http://localhost:3000/1.jpg","http://localhost:3000/2.jpg","http://localhost:3000/3.jpg","http://localhost:3000/4.jpg","http://localhost:3000/5.jpg"]
//     },
  
//     ],
//     Fans:[
//       {UserName:"粉丝1",HeadImage:"http://localhost:3000/1.jpg"},
//       {UserName:"粉丝2",HeadImage:"http://localhost:3000/2.jpg"},
//       {UserName:"粉丝3",HeadImage:"http://localhost:3000/3.jpg"},
//       {UserName:"粉丝4",HeadImage:"http://localhost:3000/4.jpg"},
//       {UserName:"粉丝5",HeadImage:"http://localhost:3000/5.jpg"},
//     ],
//     Focus:[
//       {UserName:"关注1",HeadImage:"http://localhost:3000/1.jpg",FocusFlag:true},
//       {UserName:"关注2",HeadImage:"http://localhost:3000/2.jpg",FocusFlag:false},
//       {UserName:"关注3",HeadImage:"http://localhost:3000/3.jpg",FocusFlag:true},
//       {UserName:"关注4",HeadImage:"http://localhost:3000/4.jpg",FocusFlag:false},
//       {UserName:"关注5",HeadImage:"http://localhost:3000/5.jpg",FocusFlag:true},
//     ],


// }
})
router.get("/GetFreshWeibo",async(ctx,next)=>{
  let FinalResult={};
  let WeiboList;
  await GetInterface.GetFreshWeibo().then(result=>{
    WeiboList=result;
  }) 
  FinalResult.WeiboList=WeiboList;
  console.log(FinalResult);
  ctx.body=FinalResult; 

})
router.get("/WeiboDetail",async(ctx,next)=>{
  console.log(ctx.request.query);
  let FinalResult;
  await GetInterface.GetWeibDetail(ctx.request.query.UserName,ctx.request.query.WeiboId,ctx.request.query.MyUserName).then(result=>{
    FinalResult=result;
    console.log(FinalResult);
  }) 
  ctx.body=FinalResult;
  //  ctx.body={
  //    UserName:"发表微博的用户",
  //    HeadImage:"http://localhost:3000/test.jpg",
  //    ZanCount:22,
  //    ZanFlag:true,
  //    Content:"测试微博内容",
  //    CommentList:[
  //      {UserName:"评论用户1",HeadImage:"http://localhost:3000/1.jpg",Content:"评论内容"},
  //      {UserName:"评论用户1",HeadImage:"http://localhost:3000/1.jpg",Content:"评论内容"},
  //      {UserName:"评论用户1",HeadImage:"http://localhost:3000/1.jpg",Content:"评论内容"},
  //      {UserName:"评论用户1",HeadImage:"http://localhost:3000/1.jpg",Content:"评论内容"},
  //      {UserName:"评论用户1",HeadImage:"http://localhost:3000/1.jpg",Content:"评论内容"},
  //    ],
  //    ImageList:["http://localhost:3000/1.jpg","http://localhost:3000/2.jpg","http://localhost:3000/3.jpg"]
  //  }
})
router.get("/SearchWeibo",async(ctx,next)=>{
  let FinalResult={};
  let WeiboList;
  await GetInterface.SearchWeibo(ctx.request.query.Key).then(result=>{
    WeiboList=result;
  }) 
  FinalResult.WeiboList=WeiboList;
  console.log(FinalResult);
  ctx.body=FinalResult; 
}) 


module.exports = app
