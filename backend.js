var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    uploaderRouter = require('./controllers/fileUploadCtrl');

app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//API
app.use('/api', uploaderRouter);

//Main page
app.get('/', function(req, res) {
    res.sendFile(__dirname + "/" + "index.html");
});

var server = app.listen(8080, function() {

    console.log('App listening at http://%s:%s', server.address().address, server.address().port);

});