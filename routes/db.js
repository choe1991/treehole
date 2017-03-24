var mysql = require('mysql');
var pool = mysql.createPool({
    host: 'www.xxx.com',
    user: 'root',
    password: 'joker12345',
    database: 'har',
    debug: true,
    dateStrings: true
});

function query(sql, callback) {
    pool.getConnection(function(err, connection) {
        if (err) throw err;
        connection.query(sql, function(err, rows) {
            callback(err, rows);
            connection.release(); //释放链接
        });
    });
}
exports.query = query;