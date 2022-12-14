import path from "path";
import express, { Router } from "express";
import adminRouter from "./admin";
import otpRouter from "./otp";
import agentRouter from "./agent";
import clientRouter from "./client";
import addressRouter from "./address";
import unitRouter from "./unit";
import categoryRouter from "./category";
// import marketRouter from "./market";
// import shopRouter from "./shop";
import productRouter from "./product";
import demandRouter from "./demand";
import favouriteRouter from "./favourite";
import ratingRouter from "./rating";
import commentRouter from "./comment";
import chatRouter from "./chat";
import instagramRouter from "./instagram";
import dynamic_modelRouter from "./dynamic_model";
import phone_viewRouter from "./phone_view";
import dynamic_roleRouter from "./dynamic_role";
import complaintRouter from "./complaint";
import telegramRouter from "./telegram";
import statisticsRouter from "./statistics";
import bannerRouter from "./banner";
import invitedRouter from "./invited";
import chartRouter from "./chart";
import notificationRouter from "./notification";
import pricesRouter from "./prices";
import product_pricesRouter from "./product_prices";
import inquiryRouter from "./inquiry";

const router = Router({ mergeParams: true });

router.use("/v1/auth", otpRouter);
router.use("/v1/admin", adminRouter);
router.use("/v1/agent", agentRouter);
router.use("/v1/client", clientRouter);
router.use("/v1/address", addressRouter);
router.use("/v1/unit", unitRouter);
router.use("/v1/category", categoryRouter);
// router.use("/v1/market", marketRouter);
// router.use("/v1/shop", shopRouter);
router.use("/v1/product", productRouter);
router.use("/v1/demand", demandRouter);
router.use("/v1/favourite", favouriteRouter);
router.use("/v1/rating", ratingRouter);
router.use("/v1/comment", commentRouter);
router.use("/v1/chat", chatRouter);
router.use("/v1/instagram", instagramRouter);
router.use("/v1/dynamic-model", dynamic_modelRouter);
router.use("/v1/phone-view", phone_viewRouter);
router.use("/v1/dynamic-role", dynamic_roleRouter);
router.use("/v1/complaint", complaintRouter);
router.use("/v1/telegram", telegramRouter);
router.use("/v1/statistics", statisticsRouter);
router.use("/v1/banner", bannerRouter);
router.use("/v1/invited", invitedRouter);
router.use("/v1/chart", chartRouter);
router.use("/v1/notification", notificationRouter);
router.use("/v1/prices", pricesRouter);
router.use("/v1/product-prices", product_pricesRouter);
router.use("/v1/inquiry", inquiryRouter);
router.use("/v1/api/file", express.static(path.join(__dirname, "../../../uploads")));

export default router;
