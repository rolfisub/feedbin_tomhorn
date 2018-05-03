var fs = require("fs");
var path = require("path");
var request = require("sync-request");

var dir = "./partials/";
var files = [];
fs.readdirSync(dir).forEach(function(file){
    files.push(file);
});

var index = 0;
var intervalId = setInterval(()=> {
    var file = files[index];
    var content = fs.readFileSync(path.resolve(dir + file));
    var result = request("POST", "http://localhost:3000/live", {
        headers: {
            "Content-Type":"application/xml"
        },
        body: content
    });
    console.log(file);
    index++;
    if(index >= files.length) {
        clearInterval(intervalId);
    }

}, 200);
