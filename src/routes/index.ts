import express from "express";
import { appType } from "../types";
import globalRoutes from "./globalRoutes";
import UserRoutes from "./Auth/UserRoutes";
import Auth from "../middleware/auth";

const routes = (app: appType) => {
  app.use(globalRoutes);
  app.use(Auth);
  app.use(UserRoutes);
};

export default routes;
