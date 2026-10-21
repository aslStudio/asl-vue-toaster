import { inject, ref, type App, type InjectionKey, type Ref } from 'vue'

export type Toast = { title: string; view?: 'base' | 'danger' | 'primary'; duration?: number }
export type ToastItem = Required<Omit<Toast, 'duration'>> & { id: number }
export type ToastService = { list: Ref<ToastItem[]>; show(input: Toast | string): number; showError(text?: string): number; remove(id: number): void; clear(): void; pauseTimeouts(): void; restartTimeouts(): void; install(app: App): void }
export const ToastServiceKey: InjectionKey<ToastService> = Symbol('ToastService')

export function createToastService({ max = 3, duration = 5000 }: { max?: number; duration?: number } = {}): ToastService {
  const list = ref<ToastItem[]>([])
  const timers = new Map<number, ReturnType<typeof setTimeout>>()
  const remaining = new Map<number, number>()
  const started = new Map<number, number>()
  let nextId = 1
  let paused = false
  function remove(id: number) {
    clearTimeout(timers.get(id)); timers.delete(id); remaining.delete(id); started.delete(id)
    list.value = list.value.filter((item) => item.id !== id)
  }
  function schedule(id: number) {
    if (paused) return
    started.set(id, Date.now())
    timers.set(id, setTimeout(() => remove(id), remaining.get(id) ?? duration))
  }
  function show(input: Toast | string) {
    const toast = typeof input === 'string' ? { title: input } : input
    const id = nextId++
    list.value.unshift({ title: toast.title, view: toast.view ?? 'base', id })
    remaining.set(id, toast.duration ?? duration)
    while (list.value.length > max) remove(list.value[list.value.length - 1]!.id)
    schedule(id)
    return id
  }
  const service: ToastService = {
    list, show, showError: (text = 'Что-то пошло не так') => show({ title: text, view: 'danger' }), remove,
    clear: () => { for (const item of [...list.value]) remove(item.id) },
    pauseTimeouts: () => { paused = true; for (const [id, timer] of timers) { clearTimeout(timer); remaining.set(id, Math.max(0, (remaining.get(id) ?? duration) - (Date.now() - (started.get(id) ?? Date.now())))) } timers.clear() },
    restartTimeouts: () => { if (!paused) return; paused = false; for (const item of list.value) schedule(item.id) },
    install: (app) => { app.provide(ToastServiceKey, service) }
  }
  return service
}

export function useToaster(): ToastService {
  const service = inject(ToastServiceKey)
  if (!service) throw new Error('Install a toast service with app.use(createToastService())')
  return service
}
