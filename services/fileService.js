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

        storage.ref('files').push(newFile);

    };

    this.get = function() {

        return storage.ref('files').once('value');

    }
};

module.exports = new FileService();