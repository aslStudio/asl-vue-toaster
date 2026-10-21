import test from 'node:test'
import assert from 'node:assert/strict'
import { createToastService } from '../dist/index.js'

test('limits queue and clears timers', () => {
  const toast = createToastService({ max: 2, duration: 10000 })
  toast.show('one'); toast.show('two'); toast.show('three')
  assert.deepEqual(toast.list.value.map((item) => item.title), ['three', 'two'])
  toast.clear()
  assert.equal(toast.list.value.length, 0)
})
