# 享樂酒店訂房平台
> 提供便捷的訂房流程，獨立部署於 Render，整合 MongoDB 資料庫，提供便捷的訂房體驗，並優化 SEO
> 主要技術：Nuxt3, Vue3 Composition API, TypeScript, UnoCSS

![Node Version](https://img.shields.io/badge/node-20.10.0-blue)
![Deploy](https://img.shields.io/badge/deploy-Render-brightgreen)
![Tech](https://img.shields.io/badge/nuxt3-v3.x-42b883)
![Last Commit](https://img.shields.io/github/last-commit/PinyiW0/hotelBookingWeb)

---

## 技術資訊速覽

| 項目       | 說明                            |
|------------|-------------------------------|
| 前端框架    | Nuxt 3、Vue 3                   |
| 前端語言    | TypeScript、Javascript         |
| CSS        | UnoCSS                        |
| 資料庫      | MongoDB                       |
| 部署平台    | Render                        |
| 其他特性    | SEO 優化、路由守衛 |

---

## 環境需求
![Node Version](https://img.shields.io/badge/node-20.10.0-blue)

- Node.js 版本：`20.10.0`

---

## 快速開始

```bash
# 安裝相依套件
npm install

# 啟動開發伺服器
npm run dev
```

---

## 專案結構簡介

```
├── api/             # API 引入
├── assets/          # 靜態資源
├── components/      # 元件
├── composables/     # API、地址、房間相關函式
├── layouts/         # 頁面佈局
├── middleware/      # 路由守衛
├── pages/           # 頁面
├── plugins/         # 第三方套件
├── public/          # 圖片
├── utils/           # API 封裝
└── README.md        # 專案說明
```

---

## 開發注意事項

- ✅ 所有 `img` 必須加上 `alt` 描述屬性
- ✅ 所有 `a` 標籤必須包含 `href` 與 `title`
- ✅ 每個頁面需遵循 HTML 結構階層：
  - 每頁必須至少有一個 `<h1>` 和 `<h2>`
  - 不可直接跳階（例：要用 `<h4>` 前必須先有 `<h3>`）

---

## Git Commit 提交規範
| 類型     | 說明               |
|----------|--------------------|
| `feat`   | 新增功能           |
| `fix`    | 修復 Bug           |
| `style`  | 調整樣式，無邏輯變動 |
| `perf`   | 效能優化           |
| `refactor` | 程式重構         |
| `revert` | 回復先前的提交     |
| `test`   | 測試相關變更       |
| `docs`   | 文件修改           |
| `chore`  | 專案建置或輔助工具調整 |
| `types`  | Type 定義調整      |
| `wip`    | 開發中，尚未完成的功能 |

---

## 聲明
本專案為學習用途，非商業用途