var Schedule = require('../models/schedule'),
    firebase = require('firebase');

var storage = firebase.database();

function ScheduleService() {
    this.save = function(schedule) {

        var newSchedule = new Schedule(schedule.title,
            schedule.description,
            schedule.location,
            schedule.eventDate);

        storage.ref('schedules').push(newSchedule);

    }

    this.getAll = function() {

        return storage.ref('schedules').once('value');

    }

    this.getOne = function(id) {

        return storage.ref('schedules/' + id).once('value');

    }

    this.update = function(schedule) {

    }

    this.delete = function(id) {

    }
}

module.exports = new ScheduleService();