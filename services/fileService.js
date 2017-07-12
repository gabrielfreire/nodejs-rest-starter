var fs = require('fs'),
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

        var fileId = Math.floor(Math.random() * 100);

        storage.ref('files/' + fileId).set({ id: fileId, filename: file.originalname });

    };

    this.get = function() {

        return storage.ref().once('value');

    }
};

module.exports = new FileService();