var express = require('express'),
    sseExpress = require('sse-express'),
    fs = require('fs'),
    multer = require('multer'),
    fileService = require('../services/fileService'),
    uploaderRouter = express.Router(),
    upload = multer({ dest: '/tmp/' });

uploaderRouter
    .route('/files')
    .post(upload.single('file'), function(req, res) {
        var path = "./uploads/" + req.file.originalname,
            response;

        fs.readFile(req.file.path, function(err, data) {

            fs.writeFile(path, data, function(err) {

                if (err) {

                    response = {
                        message: 'An error ocurred',
                        filename: 'No file was uploaded',
                        status: '401'
                    };

                    res.status(401).send(response);

                } else {


                    //Save to database
                    var id = fileService.save(req.file);

                    response = {
                        message: 'File ' + req.file.originalname + ' uploaded successfully',
                        name: req.file.originalname,
                        id: id
                    };

                    //emit event to SSE
                    res.app.emit('changed', response);
                    //respond to client
                    res.status(200).send(response);

                }
            });

        });
    })
    .get(function(req, res) {

        fileService.get().then(function(snapshot) {

            if (snapshot.val() !== '') {

                var response = {
                    data: snapshot.val(),
                    status: '200',
                    message: 'Success'
                };

                res.status(401).send(response);

            }

        });

    });

module.exports = uploaderRouter;