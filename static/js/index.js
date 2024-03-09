
let iconElement = document.querySelector('#iconChange');
let isBars = true;
// responsive navbar hamburger settings

function changeIcon() {
    if (isBars) {
        iconElement.classList.remove('fa-bars');
        iconElement.classList.add('fa-xmark');
        isBars = false;
        document.querySelector('.navbar').classList.add('active_mobile');
        document.querySelector('nav').style.position = 'fixed';
    }
    else {
        iconElement.classList.add('fa-bars');
        iconElement.classList.remove('fa-xmark');
        document.querySelector('.navbar').classList.remove('active_mobile');
        document.querySelector('nav').style.position = 'static';

        isBars = true;
    }
    iconElement.style.transform = "rotate(360deg)"
    setTimeout(() => {
        iconElement.style.transform = "rotate(0deg)";

    }, 200)
};

document.querySelectorAll('.navlink').forEach(element => {
    if (element.href === window.location.href) {
        element.classList.add('active');
    }
});