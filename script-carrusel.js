const carousel = document.querySelector('.carousel');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
let translateX = 0;

prevBtn.addEventListener('click', () => {
    if (translateX !== 0) {
        translateX += 100;
        carousel.style.transform = `translateX(${translateX}%)`;
        nextBtn.disabled = false; // Habilitar el botón de siguiente cuando se hace clic en previo
    }
});

nextBtn.addEventListener('click', () => {
    const containerWidth = carousel.parentElement.offsetWidth;
    const contentWidth = carousel.scrollWidth;
    if (translateX > -(contentWidth - containerWidth)) {
        translateX -= 100;
        carousel.style.transform = `translateX(${translateX}%)`;
    } else {
        nextBtn.disabled = true; // Deshabilitar el botón de siguiente cuando se llega a la última imagen
    }
});

// Habilitar el botón de siguiente inicialmente
nextBtn.disabled = false;
