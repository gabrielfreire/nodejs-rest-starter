var express = require('express'),
    scheduleService = require('../services/scheduleService'),
    scheduleRouter = express.Router();

scheduleRouter
    .route('/schedules')
    .post(function(req, res) {

        var response = {
            data: req.body,
            message: 'success'
        };
        scheduleService.save(req.body);
        res.status(200).send(response);

    })
    .get(function(req, res) {
        scheduleService.getAll().then(function(snapshot) {
            res.status(200).send(snapshot.val());
        });
    });

scheduleRouter
    .route('/schedules/:id')
    .get(function(req, res) {
        scheduleService.getAll().then(function(snapshot) {
            var schedules = snapshot.val(),
                result = schedules[req.params.id];

            res.status(200).send(result);
        });
    });

module.exports = scheduleRouter;