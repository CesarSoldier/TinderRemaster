document.addEventListener('DOMContentLoaded', () => {
    const interestButtons = document.querySelectorAll('.interest-button');
    const form = document.getElementById('interests-form');

    interestButtons.forEach(button => {
        button.addEventListener('click', () => {
            const selectedButtons = document.querySelectorAll('.interest-button.selected');
            if (button.classList.contains('selected')) {
                button.classList.remove('selected');
            } else if (selectedButtons.length < 5) {
                button.classList.add('selected');
            } else {
                alert('Você pode selecionar no máximo 5 interesses.');
            }
        });
    });

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const selectedInterests = [];
        interestButtons.forEach(button => {
            if (button.classList.contains('selected')) {
                selectedInterests.push(button.textContent.trim());
            }
        });

        const interestsInput = document.createElement('input');
        interestsInput.type = 'hidden';
        interestsInput.name = 'interests';
        interestsInput.value = JSON.stringify(selectedInterests);
        form.appendChild(interestsInput);

        form.submit();
    });
});
