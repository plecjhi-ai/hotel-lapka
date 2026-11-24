'use strict';
/* LAB 9: client-only validation; no server/network request is performed. */
(() => {
  const form = document.getElementById('contact-form');
  const modal = document.getElementById('success-modal');
  const dialog = document.getElementById('success-dialog');
  const closeButton = document.getElementById('success-close');
  if (!form || !modal || !dialog || !closeButton) return;

  const REGEX_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const REGEX_PHONE = /^\+380\d{9}$/;
  const fieldIds = ['username','email','phone','message','agreement'];
  const fields = Object.fromEntries(fieldIds.map(id => [id, document.getElementById(id)]));
  const touched = new Set();
  let previousFocus = null;

  function validateName() {
    const val = fields.username.value.trim();
    return val.length >= 2 ? '' : 'Введіть ім’я щонайменше з 2 символів.';
  }
  function validateEmail() {
    return REGEX_EMAIL.test(fields.email.value.trim()) ? '' : 'Введіть коректну електронну адресу.';
  }
  function validatePhone() {
    return REGEX_PHONE.test(fields.phone.value.trim()) ? '' : 'Формат номера: +380XXXXXXXXX без пробілів.';
  }
  function validateMessage() {
    return fields.message.value.trim().length >= 10 ? '' : 'Напишіть повідомлення щонайменше з 10 символів.';
  }
  function validateAgreement() {
    return fields.agreement.checked ? '' : 'Підтвердіть згоду для продовження.';
  }
  const checks = { username:validateName, email:validateEmail, phone:validatePhone, message:validateMessage, agreement:validateAgreement };

  function showError(id, message) {
    const field = fields[id];
    field.setAttribute('aria-invalid','true');
    field.classList.add('is-error');
    field.classList.remove('is-valid');
    document.getElementById(`${id}-error`).textContent = message;
  }
  function showSuccess(id) {
    const field = fields[id];
    field.setAttribute('aria-invalid','false');
    field.classList.remove('is-error');
    field.classList.add('is-valid');
    document.getElementById(`${id}-error`).textContent = '';
  }
  function clearError(id) {
    const field = fields[id];
    field.setAttribute('aria-invalid','false');
    field.classList.remove('is-error','is-valid');
    document.getElementById(`${id}-error`).textContent = '';
  }
  function validateField(id) {
    const error = checks[id]();
    if (error) showError(id,error); else showSuccess(id);
    return !error;
  }
  fieldIds.forEach(id => {
    const field = fields[id];
    const eventName = id === 'agreement' ? 'change' : 'input';
    field.addEventListener(eventName,() => { if(touched.has(id)) validateField(id); });
    field.addEventListener('blur',() => { touched.add(id); validateField(id); });
  });

  function onModalKeydown(event) {
    if (event.key === 'Escape') { event.preventDefault(); closeModal(); return; }
    if (event.key !== 'Tab') return;
    // Keep keyboard focus within the modal.
    const focusable = Array.from(dialog.querySelectorAll('button:not([disabled]),a[href],input:not([disabled]),[tabindex]:not([tabindex="-1"])'));
    if (!focusable.length) { event.preventDefault(); dialog.focus(); return; }
    const first=focusable[0], last=focusable[focusable.length-1];
    if (event.shiftKey && document.activeElement===first) {event.preventDefault();last.focus();}
    else if (!event.shiftKey && document.activeElement===last) {event.preventDefault();first.focus();}
  }
  function openModal() {
    previousFocus = document.activeElement;
    modal.hidden = false;
    document.addEventListener('keydown',onModalKeydown);
    closeButton.focus();
  }
  function closeModal() {
    modal.hidden = true;
    document.removeEventListener('keydown',onModalKeydown);
    previousFocus?.focus();
  }
  closeButton.addEventListener('click',closeModal);
  modal.addEventListener('click',event => { if(event.target===modal) closeModal(); });
  form.addEventListener('submit',event => {
    event.preventDefault();
    const validResults = fieldIds.map(id => {touched.add(id);return validateField(id);});
    if(validResults.some(result => !result)) {
      document.getElementById('form-status').textContent = 'Виправте помилки у виділених полях.';
      fields[fieldIds[validResults.indexOf(false)]].focus();
      return;
    }
    // No fetch()/mailto()/action: educational success simulation only.
    form.reset();
    touched.clear();
    fieldIds.forEach(clearError);
    document.getElementById('form-status').textContent = 'Демонстрація: дані перевірені, але не надсилалися.';
    openModal();
  });
})();
