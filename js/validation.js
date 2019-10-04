let setup = document.querySelector('.setup');
let userNameInput = setup.querySelector('.setup-user-name');

userNameInput.addEventListener('invalid', function (e) {
    if (this.validity.tooShort) {
        this.setCustomValidity('Имя должно состоять минимум из 2-х символов');
    } else if (this.validity.tooLong) {
        this.setCustomValidity('Имя должно состоять максимум из 25-ти символов');
    } else if (this.validity.valueMissing) {
        this.setCustomValidity('Обязательное поле');
    }
});