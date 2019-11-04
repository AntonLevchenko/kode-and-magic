(function () {
    let dialogHandle = document.querySelector('.upload');

    function limitCoords(elem, moveCoords) {
        let documentWidth = document.documentElement.clientWidth;
        let documentHeight =  document.documentElement.clientHeight;

        if ( moveCoords.x < (elem.clientWidth / 2) ) {
            moveCoords.x = elem.clientWidth / 2;
        } else if ( moveCoords.x > (documentWidth - elem.offsetWidth / 2) ) {
            moveCoords.x = documentWidth - elem.offsetWidth / 2;
        }

        if ( moveCoords.y > (documentHeight - elem.offsetHeight) ) {
            moveCoords.y = documentHeight - elem.offsetHeight;
        }
    }

    dialogHandle.addEventListener('mousedown', function (evt) {
        evt.preventDefault();

        let startCoords= {
            x: evt.clientX,
            y: evt.clientY
        };

        let dragged = false;

        function onMouseMove(evt) {
            evt.preventDefault();

            let shift = {
                x: startCoords.x - evt.clientX,
                y: startCoords.y - evt.clientY
            };

            let moveCoords = {
                x: setup.offsetLeft - shift.x,
                y: (setup.offsetTop - shift.y) < 0 ? 0 : (setup.offsetTop - shift.y)
            };

            dragged = true;

            startCoords = {
                x: evt.clientX,
                y: evt.clientY
            };

            limitCoords(setup, moveCoords);

            setup.style.top = moveCoords.y + 'px';
            setup.style.left = moveCoords.x + 'px';
        }

        function onMouseUp(evt) {
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);

            if (dragged) {
                function onClickPreventDefault(evt) {
                    evt.preventDefault();

                    dialogHandle.removeEventListener('click', onClickPreventDefault);
                }

                dialogHandle.addEventListener('click', onClickPreventDefault);
            }

            dragged = false;
        }

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    });
})();
