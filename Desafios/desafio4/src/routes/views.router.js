import express from "express";
const { Router } = express;
const router = new Router();

router.get("/home", (req, res) => {
  res.render("home", {});
});

router.get("/realtimeproducts", (req, res) => {
  res.render("realTimeProducts", {});
});

export { router as routerHome };