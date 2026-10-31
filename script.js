// Mobile menu toggle
const toggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.site-nav');

toggle.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  toggle.setAttribute('aria-expanded', isOpen);
});

// Close the mobile menu after choosing a link
nav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    toggle.setAttribute('aria-expanded', false);
  });
});

// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Forms are sent through Netlify Forms. Responses appear in the Netlify
// dashboard (Forms), which can also email each one to you.
function setupForm(form, successText) {
  const message = form.querySelector('.form-message');
  const button = form.querySelector('button[type="submit"]');

  form.addEventListener('submit', async event => {
    event.preventDefault();

    let valid = true;
    form.querySelectorAll('[required]').forEach(input => {
      const ok = input.value.trim() !== '' && input.checkValidity();
      input.closest('.field').classList.toggle('invalid', !ok);
      if (!ok) valid = false;
    });

    if (!valid) {
      message.textContent = 'Please complete all fields with a valid email address.';
      message.className = 'form-message error';
      return;
    }

    button.disabled = true;
    message.textContent = 'Sending…';
    message.className = 'form-message';

    try {
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(new FormData(form)).toString()
      });
      if (!response.ok) throw new Error('Request failed');

      message.textContent = successText;
      message.className = 'form-message success';
      form.reset();
    } catch {
      message.textContent = 'Sorry, something went wrong. Please try again in a moment.';
      message.className = 'form-message error';
    } finally {
      button.disabled = false;
    }
  });
}

setupForm(document.getElementById('apply'),
  'Thank you for your interest! Our team will be in touch about next steps.');
setupForm(document.getElementById('contact-form'),
  'Thank you for your message! We will get back to you soon.');
