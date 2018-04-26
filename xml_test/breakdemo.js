var fs = require('fs');
var demo = require('./demo');
var formatter = require('xml-formatter');

var counter = 0;
for(msg of demo) {
    fs.writeFileSync('./msgs/' + counter + '.xml', formatter(msg));
    counter++;
}
