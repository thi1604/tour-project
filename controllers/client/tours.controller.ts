import {Request, Response} from "express";

export const index = async(req:Request, res: Response) => {
  res.render("client/pages/tour/index.pug");
};