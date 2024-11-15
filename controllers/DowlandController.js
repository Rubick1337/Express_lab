const fs = require("fs");
const path = require("path");
const xml2js = require("xml2js");

const bike_path = path.join(__dirname, "../data", "bikes.json");

exports.DownloadJson = (req, res) => {
    fs.readFile(bike_path, (err, data) => {
        if (err) {
            return res.status(500).json({ error: "Ошибка чтения файла" });
        }
        res.setHeader("Content-Disposition", "attachment; filename=bikes.json");
        res.setHeader("Content-Type", "application/json");
        res.send(data);
    });
};

exports.DownloadXml = (req, res) => {
    fs.readFile(bike_path, (err, data) => {
        if (err) {
            return res.status(500).json({ error: "Ошибка чтения файла" });
        }

        const bikes = JSON.parse(data);

        const builder = new xml2js.Builder({ rootName: "projects" });
        const xml = builder.buildObject({ bike: bikes });

        res.setHeader("Content-Disposition", "attachment; filename=bikes.xml");
        res.setHeader("Content-Type", "application/xml");
        res.send(xml);
    });
};

exports.DownloadHtml = (req, res) => {
    fs.readFile(bike_path, (err, data) => {
        if (err) {
            return res.status(500).json({ error: "Ошибка чтения файла" });
        }

        const bikes = JSON.parse(data);

        let html = '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>Bike Projects</title></head><body>';
        html += '<h1>Bike Projects</h1><ul>';

        bikes.forEach(bike => {
            html += `<li>${bike.model} | ${bike.type}</li>`;
        });

        html += '</ul></body></html>';

        res.setHeader('Content-Disposition', 'attachment; filename=bikes.html');
        res.setHeader('Content-Type', 'text/html');
        res.send(html);
    });
};
