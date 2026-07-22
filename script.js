window.addEventListener('load', () => {
  const overlay = document.getElementById('loading');
  const content = document.getElementById('nightsky');

  // Begin fading out the spinner overlay
  overlay.style.opacity = '0';

  // Reveal main content layout
  content.style.display = 'block';

  // Completely clean up the DOM element after the CSS fade transition completes
  setTimeout(() => {
    overlay.style.display = 'none';
  }, 400); // Must exactly match the CSS opacity transition duration
});
