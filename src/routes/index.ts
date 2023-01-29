import express from "express";
import { appType } from "../types";
import globalRoutes from "./globalRoutes";

const routes = (app: appType) => {
  app.use(globalRoutes);
};

export default routes;
