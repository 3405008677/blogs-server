// 加载环境变量 process.env
// 默认读取项目根目录下的.env文件
import dotenv from "dotenv";
// 导入express包 加入ts类型
import express from "express";
import { join } from "path";
// 导入数据库接口
import { db } from "../SQL/index";
// 定义一个路由处理函数,处理根路由
import router_create from "./router";
// 引入令牌
import { create_cookie } from "./cookie";

// 实例化express对象
const app = express();
dotenv.config();

// 插件化的设计(洋葱模型)
// 静态文件处理
app.use(express.static("public", { index: "index.html" }));
app.use(express.static(join(__dirname, "public")));

// 解析body,不然服务器解析不了json数据
// post的data数据接收不到
app.use(express.json());

// 解析form表单的数据
app.use(express.urlencoded({ extended: true }));

// 引入令牌
create_cookie(app);

// 引入API
router_create(app);

// --------------------------------开启服务----------------------------

// 设置端口号
const sever_port = process.env.sever_port;
// 监听port端口,开始HTTP服务
app.listen(sever_port, () => {
  console.log(`http://localhost:${sever_port}`);
});

// 结束进程
process.on("SIGINT", async () => {
  // 关闭数据库链接
  await db.close();
  //方法指示 Node.js 以 code 的退出状态同步终止进程。
  process.exit();
});
