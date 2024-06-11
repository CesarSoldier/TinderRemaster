let slideIndex = 1;
showSlides(slideIndex);


let interval = setInterval(nextSlide, 3000);

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
        phrases[i * 2].classList.remove("active"); 
        phrases[i * 2 + 1].classList.remove("active"); 
    }

    for (let i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }

    slides[slideIndex-1].style.display = "block";
    phrases[(slideIndex-1) * 2].classList.add("active"); 
    phrases[(slideIndex-1) * 2 + 1].classList.add("active"); 
    dots[slideIndex-1].className += " active";
}

document.querySelectorAll('.prev, .next').forEach(item => {
    item.addEventListener('click', () => {
        clearInterval(interval); 
        interval = setInterval(nextSlide, 3000); 
    });
});

document.querySelectorAll('.dot').forEach((dot, index) => {
    dot.addEventListener('click', () => {
        clearInterval(interval); 
        interval = setInterval(nextSlide, 3000); 
        currentSlide(index + 1);
    });
    
});


