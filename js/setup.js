'use strict';

let userDialog = document.querySelector('.setup');
let setupOpener = document.querySelector('.setup-open-icon');
let setupCloser = document.querySelector('.setup-close');
let setupSimilar = document.querySelector('.setup-similar');
let similarListElement = document.querySelector('.setup-similar-list');
let similarWizardTemplate = document.querySelector('#similar-wizard-template')
                            .content
                            .querySelector('.setup-similar-item');
let wizardCoat = userDialog.querySelector('.wizard-coat');
let wizardEyes = userDialog.querySelector('.wizard-eyes');
let wizardFireball = userDialog.querySelector('.setup-fireball');
let dialogHandle = userDialog.querySelector('.upload');
const COAT_COLORS = [
    'rgb(101, 137, 164)',
    'rgb(241, 43, 107)',
    'rgb(146, 100, 161)',
    'rgb(56, 159, 117)',
    'rgb(15, 20, 55)',
    'rgb(0, 0, 0)'
];
const EYES_COLORS = [
    'black',
    'red',
    'blue',
    'yellow',
    'green'
];
const FIREBALL_COLORS = [
    '#ee4830',
    '#30a8ee',
    '#5ce6c0',
    '#e848d5',
    '#e6e848'
];

// mock
const WIZARDS_NAME = ['Pendalf', 'Harry Potter', 'Dambldor', 'Volandemort'];
let wizards = [
    {
        name: WIZARDS_NAME[0],
        coatColor: 'rgba(241, 43, 107)'
    },
    {
        name: WIZARDS_NAME[1],
        coatColor: 'rgba(215, 210, 55)'
    },
    {
        name: WIZARDS_NAME[2],
        coatColor: 'rgba(101, 137, 164)'
    },
    {
        name: WIZARDS_NAME[3],
        coatColor: 'rgba(127, 127, 127)'
    },
];

function openPopup() {
    userDialog.classList.remove('hidden');

    document.addEventListener('keydown', onPopupEscPress);
}

function onPopupEscPress(e) {
    if (e.keyCode !== 27) return;

    userDialog.classList.add('hidden');
}

function closePopup() {
    userDialog.classList.add('hidden');

    setup.style.top = null;
    setup.style.left = null;
    document.removeEventListener('keydown', onPopupEscPress);
}

setupOpener.addEventListener('click', openPopup);
setupOpener.addEventListener('keydown', function (e) {
    if (e.keyCode !== 13) return;

    openPopup();
});

setupCloser.addEventListener('click', closePopup);
setupCloser.addEventListener('keydown', function (e) {
    if (e.keyCode !== 13) return;

    closePopup();
});

let renderWizard = function (wizard) {
    let wizardElement = similarWizardTemplate.cloneNode(true);
    wizardElement.querySelector('.setup-similar-label').textContent  = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill  = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill  = wizard.colorEyes;

    return wizardElement;
};

let showSimilarWizards = function (wizards) {
    similarListElement.innerHTML = '';

    for (let i = 0; i < 4; i++) {
        similarListElement.append( renderWizard(wizards[i]) );
    }

    userDialog.querySelector('.setup-similar').classList.remove('hidden');
};

window.setup = {
    showSimilarWizards
};

let onErrorHandler = function(errorMessage) {
    let node = document.createElement('div');
    node.style = `z-index: 100; margin: 0 auto; text-align: center; background-color: red; position: absolute; left: 0; right: 0; font-size: 30px;`;
    node.textContent = errorMessage;
    document.body.prepend(node);
};

// window.load(showSimilarWizards, onErrorHandler);
