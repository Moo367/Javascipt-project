document.addEventListener('wheel', function(e) {
    if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
    }
}, { passive: false });

document.addEventListener('keydown', function(e) {
    if ((e.key === '+' || e.key === '-') && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
    }
});

document.addEventListener('gesturestart', function(e) {
    e.preventDefault();
});

document.addEventListener('gesturechange', function(e) {
    e.preventDefault();
});

document.addEventListener('gestureend', function(e) {
    e.preventDefault();
});