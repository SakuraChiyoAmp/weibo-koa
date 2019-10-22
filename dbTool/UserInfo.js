const mysql = require('mysql');

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
        let sqlUserName=`SELECT * FROM USERINFO WHERE UserName="${UserName}"`;
         const  queryUserName=function checkUserName(sql){
           console.log(sql); 
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
        FinalResult=resultUserName[0];
        return FinalResult;
       },
//  LogOut:async function(UserName){
//         let FinalResult;
//         let sqlUserName=`DELETE from token WHERE UserName="${UserName}"`;
//          const  queryUserName=function checkUserName(sql){
//            console.log(sql); 
//            return new Promise((resolve,reject)=>{
//             connection.query(sql,function(err,result){
            
//               if (err){
//                 console.log("查询出错");
//               }else{
//                 resolve(result);
//               }
//            })
//            })
//          } 
//         let resultUserName=await queryUserName(sqlUserName).then(result=>{
//           FinalResult=result.affectedRows;
//         });
//         return FinalResult;
//        }

}