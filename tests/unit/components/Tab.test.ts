/// <reference types="vitest" />
import { mountSuspended } from '@nuxt/test-utils/runtime'
import Tab from '@/components/Tab.vue'
import { describe, expect, it } from 'vitest'

/**
 * 是否正確高亮選中的 tab	用 getByText 找到文字 → .closest('button') 抓 class
 * 是否成功 emit modelValue	點擊 tab → 用 emitted() 檢查事件與參數
**/
describe('Tab.vue', () => {
  const mockTabs = [
    { title: 'Tab A', val: 'a' },
    { title: 'Tab B', val: 'b' },
    { title: 'Tab C', val: 'c' },
  ]

  it('應該根據 modelValue 高亮當前 tab', async () => {
    // 測試實作：用 DOM 檢查視覺樣式變化
    const wrapper = await mountSuspended(Tab, {
      props: {
        list: mockTabs,
        modelValue: 'b',
      },
    })

    const buttons = wrapper.findAll('button')
    const activeButton = buttons.find((btn) => btn.text().includes('Tab B'))

    expect(activeButton?.classes()).toContain('text-primary')
  })

  it('點擊 tab 會觸發 update:modelValue', async () => {
    // 測試行為：模擬點擊，檢查 emit
    const wrapper = await mountSuspended(Tab, {
      props: {
        list: mockTabs,
        modelValue: 'a',
      },
    })

    const tabC = wrapper.findAll('button').find((btn) => btn.text().includes('Tab C'))
    await tabC?.trigger('click')

    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['c'])
  })
})


