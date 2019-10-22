const mysql = require('mysql');
const UserInfo=require("./UserInfo")
var connection = mysql.createConnection({     
  host     : 'localhost',       
  user     : 'root',              
  password : '1998Zhenwucxy!',       
  port: '3306',                   
  database: 'hanjia' 
});
connection.connect();
module.exports ={
  GetWeibo:async function  (UserName){
        let FinalResult=[];
        let sqlUserName=`SELECT WeiboId,UserName,Content FROM Weibo WHERE UserName="${UserName}"`;
       
         const  queryUserName=function checkUserName(sql){
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
        for (let i of resultUserName){
          let item=i;
            await UserInfo.GetUserInfo(i.UserName).then(result=>{
                  item.HeadImage=result.HeadImage;
            })
            await this.GetWeiboImage(item.WeiboId).then(result=>{
                  item.ImageList=result;
            })
            FinalResult.push(item);
          }
          // for (let i of FinalResult){
          //   console.log("外部检测"+i.ImageList);
          // }
        return FinalResult;
       },
       GetFreshWeibo:async function(){
        let FinalResult=[];
        let sqlUserName=`SELECT * FROM weibo ORDER BY rand() LIMIT 30;`;
   
         const  queryUserName=function checkUserName(sql){
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
        for (let i of resultUserName){
          let item=i;
            await UserInfo.GetUserInfo(i.UserName).then(result=>{
                  item.HeadImage=result.HeadImage;
            })
            await this.GetWeiboImage(item.WeiboId).then(result=>{
                  item.ImageList=result;
            })
            FinalResult.push(item);
          }
        return FinalResult;
       },
       SearchWeibo:async function(Key){
        let FinalResult=[];
        let sqlUserName=`SELECT * from weibo  WHERE content LIKE '%${Key}' or content LIKE '%${Key}%' or Content like '${Key}%';`;
   
         const  queryUserName=function checkUserName(sql){
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
        for (let i of resultUserName){
          let item=i;
            await UserInfo.GetUserInfo(i.UserName).then(result=>{
                  item.HeadImage=result.HeadImage;
            })
            await this.GetWeiboImage(item.WeiboId).then(result=>{
                  item.ImageList=result;
            })
            FinalResult.push(item);
          }
        return FinalResult;
       },
  GetWeiboImage:async function  (WeiboId){
        let FinalResult=[];
        let sqlUserName=`SELECT Url FROM WeiboImage WHERE WeiboId=${WeiboId}`;
       
         const  queryUserName=function checkUserName(sql){
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
        for (let i of resultUserName){
          FinalResult.push(i.Url);
        }

        return FinalResult;
       },
  GetWeiboById:async function (WeiboId){
    let FinalResult=[];
    let sqlUserName=`SELECT WeiboId,UserName,Content,ZanCount FROM Weibo WHERE WeiboId="${WeiboId}"`;
   
     const  queryUserName=function checkUserName(sql){
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
    resultUserName=resultUserName[0];
 
        await UserInfo.GetUserInfo(resultUserName.UserName).then(result=>{
          resultUserName.HeadImage=result.HeadImage;
        })
        await this.GetWeiboImage(resultUserName.WeiboId).then(result=>{
          resultUserName.ImageList=result;
        })

        FinalResult=resultUserName;
    return FinalResult; 
  },
  GetIfDianzan:async function(UserName,WeiboId){ 
    let FinalResult={}
    let sqlUserName=`SELECT ZanFlag FROM Zan WHERE UserName="${UserName}" and WeiboId=${WeiboId}`;
    console.log(sqlUserName);
     const  queryUserName=function checkUserName(sql){
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
    if (resultUserName.length==0||resultUserName[0].ZanFlag==0){
      FinalResult={ZanFlag:false}
    }else{
      FinalResult={ZanFlag:true} 
    }
    return FinalResult;
  },
  GetCommentList:async function(WeiboId){
    let FinalResult=[];
    let sqlUserName=`SELECT UserName,Comment FROM WeiboComment WHERE WeiboId="${WeiboId}"`;
  
     const  queryUserName=function checkUserName(sql){
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
    for (let i of resultUserName){
      let item=i;
    
        await UserInfo.GetUserInfo(i.UserName).then(result=>{
              item.HeadImage=result.HeadImage;
        })
        FinalResult.push(item);
      }
    return FinalResult;    
  }           
}