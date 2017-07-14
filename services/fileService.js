var fs = require('fs'),
    File = require('../models/file'),
    firebase = require('firebase');

//Firebase config
var config = {
    apiKey: "AIzaSyBymiC961ILwdtuz-V8UU_GW7ouYItiCL0",
    authDomain: "rest-starter.firebaseapp.com",
    databaseURL: "https://rest-starter.firebaseio.com",
    projectId: "rest-starter",
    storageBucket: "",
    messagingSenderId: "189033026622"
};

firebase.initializeApp(config);

var storage = firebase.database();

function FileService() {

    this.save = function(file) {

        var newFile = new File(file.originalname, file.size);

        return storage.ref('files').push(newFile).key;

    };

    this.get = function() {

        return storage.ref('files').once('value');

    }

    this.getOne = function(id) {

        return storage.ref('files/' + id).once('value');

    }

    this.update = function(id, file) {

        var newFile = new File(file.originalname, file.size);

        return storage.ref('files/' + id).update(newFile);

    }

    this.delete = function(id) {

        return storage.ref('files/' + id).remove();

    }
};

module.exports = new FileService();