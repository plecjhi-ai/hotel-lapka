"use strict";
// Progressive enhancement: no JS is required to read or navigate the page.
const menuButton = document.querySelector('.menu-toggle');
const mobileMenu = document.querySelector('#mobile-nav');
menuButton?.addEventListener('click', () => {
  const expanded = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!expanded));
  menuButton.setAttribute('aria-label', expanded ? 'Відкрити меню' : 'Закрити меню');
  mobileMenu.hidden = expanded;
});
mobileMenu?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  mobileMenu.hidden = true;
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Відкрити меню');
}));
const form = document.querySelector('#stay-form');
const arrival = document.querySelector('#arrival');
const departure = document.querySelector('#departure');
const formatUAH = value => new Intl.NumberFormat('uk-UA').format(value) + ' грн';
const today = new Date();
const localDate = new Date(today.getTime() - today.getTimezoneOffset() * 60_000).toISOString().slice(0, 10);
arrival.min = localDate;
arrival.value = localDate;
const nextDay = new Date(localDate + 'T12:00:00'); nextDay.setDate(nextDay.getDate() + 1);
const dateString = date => `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}`;
departure.min = dateString(nextDay); departure.value = dateString(nextDay);
function updateTotal(){
  const start = arrival.value, end = departure.value;
  const days = Math.round((Date.parse(end + 'T12:00:00Z') - Date.parse(start + 'T12:00:00Z')) / 86_400_000);
  const valid = Number.isFinite(days) && days > 0;
  const rate = {standard:600,comfort:800,premium:1100}[form.elements.room.value] ?? 600;
  const extra = Number(form.elements.walks.value) + (form.elements.photo.checked ? 100 : 0);
  document.querySelector('#days-result').textContent = valid ? `${days}` : '—';
  document.querySelector('#room-result').textContent = formatUAH(rate);
  document.querySelector('#extras-result').textContent = formatUAH(extra) + ' / доба';
  document.querySelector('#total-result').textContent = valid ? formatUAH((rate + extra) * days) : '0 грн';
  document.querySelector('#summary-period').textContent = valid ? `${start} — ${end}` : 'Дата виїзду має бути пізніше дати заїзду';
  document.querySelector('#calc-notice').textContent = valid ? 'Попередній розрахунок. Це не підтвердження бронювання.' : 'Перевірте обрані дати.';
}
arrival.addEventListener('change', () => {departure.min = arrival.value;updateTotal()});
form.addEventListener('change',updateTotal); updateTotal();
// LAB 9: contact form validation and demonstration modal live in js/validation.js.

// LAB 7: third-party dynamic weather widget; network failure is handled gracefully.
const weatherTemp = document.querySelector('#weather-temp');
const weatherInfo = document.querySelector('#weather-info');
async function refreshWeather() {
  if (!weatherTemp || !weatherInfo) return;
  weatherTemp.textContent = 'Завантаження…';
  weatherInfo.textContent = 'Отримання даних Open-Meteo';
  try {
    const url = 'https://api.open-meteo.com/v1/forecast?latitude=49.8419&longitude=24.0315&current=temperature_2m,wind_speed_10m&timezone=Europe%2FKyiv';
    const response = await fetch(url);
    if (!response.ok) throw new Error('HTTP ' + response.status);
    const data = await response.json();
    if (typeof data.current?.temperature_2m !== 'number') throw new Error('No weather data');
    weatherTemp.textContent = Math.round(data.current.temperature_2m) + ' °C';
    weatherInfo.textContent = 'Вітер: ' + Math.round(data.current.wind_speed_10m) + ' км/год · Дані на ' + data.current.time.replace('T',' ');
  } catch(error) {
    weatherTemp.textContent = 'Немає даних';
    weatherInfo.textContent = 'Не вдалося завантажити погоду. Перевірте інтернет і спробуйте знову.';
  }
}
document.querySelector('#weather-refresh')?.addEventListener('click', refreshWeather);
refreshWeather();
