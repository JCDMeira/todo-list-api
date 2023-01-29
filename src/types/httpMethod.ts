import { Request, Response } from "express";

// Request<P, ResBody, ReqBody, ReqQuery, Locals> {}

interface httpMethod<Z, Y, T> {
  req: Request<Z, Y, T>;
  res: Response;
}

export default httpMethod;
