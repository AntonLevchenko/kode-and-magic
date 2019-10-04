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

function changeColor(type) {
    let colorIndex = 0;

    return function(target, colors) {
        colorIndex = (colorIndex < colors.length - 1) ? ++colorIndex : 0;
        let color = colors[colorIndex];
        target.style.fill = color;

        userDialog.querySelector(`[name=${type}-color]`).value = color;
    };
}

const changeCoatColor = changeColor('coat');
const changeEyesColor = changeColor('eyes');
const changeFireballColor = changeColor('fireball');

wizardCoat.addEventListener('click', function (e) {
    changeCoatColor(e.target, COAT_COLORS);
});
wizardEyes.addEventListener('click', function (e) {
    changeEyesColor(e.target, EYES_COLORS);
});
wizardFireball.addEventListener('click', function (e) {
    changeFireballColor(e.target, FIREBALL_COLORS);
});