var fileHolder = document.querySelector('#file_holder'),
    fileBrowser = document.querySelector('#file_rowser'),
    submit = document.querySelector('#submiter'),
    label = document.querySelector('#success_label'),
    panelBody = document.querySelector('.panel-body'),
    fileName;

//Hide the image placeholder
fileHolder.style.opacity = '0';

submit.onclick = function(e) {
    e.preventDefault();

    $.ajax({
        url: '/api/file_upload',
        type: 'POST',
        data: new FormData($('form')[0]),
        cache: false,
        contentType: false,
        processData: false,
        success: function(resp) {
            console.log(resp);
            console.log('success');
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
                console.log(img);
                panelBody.appendChild(img);
            }
        },
        error: function(err) {
            console.log('error', err);
            label.innerHTML = 'Error: ' + err.statusText + ' status: ' + err.status;
            fileHolder.appendChild(label);
        }
    });
};

fileBrowser.onchange = function(e) {
    var fileName = '';
    var label = e.target.nextElementSibling;
    fileName = e.target.value.split('\\').pop();
    if (fileName) {
        label.innerHTML = fileName;
    } else
        label.innerHTML = 'Choose a file';
};