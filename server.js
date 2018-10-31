var cors = require('cors');
var request= require('request');
var express = require('express');

var app = express();

var port = process.env.PORT || 8083;

app.use(express.static(__dirname + '/public'));
app.use(cors());
app.get('/', function(req, res) {
	res.render('index');
})

app.post('/display', function (req, res) {
    console.log(req.query.searchkey);
    //console.log(req.query.searchkey2);
    var searchKeyword = req.query.searchkey;
    request("https://api.foursquare.com/v2/venues/explore?client_id=UI4R30BP32O2W3TNNZ4KUQVSXSNFHWATY3MK1XT0SDGRVY0V&client_secret=ZC5VMUCFNK1GR3N1F1SWSW1KF2DSJQVKXTLPOKP2VVR4RGUA&v=20180323&limit=3&near=" + "Kansas City"+ "&query=" + "Hospitals", function (error, data, body) {
        //Check for error
        if (error) {
            return console.log('Error:', error);
        }
        console.log(data.body);
        res.send(JSON.parse(data.body));
        //Check for right status code
        if (data.statusCode !== 200) {
            return console.log('Invalid Status Code Returned:', data.statusCode);
        }
    });
});

// app.get('/getData', function (req, res) {
//     var searchKeyword = req.query.searchkey;
//     request("https://kgsearch.googleapis.com/v1/entities:search?query="+searchKeyword+"&key=AIzaSyCZbMz2VUDfsNIawl7W9W64FpZp8gsoh10&limit=1&indent=True", function (error, response, body) {
//         res.send(body);
//     });
//
//
//
// });

app.listen(port, function() {
	console.log('app running')
})

