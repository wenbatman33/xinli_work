# SportSE 正波膽專案

### Status: VER. 1.00

## 安裝Vue

- 本專案使用 Vue 前端框架首先安裝 `npm install -g @vue/cli`
- 在終端機key `vue ui` 開啟vue cli 介面 匯入此專案
- 在serve 選項執行後 會在`http://localhost:2222/`上看到專案站台
- 打包編譯匯前 先執行vue cli `dll` 執行後會先將第三方js套件編譯承單一 vendors js
- 打包編譯 匯出檔案在vue cli 介面上選擇 `build` 執行後 匯出檔案至output檔案夾

### 安裝相依套件

安裝相依套件
``` npm install```

#### UI Framework

[Element UI](https://element.eleme.io/#/zh-CN/component/installation)
[Bootstrap](https://getbootstrap.com/docs/4.5/getting-started/introduction/)

#### 各環境變數

- 本地環境  `.env.development`
- test環境  `.env.dev`
- test環境  `.env.production`

#### 環境變數設定

- 匯出檔案夾 `outputDir=output/dev`
- vue.js版本 `VUE_APP_VUEJS = '/static/js/vue.js`
- API Host base網址 `VUE_APP_APIHOST='http://t-api.tgcity18.cc`
- 專案版本號 `VUE_APP_VER = '1.00.'`

#### vue.config.js設定

```
devServer: {
  host: '0.0.0.0',
  port: 1111,
  https: false,
  hotOnly: true,
  proxy: null,
}
```
###  專案內相關檔案

- `/public` 相關assets 相關檔案
- `/src` 專案檔案
- `/src/api` 所有API 彙整
- `/src/assets` scss基本設定
- `/src/components` 相關自製components
- `/src/store` vuex store狀態儲存
- `/src/views` 所有頁面
- `/src/axiosSetting.js` api request設定
- `/src/router.js` 頁面路徑設定
- `deploy.sh` 一鍵打包編譯相關設定
