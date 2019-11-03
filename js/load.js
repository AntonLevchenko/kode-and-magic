(function () {
    const URL = 'https://js.dump.academy/code-and-magick/data';

    window.load = function (onSuccess, onError) {
        let xhr = new XMLHttpRequest();
        xhr.responseType = 'json';

        xhr.addEventListener('load', function (evt) {
            if (xhr.status == 200) {
                onSuccess(xhr.response);
            } else {
                onError(`Response status ${xhr.status} ${xhr.statusText}`);
            }
        });

        xhr.addEventListener('error', function (evt) {
           onError('Error connection');
        });

        xhr.addEventListener('timeout', function (evt) {
           onError('Time is out');
        });

        xhr.open('GET', URL);
        xhr.send();
    };
})();