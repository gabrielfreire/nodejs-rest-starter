/**
 * SSE events controller
 */
var express = require('express'),
    eventsRouter = express.Router(),
    sseExpress = require('sse-express'),
    firebase = require('firebase');

eventsRouter.route('/updates')
    .get(sseExpress, function(req, res) {
        firebase.database().ref().on('value', function(data) {
            var _data = data;

            if (!_data) {
                _data = { message: 'No data was presented' };
            }

            res.sse('change', _data);
        });
    });

module.exports = eventsRouter;