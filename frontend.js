//DOM Shortcuts
var fileHolder = document.querySelector('#file_holder'),
    fileBrowser = document.querySelector('#file_rowser'),
    submit = document.querySelector('#submiter'),
    listFilesBtn = document.querySelector('#list_files'),
    listHolder = document.querySelector('#list_holder'),
    label = document.querySelector('#success_label'),
    panelBody = document.querySelector('.panel-body'),
    fileName,
    myFirebaseRef = new Firebase("https://rest-starter.firebaseio.com/");

//Hide the image placeholder
fileHolder.style.opacity = '0';

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
            if (resp && resp.filename) {
                //Show again
                fileHolder.style.opacity = '1';

                var img = document.createElement('img');

                label.innerHTML = resp.message;

                img.setAttribute('src', '/uploads/' + resp.filename);
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

            label.innerHTML = 'Error: ' + err.statusText + ' status: ' + err.status;
            fileHolder.appendChild(label);

        }
    });
};
listFilesBtn.onclick = function(e) {

    e.preventDefault();

    cleanDataList();

    $.ajax({
        url: '/api/files',
        type: 'GET',
        success: function(resp) {

            if (resp) {

                var filesKeys = Object.keys(resp),
                    files = [];

                for (var i = 0; i < filesKeys.length; i++) {

                    files.push(resp[filesKeys[i]]);

                }

                for (var i = 0; i < files.length; i++) {

                    listHolder.innerHTML += '<p style="margin:2px"><strong>Image ' + (i + 1) + ': </strong><span class="label label-danger">' + files[i].name + '</span></p>';

                }
            }

        }
    });

}

function cleanDataList() {

    listHolder.innerHTML = '';

}

myFirebaseRef.on('value', function(snapshot) {
    cleanDataList();

    var resp = snapshot.val();
    console.log(resp);
    if (resp) {
        var filesKeys = Object.keys(resp.files),
            files = [];

        for (var i = 0; i < filesKeys.length; i++) {

            files.push(resp.files[filesKeys[i]]);

        }

        for (var i = 0; i < files.length; i++) {

            listHolder.innerHTML += '<p style="margin:2px"><strong>Image ' + (i + 1) + ': </strong><span class="label label-danger">' + files[i].name + '</span></p>';

        }
    }
});

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