var fs = require('fs'),
    express = require('express'),
    youtubedl = require('youtube-dl'),
    path = require('path'),
    videosRouter = express.Router();

videosRouter.route('/download')
    .post(function(req, res) {

        var video = youtubedl(req.body.url, ['-f', '18']),
            file;

        video.on('info', function(info) {

            file = path.join(__dirname, info._filename);

            video.pipe(fs.createWriteStream(file));

        });
        video.on('end', function() {
            res.download(file);
        });
    });

module.exports = videosRouter;