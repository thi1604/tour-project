import { Request, Response } from "express"


export const index = async (req: Request, res: Response) => {
  res.render("admin/pages/home/index.pug", {
    pageTitle: "Trang dashboard", 
    account: {},
    statistic: {},
    role: {}
  });
  // res.send("oke");
};