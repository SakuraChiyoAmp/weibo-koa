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
  GetIfFocus:async function  (UserName,OtherUserName){
        let FinalResult={}
        let sqlUserName=`SELECT FocusFlag FROM Focus WHERE UserName="${UserName}" and OtherUserName="${OtherUserName}"`;

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
        if (resultUserName.length==0||resultUserName[0].FocusFlag==0){
          FinalResult={FocusFlag:false}
        }else{
          FinalResult={FocusFlag:true}
        }
        return FinalResult;
      },
      GetFans:async function  (UserName){
        let FinalResult=[]
        let UserNameList=[];
        let sqlUserName=`SELECT UserName FROM Focus WHERE OtherUserName="${UserName}" And FocusFlag="1"`;
   
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
        UserNameList=resultUserName;
        var promiseImageList=[];
        console.log("得到");
          for (let i of UserNameList){
            console.log("名字是"+i.UserName);
            console.log(typeof promiseImageList);
            console.log(promiseImageList.length);
          await UserInfo.GetUserInfo(i.UserName).then(result=>{
            FinalResult.push({UserName:i.UserName,HeadImage:result.HeadImage,FocusFlag:true});
          });
       
          
          }
          for (let i of FinalResult){
            console.log("开始遍历"+i.HeadImage);
          }
        return FinalResult;
      },
      GetFocus:async function  (UserName){
        let FinalResult=[]
        let UserNameList=[];
        let sqlUserName=`SELECT OtherUserName FROM Focus WHERE UserName="${UserName}" And FocusFlag="1"`;
        
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
        UserNameList=resultUserName;
        var promiseImageList=[];
        console.log("得到"+UserNameList);
          for (let i of UserNameList){
 
          await UserInfo.GetUserInfo(i.OtherUserName).then(result=>{
            FinalResult.push({UserName:i.OtherUserName,HeadImage:result.HeadImage,FocusFlag:true});
          });
       
          
          }

        return FinalResult;
      },
}