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

// Application interest form
// NOTE: This form is not yet connected to a server, so submissions are not sent anywhere.
// To receive submissions, connect it to a form service (e.g. Formspree, Netlify Forms
// or Google Forms) and send the data inside the "if (valid)" block below.
const form = document.getElementById('apply');
const message = form.querySelector('.form-message');

form.addEventListener('submit', event => {
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

  message.textContent = 'Thank you for your interest! Our team will be in touch about next steps.';
  message.className = 'form-message success';
  form.reset();
});
