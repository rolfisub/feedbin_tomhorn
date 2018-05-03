var fs = require('fs');
var demo = require('./demo');
var formatter = require('xml-formatter');

var counter = 0;
for(msg of demo) {
    var filename = counter.toString();
    if(filename.length >= 3) {
        filename = '0' + filename;
    } else if(filename.length === 2) {
        filename = '00' + filename;
    } else if(filename.length === 1) {
        filename = '000' + filename;
    }
    fs.writeFileSync('./partials/' + filename + '.xml', formatter(msg));
    counter++;
}
