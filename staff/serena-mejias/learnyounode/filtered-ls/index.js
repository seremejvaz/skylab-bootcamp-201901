var fs = require("fs");

var path = require("path")

fs.readdir(process.argv[2], function callback(err, list) {
    if(err) {
        throw Error;
    } else {
        list.filter(file => {
           return path.extname(file) === `.${process.argv[3]}`
        }).forEach(file => console.log(file))
    }
} )