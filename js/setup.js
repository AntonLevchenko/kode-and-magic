'use strict';

let userDialog = document.querySelector('.setup');
let setupOpener = document.querySelector('.setup-open-icon');
let setupCloser = document.querySelector('.setup-close');
let setupSimilar = document.querySelector('.setup-similar');
let similarListElement = document.querySelector('.setup-similar-list');
let similarWizardTemplate = document.querySelector('#similar-wizard-template')
                            .content
                            .querySelector('.setup-similar-item');

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
    wizardElement.querySelector('.wizard-coat').style.fill  = wizard.coatColor;

    return wizardElement;
};

for (let i = 0; i < 4; i++) {
    similarListElement.append( renderWizard(wizards[i]) );
}