document.addEventListener('DOMContentLoaded', () => {
    const interestButtons = document.querySelectorAll('.interest-button');
    const form = document.getElementById('interests-form');
    
    interestButtons.forEach(button => {
        button.addEventListener('click', () => {
            button.classList.toggle('selected');
        });
    });

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        
        const selectedInterests = [];
        interestButtons.forEach(button => {
            if (button.classList.contains('selected')) {
                selectedInterests.push(button.getAttribute('data-interest'));
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
