var mysql = require("promise-mysql");
var request = require("sync-request");
var config  = require("../server/config");


console.log(config);

var from = 1564;

var pool = mysql.createPool(config.mysql.config);

pool.getConnection().then((con)=> {
    console.log("Connected to Mysql");

    var query = "select * from liveodds_msgs";
    console.log("getting msgs...");
    con.query(query).then((values)=> {
        console.log("done.");
        console.log("stating replay...");
        var index = 0 + from;
        var intervalId = setInterval(()=>{
            var msg = values[index];
            console.log(index);
            var response = request("POST", "http://45.76.158.229:3000/live", {
                headers: {
                    "Content-Type":"application/json"
                },
                body: msg.msg
            });
            console.log(response);
            index++;
            if(index >= values.length) {
                clearInterval(intervalId);
            }
        }, 10);

    });



}).catch((err)=>{
    console.log(err);
});



