import express from "express";
import { appType } from "../types";
import globalRoutes from "./globalRoutes";

const routes = (app: appType) => {
  app.route("/").get((req, res) => res.status(200).json({ message: "hello" }));
};

export default routes;
