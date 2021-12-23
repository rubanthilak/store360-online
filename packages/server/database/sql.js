require("dotenv").config();
const mysql = require("mysql");

const config = {
    host     : process.env.DB_HOST,
    user     : process.env.DB_USER,
    password :  process.env.DB_PASSWORD,
    database : process.env.DB_NAME
}
  
var connection = mysql.createConnection(config);

var executeSqlQuery = function (query) {
    return new Promise(function (resolve, reject) {
        connection.query(query, function (err, result) {
            if (!err) {
                resolve(result);
            } else {
                reject({
                    status: "error",
                    message: "Error Getting Data",
                    debug: err
                });
            }
        });
    });
};

exports.connection = connection ;
exports.executeSqlQuery= executeSqlQuery;

