var fs = require("fs");
var path = require("path");
var request = require("sync-request");

var dir = "./partials/";
fs.readdirSync(dir).forEach(function(file){

    var content = fs.readFileSync(path.resolve(dir + file));
    var result = request("POST", "http://localhost:3000/live", {
        headers: {
            "Content-Type":"application/xml"
        },
        body: content
    });
    console.log(file);

});
