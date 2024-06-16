document.addEventListener('DOMContentLoaded', function() {
    const openModalBtn = document.getElementById('openModalBtn');
    const emailModal = document.getElementById('emailModal');
    const closeModal = document.querySelector('.close');
    const submitEmailBtn = document.getElementById('submitEmailBtn');
    const emailInput = document.getElementById('emailInput');

    openModalBtn.addEventListener('click', () => {
        emailModal.style.display = 'block';
    });

    closeModal.addEventListener('click', () => {
        emailModal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === emailModal) {
            emailModal.style.display = 'none';
        }
    });

    submitEmailBtn.addEventListener('click', () => {
        const email = emailInput.value;
        fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({
                'email': email
            })
        })
        .then(response => {
            if (response.redirected) {
                window.location.href = response.url;
            } else {
                alert('Login failed. Email not recognized.');
            }
        })
        .catch(error => console.error('Error:', error));
    });
});
