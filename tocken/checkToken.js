const jwt = require("jsonwebtoken");
module.exports = async (ctx, next) => {
  console.log(ctx.path);
  if (ctx.path!="/Login"&&ctx.path!="/SignUp"&&ctx.path!="/PushWeibo"){
  // const authorization = ctx.request.header.authorization;
  const authorization = ctx.get('Authorization');
  if (authorization === '') {
    ctx.throw(401, 'no token detected in http headerAuthorization');
  }
  // console.log("拿到的"+authorization)
  const token = authorization.split(' ')[1];
  let tokenContent;
  try {
    console.log("拿到的"+token)
    tokenContent = await jwt.verify(token,'TOKEN');//如果token过期或验证失败，将抛出错误
  } catch (err) {
    ctx.throw(401, 'invalid token');
  }
}
await next();
};