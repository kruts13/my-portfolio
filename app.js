const getCurrentImg = document.getElementById('current');
const getAllImages = document.querySelectorAll('.imgs img');
const getAllBtns = document.querySelectorAll('.nav button');
const getBtnLeft = document.getElementById('btn-left');
const getBtnRight = document.getElementById('btn-right');
let currentBtnIndex = 0;

function removeActiveClass () {
    const getAllActives = document.querySelectorAll('.active');
    getAllActives.forEach(e => {
        e.className = e.className.replace('active', '');
    })
}

function addActiveClass(btnElem, imgElem) {
    btnElem.classList.add('active');
    imgElem.classList.add('active');
}

getAllImages.forEach((elem, index) => {
    elem.addEventListener('click', e => {
        getCurrentImg.src = elem.src;
        removeActiveClass();
        addActiveClass(getAllBtns[index], elem);
        currentBtnIndex = index;
    })
});

getAllBtns.forEach((elem, index) => {
    elem.addEventListener('click', e => {
        getCurrentImg.src = getAllImages[index].src;
        removeActiveClass();
        addActiveClass(elem, getAllImages[index]);
        elem.classList.add('active');
        currentBtnIndex = index;
    });
});

getBtnLeft.addEventListener('click', e => {
    if (currentBtnIndex > 0) {
        removeActiveClass();
        currentBtnIndex -= 1;
        getCurrentImg.src = getAllImages[currentBtnIndex].src;  
        addActiveClass(getAllBtns[currentBtnIndex], getAllImages[currentBtnIndex]);
    }
});

getBtnRight.addEventListener('click', e => {
    if (currentBtnIndex < getAllBtns.length - 1) {
        removeActiveClass();
        currentBtnIndex += 1;
        getCurrentImg.src = getAllImages[currentBtnIndex].src;  
        addActiveClass(getAllBtns[currentBtnIndex], getAllImages[currentBtnIndex]);
    }
});