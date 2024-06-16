document.addEventListener('DOMContentLoaded', () => {
    const options = document.querySelectorAll('.option');
    const genderInput = document.getElementById('gender-input');
    const form = document.getElementById('gender-form');
    
    options.forEach(option => {
        option.addEventListener('click', () => {
            options.forEach(o => o.classList.remove('selected'));
            option.classList.add('selected');
            genderInput.value = option.getAttribute('data-gender');
        });
    });
});
