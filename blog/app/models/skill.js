var mysql = require('mysql');
//var moment = require('moment');

const dbconfig = require('../../config/database');
const connection = mysql.createConnection(dbconfig.connection);
// select database - very important
connection.query(`USE ${dbconfig.database}`);


function resultsCallback(err, records) {
    if (err) {
        throw err;
    } else {
        return records;
    }
}
// cackabck hell

exports.insertSkill = (dataInsert) => {
    
    return new Promise((resolve, reject) => {

        let insertQuery = "INSERT INTO skills(name_skill, level_skill, status, created_at, updated_at) VALUES(?, ?, ?, ?, ?)";
        connection.query(insertQuery, dataInsert, function(err, rows) {
            if(err){
                reject(resultsCallback(err, null));
            } else {
                resolve(resultsCallback(null, rows.insertId))
            }
        });
    });
}

exports.GetAll = (keyword = '') => {

    return new Promise((resolve, reject) => {
        if(keyword.length > 0){
            let selectQuery = "SELECT * FROM skills WHERE name_skill LIKE ? OR level_skill LIKE ?";
            connection.query(selectQuery, [keyword, keyword],  function(err, rows) {

                if(err) {
                    reject(resultsCallback(err, null));
                }
                else {
                    resolve(resultsCallback(null, rows))
                }
            });
        } else {
            let selectQuery = "SELECT * FROM skills";
            connection.query(selectQuery, [],  function(err, rows) {

                if(err) {
                    reject(resultsCallback(err, null));
                }
                else {
                    resolve(resultsCallback(null, rows))
                }
            });
        }
    });
}

exports.getbyId = (id) => {

    return new Promise((resolve, reject) => {

        let selectQuery = "SELECT * FROM skills WHERE id = ?";
        connection.query(selectQuery, [id],  function(err, rows) {

            if(err) {
                reject(resultsCallback(err, null));
            }
            else {
                resolve(resultsCallback(null, rows[0]));
            }
        })
    });
}

exports.editSkill = (dataInsert) => {

    return new Promise((resolve, reject) => {

        let editQuery = "UPDATE skills SET name_skill = ? , level_skill = ? , status = ?, updated_at = ? WHERE id = ?";
        connection.query(editQuery, dataInsert, function(err, rows) {
            if(err){
                console.log(err);
                reject(resultsCallback(err, null));
            } else {
                resolve(resultsCallback(null, rows.changedRows))
            }
        });
    });
}

exports.deactiveSkill = (dataInsert) => {

    return new Promise((resolve, reject) => {

        let editQuery = "UPDATE skills SET status = ?, updated_at = ? WHERE id = ?";
        connection.query(editQuery, dataInsert, function(err) {
            if(err){
                console.log(err);
                reject(resultsCallback(err, false));
            } else {
                resolve(resultsCallback(null, true))
            }
        });
    });
}