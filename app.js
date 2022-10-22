const express = require("express");

const app = express();
const https = require("https");
const fs = require("fs");
const path = require("path");

// key文件
const privateKey = fs.readFileSync(
  path.join(__dirname, "./httpsKeys/2_24years.top.key"),
  "utf8"
);
//crt文件
const certificate = fs.readFileSync(
  path.join(__dirname, "./httpsKeys/1_24years.top_bundle.crt"),
  "utf8"
);
const credentials = {
  key: privateKey,
  cert: certificate,
};
const httpsServer = https.createServer(credentials, app);
const router = require("./router/router");

// const multer = require("multer");
const port = 4445;

//解决跨域问题
app.use((req, res, next) => {
  // 设置是否运行客户端设置 withCredentials
  // 即在不同域名下发出的请求也可以携带 cookie
  res.header("Access-Control-Allow-Credentials", true);
  // 第二个参数表示允许跨域的域名，* 代表所有域名
  res.header("Access-Control-Allow-Origin", "*"); //配置80端口跨域
  // res.header('Access-Control-Allow-Origin', '*')//配置80端口跨域
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, OPTIONS"); // 允许的 http 请求的方法
  // 允许前台获得的除 Cache-Control、Content-Language、Content-Type、Expires、Last-Modified、Pragma 这几张基本响应头之外的响应头
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, Content-Length, X-Requested-With"
  );
  if (req.method == "OPTIONS") {
    res.sendStatus(200);
  } else {
    next();
  }
});

// const upload = multer({dest:'./upload'});
// app.post('/api/inputfileupload',upload.single('file'),(req,res)=>{
//     console.log("reqshhhh:::",req)
//     res.send({code:200,msg:'上传成功'});
// })

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/api", router);
httpsServer.listen(port, () => {
  console.log(`listening on port“成功”:port in ${port}`);
});
