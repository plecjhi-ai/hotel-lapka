# Лабораторна робота №8 — Git, GitHub та деплой

## Важливо про історію
У цьому навчальному архіві вже створено 3 локальні коміти, підготовлені ChatGPT з вмісту ЛР №7. Автор цих комітів — «Навчальний проєкт (підготовлено ChatGPT)», а не студент. Не видавайте їх за власноруч виконані коміти. Для демонстрації власної практики зробіть додатковий коміт зі справжніми змінами.

## Перевірити локальну історію
```bash
git status
git log --oneline --decorate -5
```

## Створити власний коміт
Налаштуйте своє реальне ім'я та email (краще локально для цієї папки):
```bash
git config user.name "Ваше ім'я"
git config user.email "ваш-email-з-github@example.com"
```
Внесіть правку (наприклад, виправте картинки у картках), після цього:
```bash
git add .
git commit -m "fix: update pet accommodation images"
git status
```

## Публікація на GitHub
1. Створіть порожній публічний репозиторій `hotel-lapka` на GitHub **без** README, .gitignore та License.
2. У терміналі VS Code в цій папці виконайте (замініть USERNAME):
```bash
git remote add origin https://github.com/USERNAME/hotel-lapka.git
git push -u origin main
```
3. Авторизація через браузер, менеджер облікових даних або токен; пароль GitHub для git push не використовується.
4. Якщо `origin` уже є: `git remote -v`; для зміни адреси: `git remote set-url origin URL`.

## GitHub Pages
GitHub → Settings → Pages → Build and deployment → Deploy from a branch → `main` / `(root)` → Save.
Очікуваний URL: `https://USERNAME.github.io/hotel-lapka/`. Це лише шаблон, справжній URL з'явиться після публікації.
Всі локальні ресурси сайту підключено відносними шляхами, тому вони сумісні з розміщенням в підкаталозі репозиторію.

## Netlify
Сайт з ЛР №7 вже показано за адресою: https://frolicking-moxie-ae6a73.netlify.app/
Для Git-автодеплою Netlify → Add new project → Import an existing project → GitHub → виберіть `hotel-lapka`. Для статичного сайту build command не потрібна; publish directory — `.`. Це створить окремий сайт, якщо не підключати репозиторій у налаштуваннях вже існуючого сайту. Підключайте GitHub до наявного сайту, якщо хочете зберегти попередній URL.

## Гілка та злиття
```bash
git switch -c fix/mobile-layout
# зробіть зміну файлу
git add .
git commit -m "fix: improve mobile layout"
git switch main
git merge fix/mobile-layout
git push
```

## git pull
```bash
git pull --ff-only origin main
```
Якщо є незакомічені локальні зміни, спочатку закомітьте їх або тимчасово приберіть через `git stash`.

## Скриншоти для звіту
1. `git status` та `git log --oneline` у VS Code.
2. Публічний GitHub репозиторій із файлом index.html.
3. Відкритий GitHub Pages сайт.
4. Сайт Netlify.
