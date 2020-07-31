const climate = require("./app/libs/climate");
const sqlite = require('sqlite3').verbose();   
const dbname = 'test.sqlite';                                       
const db = new sqlite.Database(dbname);
require('date-utils');



climate.climate().then(result => {
								console.log( result);

								var now_date = new Date();
								var date_str = now_date.toFormat("YYYY-MM-DD HH24:MM"); // data-utilsモジュールでの拡張を利用。

								db.serialize(function() {

								// テーブルがなければ作成
								db.run("CREATE TABLE IF NOT EXISTS clima(temp NUMERIC NOT NULL, humidity NUMERIC NOT NULL, created_datetime TIMESTAMP DEFAULT (datetime(CURRENT_TIMESTAMP,'localtime')))");

								// プリペアードステートメントでデータ挿入
								var stmt = db.prepare('INSERT INTO clima VALUES(?,?,?)');
								stmt.run([result.temp, result.humidity, date_str]);
								stmt.finalize();

								});

								db.each("SELECT * FROM clima limit 1", function(err, row) {
								console.log(row);
								});
								db.close();
							});




