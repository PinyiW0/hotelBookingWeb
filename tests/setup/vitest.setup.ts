import { config } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import ElementPlus from 'element-plus'
import { vi } from 'vitest'

// 設定全域 plugin，例如 Pinia、Element Plus
config.global.plugins = [
  createTestingPinia({
    stubActions: false, // 測試 action 的話設 false
    createSpy: vi.fn,
  }),
  ElementPlus,
]

// stub NuxtLink，避免元件中使用 <NuxtLink> 出錯
config.global.stubs = {
  NuxtLink: {
    template: '<a><slot /></a>',
  },
}