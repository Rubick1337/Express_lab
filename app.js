const express = require("express");
const path = require("path");
const routes = require("./routes");

const app = express();

app.use(express.static("public"));
app.use(express.json());
//GET-сервис, который возвращает веб-страницу с фронтенд-кодом;
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.use("/", routes);

app.listen(3000, () => {
    console.log("Сервер запущен на порту 3000");
});
