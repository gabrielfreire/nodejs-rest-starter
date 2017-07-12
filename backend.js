var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var uploaderRouter = require('./controllers/fileUploadCtrl');

//TODO - DB CONNECTION
// var PORT = 8080;
// var HOST_NAME = 'localhost';
// var DATABASE_NAME = 'imageList';

// mongoose.connect('mongodb://' + HOST_NAME + '/' + DATABASE_NAME);


app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//API
app.use('/api', uploaderRouter);

app.get('/', function(req, res) {
    res.sendFile(__dirname + "/" + "index.html");
});

var server = app.listen(8080, function() {
    console.log('App listening at http://%s:%s', server.address().address, server.address().port);
});