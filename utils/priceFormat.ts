export function formatPrice(val: number): string {
  return new Intl.NumberFormat('zh-TW', { style: 'decimal' }).format(val);
};