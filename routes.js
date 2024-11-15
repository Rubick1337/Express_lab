const express = require("express");
const router = express.Router();

// Подключаем контроллеры
const BikeController = require("./controllers/BikeController");
const StatisticController = require("./controllers/StatisticController");

// Маршрут для получения списка велосипедов
router.get("/bikes", BikeController.getBikes);

// Маршрут для добавления нового велосипеда
router.post("/addbike", BikeController.addBike);

// Маршрут для получения статистики
router.post("/statistics", StatisticController.getStatistics);

module.exports = router;
