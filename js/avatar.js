(function () {
    const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
    let fileChooser  = document.querySelector('.upload input[type=file]');
    let preview = document.querySelector('.setup-user-pic');

    fileChooser.addEventListener('change', function (evt) {
        let file = fileChooser.files[0];
        let fileName = file.name.toLowerCase();

        let matches = FILE_TYPES.some(it => fileName.endsWith(it));

        if (matches) {
            let reader = new FileReader();

            reader.addEventListener('load', function () {
                preview.src = reader.result;
            });

            reader.readAsDataURL(file);
        }
    });
})();
