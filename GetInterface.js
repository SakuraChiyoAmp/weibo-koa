const mysql = require('mysql');
const UserInfo=require("./dbTool/UserInfo")
const Focus =require("./dbTool/Focus")
const Weibo=require("./dbTool/Weibo")
var connection = mysql.createConnection({     
  host     : 'localhost',       
  user     : 'root',              
  password : '1998Zhenwucxy!',       
  port: '3306',                   
  database: 'hanjia' 
});
connection.connect();
module.exports ={
  
  GetUserInfo:async function  (UserName){
        let FinalResult={};
        await UserInfo.GetUserInfo(UserName).then(result=>{
          FinalResult=result;
        })
        return FinalResult;
       },
   GetMyInfo:async function(UserName){
        let FinalResult={}
        console.log("里面的"+UserName)
        await UserInfo.GetUserInfo(UserName).then(result=>{
          FinalResult.UserName=result.UserName;
          FinalResult.HeadImage=result.HeadImage;
        })
        await Focus.GetFans(UserName).then(result=>{
          FinalResult.Fans=result;
        })
        await Focus.GetFocus(UserName).then(result=>{
          FinalResult.Focus=result;
        })
        await Weibo.GetWeibo(UserName).then(result=>{
          FinalResult.WeiboList=result;
          for (let i of FinalResult.WeiboList){
            console.log("检测"+i.ImageList);
          }
        })
        return FinalResult;
       },
       GetOtherInfo:async function(UserName,OtherUserName){
        let FinalResult={}
        console.log("里面的"+OtherUserName)
        await UserInfo.GetUserInfo(OtherUserName).then(result=>{
          FinalResult.UserName=result.UserName;
          FinalResult.HeadImage=result.HeadImage;
        })
        await Focus.GetIfFocus(UserName,OtherUserName).then(result=>{
          FinalResult.FocusFlag=result.FocusFlag;
        })
        await Focus.GetFans(OtherUserName).then(result=>{
          FinalResult.Fans=result;
        })
        await Focus.GetFocus(OtherUserName).then(result=>{
          FinalResult.Focus=result;
        })
        await Weibo.GetWeibo(OtherUserName).then(result=>{
          FinalResult.WeiboList=result;
          for (let i of FinalResult.WeiboList){
            console.log("检测"+i.ImageList);
          }
        })
        return FinalResult;
       },
       GetWeibDetail:async function(UserName,WeiboId,MyUserName){
         let FinalResult={};
         console.log("内部得到的用户名"+MyUserName);
         await Weibo.GetWeiboById(WeiboId).then(result=>{
            FinalResult=result;
         })
         await Weibo.GetIfDianzan(MyUserName,WeiboId).then(result=>{
           FinalResult.ZanFlag=result.ZanFlag; 
           console.log("得到的点赞标记"+FinalResult.ZanFlag); 
         })
         await Weibo.GetCommentList(WeiboId).then(result=>{
           FinalResult.CommentList=result;
         })
        
         return FinalResult;
       },
       GetFreshWeibo:async function(){
         let FinalResult={};
         await Weibo.GetFreshWeibo().then(result=>{
           FinalResult=result;
         })
         return FinalResult;    
       },
       SearchWeibo:async function(Key){
        let FinalResult={};
        await Weibo.SearchWeibo(Key).then(result=>{
          FinalResult=result;
        })
        return FinalResult; 
       }
     
}