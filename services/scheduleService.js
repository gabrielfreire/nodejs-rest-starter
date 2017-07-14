var Schedule = require('../models/schedule'),
    firebase = require('firebase');

var storage = firebase.database();

function ScheduleService() {
    this.save = function(schedule) {

        var newSchedule = new Schedule(schedule.title, schedule.description, schedule.location, schedule.eventDate);

        storage.ref('schedules').push(newSchedule);

    }

    this.getAll = function() {

        return storage.ref('schedules').once('value');

    }

    this.getOne = function(id) {

        return storage.ref('schedules/' + id).once('value');

    }

    this.update = function(id, schedule) {

        var newSchedule = new Schedule(schedule.title, schedule.description, schedule.location, schedule.eventDate);

        return storage.ref('schedules/' + id).update(newSchedule);
    }

    this.delete = function(id) {

        return storage.ref('schedules/' + id).remove();

    }
}

module.exports = new ScheduleService();