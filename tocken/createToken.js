const jwt=require("jsonwebtoken");
module.exports=function(UserName){
   const token=jwt.sign({UserName:UserName},'TOKEN',{expiresIn:"600000000s"});
  //  console.log(typeof token);
   return token;
}
