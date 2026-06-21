/* Sound toggle for the teaser video. Autoplays muted; one click unmutes
   (a user gesture, so autoplay-policy safe) and reveals the generated audio. */
(function () {
  const video = document.getElementById('teaserVideo');
  const btn = document.getElementById('teaserSound');
  if (!video || !btn) return;

  const ICON_OFF = '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M11 5 6 9H2v6h4l5 4V5z"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>';
  const ICON_ON  = '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M11 5 6 9H2v6h4l5 4V5z"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>';

  function render() {
    const muted = video.muted;
    btn.innerHTML = muted ? ICON_OFF : ICON_ON;
    btn.classList.toggle('is-on', !muted);
    btn.setAttribute('aria-pressed', String(!muted));
    btn.setAttribute('aria-label', muted ? 'Unmute video' : 'Mute video');
  }

  btn.addEventListener('click', () => {
    video.muted = !video.muted;
    if (!video.muted) {
      video.volume = 0.7;
      const p = video.play();
      if (p && p.catch) p.catch(() => {});
    }
    render();
  });

  render();
})();
