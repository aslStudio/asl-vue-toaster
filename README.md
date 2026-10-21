# asl-vue-toaster

Простой toaster для Vue 3: три сообщения, таймер, пауза при наведении и фокусе. Цвета настраиваются CSS переменными.

```bash
npm install asl-vue-toaster
```

```ts
// main.ts
import { createToastService } from 'asl-vue-toaster'
import 'asl-vue-toaster/style.css'

export const toastService = createToastService({ max: 3, duration: 5000 })
app.use(toastService)
```

```vue
<template><Toaster /><button @click="toast.show('Готово')">Показать</button></template>
<script setup lang="ts">
import { Toaster, useToaster } from 'asl-vue-toaster'
const toast = useToaster()
</script>
```

`show({ title, view: 'danger' | 'base' | 'primary', duration })` возвращает ID. Доступны `showError`, `remove`, `clear`, `pauseTimeouts`, `restartTimeouts`. CSS переменные: `--asl-toast-base`, `--asl-toast-danger`, `--asl-toast-primary`.

## Разработка и публикация

Этот каталог является отдельным Git-репозиторием и самостоятельным npm-пакетом. Команды выполняются из его корня.

```bash
npm ci
npm test
npm run pack:check
npm login
npm publish --access public
```

Для публикации npm требует 2FA на аккаунте или granular access token с включённым **Bypass 2FA**. Для ручной публикации включите 2FA в настройках аккаунта npmjs.com, затем выполните `npm login` в терминале и `npm publish --access public`; подтвердите запрос npm. Если используется код из приложения-аутентификатора, можно указать `npm publish --access public --otp=КОД`. Не сохраняйте код или токен в репозитории.

Перед публикацией проверьте право на использование исходного кода и выберите лицензию. Сейчас в `package.json` указано `UNLICENSED`. Проверьте, что имя пакета доступно в npm; при необходимости измените `name` и заново выполните `npm install`. Для следующего релиза повысьте версию через `npm version patch`.

Для GitHub создайте пустой репозиторий с таким же именем, затем добавьте его как `origin` и отправьте ветку: `git remote add origin <адрес>`, `git push -u origin main`.
