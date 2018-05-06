var mysql = require("promise-mysql");
var request = require("sync-request");
var config  = require("../server/config");


console.log(config);

var from = 1500;

var pool = mysql.createPool(config.mysql.config);

pool.getConnection().then((con)=> {
    console.log("Connected to Mysql");

    var query = "select * from liveodds_msgs";
    console.log("getting msgs...");
    con.query(query).then((values)=> {
        console.log("done.");
        console.log("stating replay...");
        var index = 0 + from;
        setInterval(()=>{
            var msg = values[index];
            console.log(index);
            var result = request("POST", "http://localhost:3000/live", {
                headers: {
                    "Content-Type":"application/json"
                },
                body: msg.msg
            });
            console.log(result);
            index++;
        }, 10);

    });



}).catch((err)=>{
    console.log(err);
});



