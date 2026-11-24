# Готель Лапка — лабораторна робота №9

Це оновлена версія сайту ЛР №7/8: додано адаптивну форму зворотного зв’язку з клієнтською валідацією та доступним модальним вікном.

## Запуск

Відкрийте `index.html` через Live Server у VS Code. Tailwind CSS підключається CDN і потребує доступу до інтернету. Форма працює суто в браузері: дані не передаються на сервер.

## Файли
- `index.html` — семантична форма + модальне вікно.
- `js/validation.js` — окремі функції перевірки, UX-стани, клавіатура й модальне вікно.
- `js/main.js` — збережена логіка попередніх лабораторних (калькулятор, меню, погода).
- `css/custom-styles.css` — стилі бренду та мінімальні стани полів.
- `docs/lr9-prompt-log.md` — промпт-паспорт.
- `docs/lr9-test-plan.md` — план перевірок.

## Як оновити свій наявний репозиторій

Не видаляйте `.git` зі старої папки `hotel-lapka-lr8`. Скопіюйте в неї з цього архіву нові `index.html`, `js/validation.js`, `js/main.js`, `css/custom-styles.css` і документи, зберігши шляхи. Потім у терміналі тієї старої папки:

```bash
git status
git add index.html js/validation.js js/main.js css/custom-styles.css README_LR9.md docs/
git commit -m "feat: add accessible feedback form validation"
git push origin main
```

Для Vercel: увійдіть на https://vercel.com через GitHub → Add New → Project → Import `plecjhi-ai/hotel-lapka` → Framework Preset: Other → Root Directory: `./` → Deploy. Після публікації вставте фактичне посилання `.vercel.app` у звіт. Для перевірки CI/CD внесіть власну невелику зміну, зробіть commit і push, потім перевірте новий deployment у Vercel.

## Важливе обмеження

Успішний стан — лише **імітація**. Немає серверної доставки, збереження персональних даних або реальної відправки повідомлення.
