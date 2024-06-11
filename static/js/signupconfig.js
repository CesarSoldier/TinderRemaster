var modal = document.getElementById("emailModal");
        var btn = document.getElementById("openModalBtn");
        var span = document.getElementsByClassName("close")[0];
        var submitBtn = document.getElementById("submitEmailBtn");

        btn.onclick = function() {
            modal.style.display = "block";
        }

        span.onclick = function() {
            modal.style.display = "none";
        }

        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }

        submitBtn.onclick = function() {
            var email = document.getElementById("emailInput").value;
            console.log("Email submitted:", email);
            // Aqui você pode adicionar código para enviar o email para o servidor
            modal.style.display = "none";
        }   