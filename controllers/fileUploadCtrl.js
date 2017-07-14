var express = require('express'),
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
                        filename: 'No file was uploaded'
                    };

                    res.status(401).send(response);

                } else {
                    response = {
                        message: 'File ' + req.file.originalname + ' uploaded successfully',
                        filename: req.file.originalname
                    };

                    fileService.save(req.file);
                    res.status(200).send(response);

                }
            });

        });
    })
    .get(function(req, res) {

        fileService.get().then(function(snapshot) {

            var response = {
                data: snapshot.val(),
                status: '200',
                message: 'Success'
            };

            res.status(200).send(response);

        });

    });

module.exports = uploaderRouter;