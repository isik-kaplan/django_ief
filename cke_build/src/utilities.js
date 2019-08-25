function makeSaveData(url, csrftoken) {
    return function (data) {
        return new Promise(resolve => {
            setTimeout(() => {
                fetch(
                    url,
                    {
                        method: 'POST',
                        body: data,
                        headers: {
                            'X-CSRFToken': csrftoken
                        }
                    }
                ).catch(err => {
                    console.error(err.stack);
                });

                resolve();
            }, 2000);
        });
    }
}

function makeImageUploadAdapterPlugin(url, csrftoken) {
    class ImageUploadAdapter {
        constructor(loader) {
            this.loader = loader;
        }

        upload() {
            return this.loader.file
                .then(file => new Promise((resolve, reject) => {
                    let data = new FormData();
                    data.append('image', file);
                    fetch(
                        url,
                        {
                            method: 'POST',
                            body: file,
                            headers: {
                                'X-CSRFToken': csrftoken
                            }
                        }
                    ).catch(err => {
                        console.error(err.stack);
                    }).then(
                        res => res.text()
                    ).then(
                        text => resolve({'default': text})
                    );

                }));
        }

        abort() {
            console.log('abort')
        }

    }

    return function (editor) {
        editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
            // Configure the URL to the upload script in your back-end here!
            return new ImageUploadAdapter(loader);
        };
    }
}

function getCSRFCookie() {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        let cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            let cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, "csrftoken".length + 1) === ("csrftoken" + '=')) {
                cookieValue = decodeURIComponent(cookie.substring("csrftoken".length + 1));
                break;
            }
        }
    }
    return cookieValue;
}


module.exports = {
    makeSaveData, makeImageUploadAdapterPlugin, getCSRFCookie
};