(function () {
    const URL = 'https://js.dump.academy/code-and-magick';

    window.upload = function (data, onSuccess) {
        let xhr = new XMLHttpRequest();
        xhr.responseText = 'json';

        xhr.addEventListener('load', function (evt) {
            switch (xhr.status) {
                case 200:
                    onSuccess(xhr.response);
                    break;
                default:
                    console.log(xhr.status + xhr.response);
                    break;
            }
        });

        xhr.addEventListener('error', function (evt) {
            console.log(evt.target);
        });

        xhr.addEventListener('timeout', function (evt) {
            console.log('Ooops, time is over');
        });

        xhr.open('POST', URL);
        xhr.send(data);
    };
})();