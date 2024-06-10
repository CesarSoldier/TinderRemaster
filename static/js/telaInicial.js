let slideIndex = 1;
showSlides(slideIndex);

// Função para mudar automaticamente para o próximo slide a cada 3 segundos
let interval = setInterval(nextSlide, 2000);

function nextSlide() {
    showSlides(slideIndex += 1);
}

function prevSlide() {
    showSlides(slideIndex -= 1);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    let slides = document.getElementsByClassName("carousel-item");
    let dots = document.getElementsByClassName("dot");
    let phrases = document.getElementsByClassName("phrase");

    if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}

    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
        phrases[i * 2].classList.remove("active"); // h1.phrase
        phrases[i * 2 + 1].classList.remove("active"); // p.phrase
    }

    for (let i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }

    slides[slideIndex-1].style.display = "block";
    phrases[(slideIndex-1) * 2].classList.add("active"); // h1.phrase
    phrases[(slideIndex-1) * 2 + 1].classList.add("active"); // p.phrase
    dots[slideIndex-1].className += " active";
}

document.querySelectorAll('.prev, .next').forEach(item => {
    item.addEventListener('click', () => {
        clearInterval(interval); // Para a troca automática de slides ao clicar
        interval = setInterval(nextSlide, 2000); // Reinicia o intervalo
    });
});

document.querySelectorAll('.dot').forEach((dot, index) => {
    dot.addEventListener('click', () => {
        clearInterval(interval); // Para a troca automática de slides ao clicar
        interval = setInterval(nextSlide, 2000); // Reinicia o intervalo
        currentSlide(index + 1);
    });
});
