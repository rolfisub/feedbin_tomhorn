var moment = require("moment-timezone");


var time = 1524668400;
var format = "YYYY-MM-DD HH:MM:SS";
var myTZ = "America/New_York";
var utc = "Etc/UTC";

var dateStr = moment.unix(time).format(format).toString();

var m = moment.tz(dateStr, utc);

console.log(m.format(format).toString());
console.log(m.tz(myTZ).format(format).toString());


