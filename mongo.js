var assert = require('assert');
var bodyParser = require("body-parser");
var path= require("path");
var express = require('express');
var cors = require('cors');
var app = express();
var port = process.env.PORT || 8089;
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname +'/'));
app.post('/home', function (req,res) {
    var request = require('request');
    request('https://api.foursquare.com/v2/venues/explore?client_id=UI4R30BP32O2W3TNNZ4KUQVSXSNFHWATY3MK1XT0SDGRVY0V&client_secret=ZC5VMUCFNK1GR3N1F1SWSW1KF2DSJQVKXTLPOKP2VVR4RGUA&v=20180323&limit=3&near='+req.body.place+'&query='+req.body.filter, function (error, response, body) {
        if (error) {
            return console.log('Error:', error);
        }
        if (response.statusCode !== 200) {
            return console.log('Invalid Status Code Returned:', response.statusCode);
        }
      res.send(JSON.parse(response.body));
    })

});


var server = app.listen(8089, 'localhost', function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port)
});


/*

app.listen(port, function () {
    console.log("yayyyy");
});
*/
