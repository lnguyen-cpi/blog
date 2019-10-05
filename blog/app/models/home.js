var mysql = require('mysql')

const dbconfig = require('../../config/database');
const connection = mysql.createConnection(dbconfig.connection);
// select database - very important
connection.query(`USE ${dbconfig.database}`);


function resultsCallback(err, records) {
    if (err) {
        console.log(err);
        throw err;
    } else {
        return records;
    }
}
// cackabck hell

exports.getCategories = () => {
    return new Promise((resolve, reject) => {
        let selectQuery = "SELECT * FROM users WHERE status = 1";
        connection.query(selectQuery,[],(err, rows) => {
            if(err){
                reject(resultsCallback(err, null));
            }
            if(rows.length){
                resolve(resultsCallback(null,rows));
            } else {
                resolve(resultsCallback(null,null));
            }
        });
    });
    
}