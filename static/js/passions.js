document.addEventListener('DOMContentLoaded', () => {
    const interestButtons = document.querySelectorAll('.interest-button');
    
    interestButtons.forEach(button => {
        button.addEventListener('click', () => {
            button.classList.toggle('selected');
        });
    });

    const continueButton = document.querySelector('.continue-button');
    continueButton.addEventListener('click', () => {
        // Você pode adicionar lógica adicional aqui se necessário,
        // mas a exibição de alertas foi removida.
    });
});
