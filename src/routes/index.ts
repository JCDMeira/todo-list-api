import express from "express";
import { appType } from "../types";
import globalRoutes from "./globalRoutes";
import UserRoutes from "./Auth/UserRoutes";

const routes = (app: appType) => {
  app.use(globalRoutes);
  app.use(UserRoutes);
};

export default routes;
