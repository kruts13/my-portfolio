const getCircle = document.querySelectorAll('.star-button');

getCircle.forEach(circle => {
    circle.addEventListener('click', e => {
        checkHover(e, 'change-color-gold');
        e.target.classList.add('change-color-gold');
    });
});

function callHover(e) {
    console.log(e);
    checkHover(e, 'hover-gold');
}

function checkHover(e, goldClass) {
    let prevElem = e.target;
    let nextElem = e.target.nextElementSibling;
    while (prevElem.classList.contains('star-button')) {
        prevElem.classList.add(goldClass);
        prevElem = prevElem.previousElementSibling;
    }

    while (nextElem.classList.contains(goldClass)) {
        nextElem.classList.remove(goldClass);
        nextElem = nextElem.nextElementSibling;
    }
}

function greyAll(elem) {
    getCircle.forEach(circle => {
        circle.classList.remove('hover-gold');
    });
}