document.getElementById('reset').addEventListener('click', function() {
    const modal = document.getElementById('resetModal');
    const modalBackground = modal.querySelector('.modal-background');
    const modalContent = modal.querySelector('.modal-content');
    modal.style.display = 'block';
    modalBackground.classList.remove('fade-out');
    modalBackground.classList.add('fade-in');
    modalContent.classList.remove('zoom-out');
    modalContent.classList.add('zoom-in');
});

document.getElementById('confirmReset').addEventListener('click', function() {
    // Reset de punten en highscore
    localStorage.removeItem('highscore');
    // Redirect naar loading.html
    window.location.href = 'loading.html';
});

document.getElementById('cancelReset').addEventListener('click', function() {
    const modal = document.getElementById('resetModal');
    const modalBackground = modal.querySelector('.modal-background');
    const modalContent = modal.querySelector('.modal-content');
    modalBackground.classList.remove('fade-in');
    modalBackground.classList.add('fade-out');
    modalContent.classList.remove('zoom-in');
    modalContent.classList.add('zoom-out');
    setTimeout(() => {
        modal.style.display = 'none';
    }, 500); // Match this duration with the zoom-out animation duration
});