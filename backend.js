var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    uploaderRouter = require('./controllers/fileUploadCtrl'),
    scheduleRouter = require('./controllers/scheduleCtrl'),
    eventsRouter = require('./controllers/eventsCtrl');

app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(cors());

//API
app.use('/api', eventsRouter);
app.use('/api', uploaderRouter);
app.use('/api', scheduleRouter);

//Main page
app.get('/', function(req, res) {
    res.sendFile(__dirname + "/" + "index.html");
});

var server = app.listen(process.env.PORT || 8080, function() {

    console.log('App listening at http://%s:%s', process.env.URL || server.address().address, process.env.PORT || server.address().port);

});