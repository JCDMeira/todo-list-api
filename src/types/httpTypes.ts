import { Request, Response } from "express";

export type Req<T> = Request<any, any, T>;
export type Res = Response;
