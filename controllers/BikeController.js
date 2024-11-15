const { error } = require("console");
const fs = require("fs");
const path = require("path");
const bike_path = path.join(__dirname, "../data", "bikes.json");
const statistics_path = path.join(__dirname, "../data", "statistics.json");

//GET-сервис, который возвращает какие-то данные в формате JSON;
exports.getBikes = (req,res) =>
{
    fs.readFile(bike_path,(err,data)=>
    {
        if(err)
        {
            return res.status(500).json({ error: "Ошибка чтения данных" });
        }
        try {
            res.json(JSON.parse(data));
        } catch (error) {
            return res.status(500).json({ error: "Ошибка парсинга данных" });
        }
    })
}
//POST-сервис, который принимает какие-то данные;
exports.addBike = (req, res) => {
    const { type, model } = req.body;

    if (!type) {
        return res.status(400).json({ error: "Нету типа велосипеда" });
    }
    if (!model) {
        return res.status(400).json({ error: "Нету модели велосипеда" });
    }

    const formattedType = type.charAt(0).toUpperCase() + type.slice(1).toLowerCase();

    fs.readFile(bike_path, (err, data) => {
        if (err) {
            return res.status(500).json({ error: "Ошибка чтения файла с велосипедами" });
        }

        let bikes = JSON.parse(data);


        let maxId = bikes.reduce((max, bike) => (bike.id > max ? bike.id : max), 0);
        let newBike = {
            "id": maxId + 1,
            "model": model,
            "type": formattedType
        };

        bikes.push(newBike);

        fs.writeFile(bike_path, JSON.stringify(bikes, null, 2), (err) => {
            if (err) {
                return res.status(500).json({ error: "Ошибка записи файла с велосипедами" });
            }


            fs.readFile(statistics_path, (err, data) => {
                if (err) {
                    return res.status(500).json({ error: "Ошибка чтения файла статистики" });
                }

                let statistics = JSON.parse(data);

                let findObject = statistics.find(object => object.direction === formattedType);

                if (findObject) {
                    findObject.count = (parseInt(findObject.count) + 1).toString();
                } else {
                    statistics.push({
                        direction: formattedType,
                        count: "1" 
                    });
                }

                fs.writeFile(statistics_path, JSON.stringify(statistics, null, 2), (err) => {
                    if (err) {
                        return res.status(500).json({ error: "Ошибка записи файла с статистикой" });
                    }
                });
                res.status(201).json({ message: "Велосипед успешно добавлен", bike: newBike });
            });
        });
    });

};

//DELETE-сервис для отмены или удаления каких-то данных;
exports.deleteBike = (req, res) => {
    const { id } = req.body; 
    if (!id) {
        return res.status(400).json({ message: "Введите ID" });
    }

    const indexToRemove = parseInt(id) - 1;

    fs.readFile(bike_path, (err, data) => {
        if (err) {
            return res.status(500).json({ error: "Ошибка чтения файла" });
        }

        let bikes = JSON.parse(data);


        if (indexToRemove >= 0 && indexToRemove < bikes.length) {
            const deleteBike = bikes.splice(indexToRemove, 1)[0];


            fs.writeFile(bike_path, JSON.stringify(bikes, null, 2), (err) => {
                if (err) {
                    return res.status(500).json({ error: "Ошибка записи файла" });
                } 
            });
        }
        res.status(200).json({message:"Велосипед успешно удален"}) 
    });
};
