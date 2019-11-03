var mysql = require('mysql');

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



exports.editAbout = (dataInsert) => {

    return new Promise((resolve, reject) => {

        let editQuery = "UPDATE about SET Content = ? , updated = ? WHERE id = ?";
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