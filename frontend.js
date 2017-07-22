//DOM Shortcuts
var fileHolder = document.querySelector('#file_holder'),
    fileBrowser = document.querySelector('#file_rowser'),
    submit = document.querySelector('#submiter'),
    listHolder = document.querySelector('#list_holder'),
    filesList = document.querySelector('#files'),
    schedulesList = document.querySelector('#schedules'),
    label = document.querySelector('#success_label'),
    panelBody = document.querySelector('.panel-body'),
    downloadBtn = document.querySelector('#btnDownload'),
    videoUrl = document.querySelector('#videoUrl'),
    downloadForm = document.querySelector('#downloadForm'),
    fileName;

//send request with window.open
var open = function(verb, url, data, target) {

    var form = document.createElement("form");

    form.action = url;
    form.method = verb;
    form.target = target || "_self";

    if (data) {

        for (var key in data) {

            var input = document.createElement("textarea");
            input.name = key;
            input.value = typeof data[key] === "object" ? JSON.stringify(data[key]) : data[key];
            form.appendChild(input);

        }

    }

    form.style.display = 'none';
    document.body.appendChild(form);

    form.submit();
};

//download video from youtube
downloadBtn.onclick = function(e) {

    e.preventDefault();

    var url = { 'url': videoUrl.value };

    open('POST', '/api/download', url);

}

//Hide the image placeholder
fileHolder.style.opacity = '0';

fileBrowser.onchange = function(e) {

    var fileName = '';
    var label = e.target.nextElementSibling;

    fileName = e.target.value.split('\\').pop();

    if (fileName) {

        label.innerHTML = fileName;

    } else {

        label.innerHTML = 'Choose a file';

    }

};

submit.onclick = function(e) {
    e.preventDefault();

    $.ajax({
        url: '/api/files',
        type: 'POST',
        data: new FormData($('form')[0]),
        cache: false,
        contentType: false,
        processData: false,
        success: function(resp) {

            //check if there is any image and delete if yes
            if (panelBody.children.length > 0) {

                for (var i = panelBody.children.length - 1; i >= 0; i--) {

                    panelBody.removeChild(panelBody.children[i]);

                }

            }
            if (resp && resp.name) {
                //Show again
                fileHolder.style.opacity = '1';

                var img = document.createElement('img');

                label.innerHTML = resp.message;

                img.setAttribute('src', '/uploads/' + resp.name);
                img.setAttribute('class', 'img-responsive');
                img.setAttribute('width', '420px');
                img.setAttribute('height', 'inherit');
                img.onerror = function() {

                    label.innerHTML = 'There was an error';

                }
                panelBody.appendChild(img);
            }
        },
        error: function(err) {

            label.innerHTML = 'Error: ' + err.message + ' status: ' + err.status;
            fileHolder.appendChild(label);

        }
    });
};

function cleanDataList() {

    filesList.innerHTML = '';
    schedulesList.innerHTML = '';

}

/**
 * REALTIME
 * Listen for changes on the API
 */

var dataListener = new EventSource('/api/updates');

dataListener.addEventListener('change', function(e) {
    console.log(JSON.parse(e.data));
    cleanDataList();

    var resp = JSON.parse(e.data);

    if (resp) {
        var filesKeys = Object.keys(resp.files);
        var schedulesKeys = Object.keys(resp.schedules);
        var totalLength = filesKeys.length + schedulesKeys.length;
        for (var i = 0; i < totalLength; i++) {

            if (resp.files[filesKeys[i]]) {

                var file = resp.files[filesKeys[i]];
                filesList.innerHTML += '<td><strong>Image ' + (i + 1) + ': </strong><span>' + file.name + '</span></td>';

            }
            if (resp.schedules[schedulesKeys[i]]) {

                var schedule = resp.schedules[schedulesKeys[i]];
                schedulesList.innerHTML += '<td><strong>Schedule ' + (i + 1) + ': </strong><span>' + schedule.title + '</span></td>';

            }

        }

    }
});