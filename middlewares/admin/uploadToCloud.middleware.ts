import {Request, Response, NextFunction} from "express";
import { streamUpload } from "../../helpers/streamUpload.helper";

export const uploadToCloudinary = async (req: Request, res: Response, next: NextFunction) => {
  try {
    req.body["linkImg"] = [];
    const arrayBuffer = req["files"];
    for(let [key, value] of Object.entries(arrayBuffer)){
      const result = await streamUpload(value["buffer"]);
      req.body["linkImg"].push(result["url"]);
    }
    next();
  } catch (error) {
    console.log(error);
  }
}