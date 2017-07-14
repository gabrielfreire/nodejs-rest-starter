/**
 * SSE is listening for 'changed' events on the backend so it can send a 'change' event to the client
 * TODO: Better ideas for this? 
 */
var express = require('express'),
    eventsRouter = express.Router(),
    sseExpress = require('sse-express');

eventsRouter.route('/updates')
    .get(sseExpress, function(req, res) {
        res.app.on('changed', function(data) {

            var _data = data;

            if (!_data) {
                _data = { message: 'No data was presented' };
            }

            res.sse('change', data);

        });
    });

module.exports = eventsRouter;