document.addEventListener('DOMContentLoaded', function() {
    const birthdayInput = document.getElementById('birthday');
    const displayBirthday = document.getElementById('display-birthday');
    const openCalendarButton = document.getElementById('open-calendar');

    const calendar = flatpickr(displayBirthday, {
        dateFormat: 'Y-m-d',
        onChange: function(selectedDates, dateStr, instance) {
            displayBirthday.textContent = dateStr;
            birthdayInput.value = dateStr;
        },
        onOpen: function(selectedDates, dateStr, instance) {
            instance.calendarContainer.classList.add('open');
        },
        onClose: function(selectedDates, dateStr, instance) {
            instance.calendarContainer.classList.remove('open');
        }
    });

    openCalendarButton.addEventListener('click', function() {
        calendar.open();
    });
});