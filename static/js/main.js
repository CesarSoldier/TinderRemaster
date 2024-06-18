document.addEventListener('DOMContentLoaded', () => {
    // Selecionando os botões de ação
    const nopeButton = document.querySelector('.action-btn.nope');
    const likeButton = document.querySelector('.action-btn.like');
    const superLikeButton = document.querySelector('.action-btn.super-like');

    

    // Adicionando eventos de clique aos botões
    nopeButton.addEventListener('click', () => {
        console.log('Nope button clicked');

        // Realizar uma requisição ao servidor para obter o próximo usuário
        fetch('/next_user')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch next user');
                }
                return response.json();
            })
            .then(data => {
                console.log('Next user:', data);
                // Atualizar a interface com o próximo usuário obtido
                updateProfile(data);
            })
            .catch(error => {
                console.error('Error fetching next user:', error);
            });
    });

    likeButton.addEventListener('click', () => {
        console.log('Like button clicked');

        // Realizar uma requisição ao servidor para registrar o like no usuário atual
        fetch(`/like/${userId}/${likedUserId}`, {
            method: 'POST',
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to like user');
            }
            return response.json();
        })
        .then(data => {
            console.log('Like successful:', data);
            if (data.matched) {
                // Atualizar a interface para refletir o match (pode-se adicionar um pop-up ou mensagem visual)
                alert('It\'s a match!');
            } else {
                // Caso contrário, apenas passar para o próximo usuário
                fetch('/next_user')
                    .then(response => response.json())
                    .then(data => updateProfile(data))
                    .catch(error => console.error('Error fetching next user:', error));
            }
        })
        .catch(error => {
            console.error('Error liking user:', error);
        });
    });

    superLikeButton.addEventListener('click', () => {
        console.log('Super Like button clicked');
        // Aqui você pode adicionar a lógica para ação do botão "Super Like"
    });

    function updateProfile(user) {
        if (user) {
            // Atualizar o perfil na interface com os dados do usuário recebido
            const profileName = document.querySelector('.profile-info .name');
            profileName.textContent = `${user.first_name} ${user.last_name}`;
            // Atualizar a imagem de perfil (substitua com o link apropriado)
            const profilePic = document.querySelector('.profile-card .profile-pic');
            profilePic.src = `https://via.placeholder.com/150x250?text=${user.first_name}`;
        } else {
            // Caso não haja mais usuários disponíveis
            const profileName = document.querySelector('.profile-info .name');
            profileName.textContent = 'No other users found.';
            const profilePic = document.querySelector('.profile-card .profile-pic');
            profilePic.src = ''; // ou carregar uma imagem padrão de "sem usuário"
        }
    }
});