import type { Express } from "express";
import session from "express-session";

function create_cookie(app: Express) {
  app.use(
    session({
      // 这是一个用于对会话 ID 相关的 cookie 进行签名的密钥
      secret: process.env.session_key || "PQJ secret key",
      // 此选项决定了是否每次请求都强制将会话保存到存储中，即使会话没有被修改
      resave: true,
      // 此选项决定了是否将未初始化的会话保存到存储中
      saveUninitialized: true,
      cookie: {
        // 当设置为 true 时，cookie 只能通过 HTTPS 发送
        secure: false,
        // 当设置为 true 时，cookie 仅能通过 HTTP（或 HTTPS）协议访问，而不能通过 JavaScript 访问
        httpOnly: false,
        // 这是一个以毫秒为单位的数字，表示 cookie 的失效时长
        maxAge: Number(process.env!.session_time) || 60 * 60 * 2,
      },
    })
  );
}

export { create_cookie };
