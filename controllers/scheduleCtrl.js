var express = require('express'),
    scheduleService = require('../services/scheduleService'),
    scheduleRouter = express.Router();

scheduleRouter
    .route('/schedules')
    .post(function(req, res) {

        var response = {
            message: 'Success',
            status: '200'
        };

        scheduleService.save(req.body);
        res.status(200).send(response);

    })
    .get(function(req, res) {

        scheduleService.getAll().then(function(snapshot) {

            var response = {
                status: '200',
                message: 'Success',
                data: snapshot.val()
            };

            res.status(200).send(response);

        });

    });

scheduleRouter
    .route('/schedules/:id')
    .get(function(req, res) {

        scheduleService.getOne(req.params.id).then(function(snapshot) {

            var response = {
                status: '200',
                message: 'Success',
                data: snapshot.val()
            };

            res.status(200).send(response);

        });

    })
    .put(function(req, res) {
        var id = req.params.id,
            newSchedule = req.body;

        scheduleService.update(id, newSchedule).then(function() {

            var response = {
                status: '200',
                message: 'Success'
            };

            res.status(200).send(response);
        });
    })
    .delete(function(req, res) {
        var id = req.params.id;

        scheduleService.delete(id).then(function() {

            var response = {
                status: '200',
                message: 'Success'
            };

            res.status(200).send(response);
        });
    });

module.exports = scheduleRouter;