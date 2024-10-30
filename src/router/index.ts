import express, { Express } from "express";
import path from "path";

function router_create(app: Express) {
  // 管理员路由
  // 用户路由
  app.use("/page", express.static(path.join(__dirname, "public")));
  // 设置404
  app.use("*", (req: express.Request, res: express.Response) => {
    res.status(404).send({
      data: null,
      meta: {
        message: "Not Found",
        status: 404,
      },
      success: false,
    });
  });
}

export default router_create;
