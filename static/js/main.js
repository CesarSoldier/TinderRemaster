// Selecionando os botões de ação
const nopeButton = document.querySelector('.action-btn.nope');
const likeButton = document.querySelector('.action-btn.like');
const superLikeButton = document.querySelector('.action-btn.super-like');

// Adicionando eventos de clique aos botões
nopeButton.addEventListener('click', function() {
    console.log('Nope button clicked');
    // Aqui você pode adicionar a lógica para ação do botão "Nope"
});

likeButton.addEventListener('click', function() {
    console.log('Like button clicked');
    // Aqui você pode adicionar a lógica para ação do botão "Like"
});

superLikeButton.addEventListener('click', function() {
    console.log('Super Like button clicked');
    // Aqui você pode adicionar a lógica para ação do botão "Super Like"
});
