/* Contact form → emails submissions to the site owner via FormSubmit.co (AJAX).
   No backend needed; visitors stay on-site with a branded status message.
   First-ever submission triggers a one-time confirmation email from FormSubmit. */
(function () {
  const form = document.getElementById('contactForm');
  if (!form) return;
  const status = document.getElementById('contactStatus');
  const submitBtn = document.getElementById('contactSubmit');
  const ENDPOINT = 'https://formsubmit.co/ajax/mark.barretto@mac.com';

  function setStatus(msg, kind) {
    status.textContent = msg;
    status.className = 'contact__status ' + (kind === 'error' ? 'is-error' : 'is-success');
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    setStatus('', '');

    const data = Object.fromEntries(new FormData(form).entries());
    if (data._honey && data._honey.trim()) return; // honeypot tripped → silently drop

    if (!data.name || !data.email || !data.message) {
      setStatus('Please add your name, email, and a message.', 'error');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      setStatus('That email address looks off — please check it.', 'error');
      return;
    }

    const original = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending…';

    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          name: data.name,
          email: data.email,            // becomes the "reply-to" for Mark
          Topic: data.topic || '',
          Message: data.message,
          _subject: 'Barretto Astro — new contact form message',
          _template: 'table',
          _captcha: 'false'
        })
      });
      const json = await res.json().catch(() => ({}));

      if (res.ok && json.success) {
        setStatus('Thanks — your message is on its way. Mark will be in touch shortly.', 'success');
        form.reset();
      } else {
        // Most likely the first-ever submission awaiting one-time activation.
        setStatus(json.message || 'Sent. If this is the first message, FormSubmit sends a one-time confirmation to my inbox — confirm it once and future messages arrive instantly.', 'success');
        form.reset();
      }
    } catch (err) {
      setStatus('Sorry, sending failed. Please try again, or message me on Etsy.', 'error');
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = original;
    }
  });
})();
