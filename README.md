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