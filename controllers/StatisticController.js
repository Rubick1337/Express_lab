const fs = require("fs");
const path = require("path");
const bike_path = path.join(__dirname, "../data", "bikes.json");
const statistics_path = path.join(__dirname, "../data", "statistics.json");

exports.getStatistics = (req, res) => {
    fs.readFile(statistics_path, (err, data) => {
        if (err) {
            return res.status(500).json({ error: "Ошибка чтения статистики" });
        }
        try {
            res.json(JSON.parse(data));
        } catch (error) {
            return res.status(500).json({ error: "Ошибка парсинга статистики" });
        }
    });
};
