(function () {
    let wizards = [];
    let lastTimeOut = null;
    let elemColors = {
        coat: 'rgb(101, 137, 164)',
        eyes: 'black',
        fireball: 'rgb(48, 168, 238)',
    };

    function debounce(func) {
        if (lastTimeOut) {
            clearTimeout(lastTimeOut);
        }

        lastTimeOut = setTimeout(() => {
            func();
        }, 300);
    }

    function changeColor(type) {
        let colorIndex = 0;

        return function(target, colors) {
            colorIndex = (colorIndex < colors.length - 1) ? ++colorIndex : 0;
            elemColors[type] =  colors[colorIndex];
            target.style.fill = elemColors[type];

            userDialog.querySelector(`[name=${type}-color]`).value = elemColors[type];

            if (lastTimeOut) {
                clearTimeout(lastTimeOut);
            }

            debounce(updateWizards);
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

    function getRank(wizard) {
        let rank = 0;

        if (wizard.colorCoat === elemColors.coat) {
            rank += 2;
        }
        if (wizard.colorEyes === elemColors.eyes) {
            rank += 1;
        }

        return rank;
    }

    function nameComparator(left, right) {
        if (left > right) {
            return 1;
        } else if (left < right) {
            return -1;
        }
        return 0;
    }

    function updateWizards() {
        wizards.sort((left, right) => {
            let rankDiff = getRank(right) - getRank(left);

            if (rankDiff === 0) {
                rankDiff = nameComparator(left, right);
            }

            return rankDiff;
        });

        window.setup.showSimilarWizards(wizards);
    }

    function onSuccess(data) {
        wizards = data;

        updateWizards();
    }

    let onErrorHandler = function(errorMessage) {
        let node = document.createElement('div');
        node.style = `z-index: 100; margin: 0 auto; text-align: center; background-color: red; position: absolute; left: 0; right: 0; font-size: 30px;`;
        node.textContent = errorMessage;
        document.body.prepend(node);
    };

    window.load(onSuccess, onErrorHandler);
})();
