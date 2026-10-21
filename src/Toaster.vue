<template>
  <div class="asl-toaster" role="region" aria-label="Уведомления" @mouseenter="service.pauseTimeouts()" @mouseleave="service.restartTimeouts()" @focusin="service.pauseTimeouts()" @focusout="service.restartTimeouts()">
    <TransitionGroup name="asl-toast" tag="div" class="asl-toaster__list">
      <div v-for="item in service.list.value" :key="item.id" class="asl-toaster__item" :class="`asl-toaster__item--${item.view}`" :role="item.view === 'danger' ? 'alert' : 'status'">
        <span class="asl-toaster__mark" aria-hidden="true">{{ item.view === 'danger' ? '!' : '✓' }}</span>
        <span class="asl-toaster__text">{{ item.title }}</span>
        <button type="button" class="asl-toaster__close" :aria-label="`Закрыть: ${item.title}`" @click="service.remove(item.id)">×</button>
      </div>
    </TransitionGroup>
  </div>
</template>
<script setup lang="ts">
import { useToaster } from './service'
const service = useToaster()
</script>
<style>
.asl-toaster{position:fixed;z-index:1000;top:24px;left:50%;transform:translateX(-50%);width:min(350px,calc(100vw - 32px));pointer-events:none}.asl-toaster__list{display:grid;gap:8px}.asl-toaster__item{display:flex;align-items:center;gap:12px;min-height:48px;padding:10px 12px;border-radius:14px;box-shadow:0 5px 24px #0002;color:#fff;background:var(--asl-toast-base,#167347);font:500 14px/1.35 system-ui,sans-serif;pointer-events:auto}.asl-toaster__item--danger{background:var(--asl-toast-danger,#bb3038)}.asl-toaster__item--primary{background:var(--asl-toast-primary,#242a36)}.asl-toaster__mark{display:grid;place-items:center;width:20px;height:20px;border:1.5px solid currentColor;border-radius:50%;font-weight:700;flex:none}.asl-toaster__text{flex:1;overflow-wrap:anywhere}.asl-toaster__close{border:0;background:transparent;color:inherit;font:24px/1 system-ui;cursor:pointer;min-width:32px;min-height:32px}.asl-toaster__close:focus-visible{outline:2px solid currentColor;outline-offset:2px}.asl-toast-enter-active,.asl-toast-leave-active{transition:opacity .2s,transform .2s}.asl-toast-enter-from,.asl-toast-leave-to{opacity:0;transform:translateY(-10px)}@media(prefers-reduced-motion:reduce){.asl-toast-enter-active,.asl-toast-leave-active{transition:none}}
</style>
