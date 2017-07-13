var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    uploaderRouter = require('./controllers/fileUploadCtrl'),
    scheduleRouter = require('./controllers/scheduleCtrl');

app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

//API
app.use('/api', uploaderRouter);
app.use('/api', scheduleRouter);

//Main page
app.get('/', function(req, res) {
    res.sendFile(__dirname + "/" + "index.html");
});

var server = app.listen(8080, function() {

    console.log('App listening at http://%s:%s', server.address().address, server.address().port);

});