const getListElemArr = Array.from(document.querySelector('.nav').children);
getListElemArr.forEach((newElemTab, index) => {
    newElemTab.addEventListener('click', e => {
        let newElemTabPane = document.getElementById('tab' + index);
        let activeTabs = Array.from(document.querySelectorAll('.active'));
        activeTabs.forEach(elem => {
            elem.className = elem.className.replace('active', '');
        });

        newElemTab.classList.add('active');
        newElemTabPane.classList.add('active');
    })
});
