document.getElementById('user-form').addEventListener('submit', function(event) {
    event.preventDefault();  // Prevent the default form submission

    var form = event.target;
    var formData = new FormData(form);

    fetch(form.action, {
        method: form.method,
        body: formData
    }).then(response => {
        if (response.ok) {
            // Redirect to profile.html
            window.location.href = "{{ url_for('static', filename='templates/profile.html') }}";
        } else {
            // Handle error
            console.error('Form submission failed.');
        }
    }).catch(error => {
        console.error('Form submission error:', error);
    });
});
