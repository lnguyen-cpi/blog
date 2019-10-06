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

// viet ham insert data

// viet ham update data

// viet ham delete data

// viet ham get all data - phan trang - tim kiem

// viet ham lay thong tin chi tiet theo id cua user -(update)

// CUD
