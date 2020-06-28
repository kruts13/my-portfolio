const getHeaders = document.querySelectorAll('.header');

getHeaders.forEach((elem, index) => {
    elem.addEventListener('click', e => {
        let accor = e.target.nextElementSibling;
        let expandBtn = document.getElementById('expand' + index);
        let collBtn = document.getElementById('coll' + index);

        if (parseInt(accor.style.height) > 0) {
            accor.style.height = 0;
            expandBtn.style.display = 'inline-block';
            collBtn.style.display = 'none';
        } else {
            accor.style.height = 50 + 'px';
            expandBtn.style.display = 'none';
            collBtn.style.display = 'inline-block';
        }
    })
})