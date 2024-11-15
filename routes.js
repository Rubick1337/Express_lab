const express = require("express");
const router = express.Router();

// Подключаем контроллеры
const BikeController = require("./controllers/BikeController");
const StatisticController = require("./controllers/StatisticController");
const DownloadController = require("./controllers/DowlandController")
// Маршрут для получения списка велосипедов
router.get("/bikes", BikeController.getBikes);

// Маршрут для добавления нового велосипеда
router.post("/addbike", BikeController.addBike);

// Маршрут для получения статистики
router.post("/statistics", StatisticController.getStatistics);

router.delete("/deletebike",BikeController.deleteBike)

router.get("/download/bikes/json", DownloadController.DownloadJson);
router.get("/download/bikes/xml", DownloadController.DownloadXml);
router.get("/download/bikes/html",DownloadController.DownloadHtml);
module.exports = router;
