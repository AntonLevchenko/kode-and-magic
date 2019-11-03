(function () {
    let form = document.querySelector('.setup-wizard-form');

    form.addEventListener('submit', function (evt) {
       evt.preventDefault();

       window.upload(new FormData(form), function (response) {
          userDialog.classList.add('hidden');
       });
    });
})();