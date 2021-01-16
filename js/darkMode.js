const $darkItems = document.querySelectorAll('[data-dark]'),
    $darkBtn = document.querySelector('.dark-button');

const activeDark = () => {
    $darkItems.forEach(item => item.setAttribute('data-dark', 'active'));
    $darkBtn.src = './images/icon-sun.svg';
}

const activeLight = () => {
    $darkItems.forEach(item => item.setAttribute('data-dark', ''));
    $darkBtn.src = './images/icon-moon.svg';
}

const changeLightMode = () => {
    let isDark = localStorage.getItem('darkMode');

    if(!isDark){
        activeDark();
        localStorage.setItem('darkMode', 'active')
    }else{
        activeLight();
        localStorage.removeItem('darkMode')
    };
};

const setLightMode = () => {

    let isDark = localStorage.getItem('darkMode');

    if(!isDark){
        activeLight();
    }else{
        activeDark();
    };

};

export {
    changeLightMode,
    setLightMode
}