const express = require('express');
var bodyParser = require('body-parser')
var async = require('express-async-await')
var fetc = require('node-fetch');
import * as path from "path"

const app = express();
const port = 3003;
app.use(express.static(path.join(__dirname, '')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

var sqlite = require('sqlite3').verbose();
var db = new sqlite.Database('baza.db');

db.getAsync = function (sql) {
    var that = this;
    return new Promise(function (resolve, reject) {
        that.get(sql, function (err, row) {
            if (err)
                reject(err);
            else
                resolve(row);
        });
    });
};

db.allAsync = function (sql) {
    var that = this;
    return new Promise(function (resolve, reject) {
        that.all(sql, function (err, rows) {
            if (err)
                reject(err);
            else {
                console.log("ok");
                resolve(rows);
            }
        });
    });
};

db.runAsync = function (sql, args = []) {
    var that = this;
    return new Promise(function (resolve, reject) {
        that.run(sql, args, function (err) {
            if (err)
                reject(err);
            else {
                console.log("ok");
                resolve();
            }
        });
    })
};

async function main() {
    try {
        var stmt;
        await app.listen(port, () => console.log(`Example app listening on port ${port}!`));

        app.get('/hello', (req, res) => {
            console.log("hello ok");
            res.send('Hello World!')
        });


        app.get('/pokemon', (req, res) => {
            stmt = `SELECT * FROM pokemon`;
            let states = db.allAsync(stmt);
            states.then((rows) => {
                //console.log(rows);
                res.send(rows);
            }).catch((reason) => {
                console.log('Handle rejected promise (' + reason + ') here.');
            });
        });

        app.post('/post', (req, res) => {

            stmt = `SELECT * FROM pokemon_types WHERE pokemon_id = "${req.body.id}"`;
            let states = db.allAsync(stmt);
            states.then((rows) => {
                console.log(rows);
                res.send(rows);
            }).catch((reason) => {
                console.log('Handle rejected promise (' + reason + ') here.');
            });
        });

        app.post('/post2', (req, res) => {

            stmt = `SELECT * FROM pokemon WHERE id = "${req.body.id}"`;
            let states = db.allAsync(stmt);
            states.then((rows) => {
                console.log(rows);
                res.send(rows);
            }).catch((reason) => {
                console.log('Handle rejected promise (' + reason + ') here.');
            });
        });



    } catch (e) {
        console.log(JSON.stringify(e));
    }
}


var x = main();