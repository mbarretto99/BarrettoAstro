/* Contact form → emails submissions to the site owner via Web3Forms (AJAX).
   No backend needed. The access key is public by design and maps to the
   owner's email server-side, so the address never appears in the page source. */
(function () {
  const form = document.getElementById('contactForm');
  if (!form) return;
  const status = document.getElementById('contactStatus');
  const submitBtn = document.getElementById('contactSubmit');
  const ENDPOINT = 'https://api.web3forms.com/submit';
  const ACCESS_KEY = 'cc94cd48-0c11-4154-ad90-470f6b1e6205';

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
          access_key: ACCESS_KEY,
          name: data.name,
          email: data.email,            // becomes the reply-to address
          topic: data.topic || '',
          message: data.message,
          subject: 'Barretto Astro — new contact form message',
          from_name: 'Barretto Astro site'
        })
      });
      const json = await res.json().catch(() => ({}));

      if (res.ok && json.success) {
        setStatus('Thanks — your message is on its way. Expect a reply soon.', 'success');
        form.reset();
      } else {
        setStatus(json.message || 'Sorry, sending failed. Please try again, or message me on Etsy.', 'error');
      }
    } catch (err) {
      setStatus('Sorry, sending failed. Please try again, or message me on Etsy.', 'error');
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = original;
    }
  });
})();
