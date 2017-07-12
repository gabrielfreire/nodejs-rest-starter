var Schedule = require('../models/schedule'),
    firebase = require('firebase');

var storage = firebase.database();

function ScheduleService() {
    this.save = function(schedule) {

        var scheduleId = Math.floor(Math.random() * 100),
            newSchedule = new Schedule(scheduleId,
                schedule.title,
                schedule.description,
                schedule.location,
                schedule.eventDate);

        storage.ref('schedules/' + scheduleId).set(newSchedule);

    }

    this.getAll = function() {

        return storage.ref('schedules').once('value');

    }

    this.update = function(schedule) {

    }

    this.delete = function(id) {

    }
}

module.exports = new ScheduleService();