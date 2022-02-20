# 18老虎城 PC版設定 

## 首先安裝 vue-cli
```
npm install -g @vue/cli
或
yarn global add @vue/cli
```

## 安裝專案相依套件
```
npm i
或
yarn install
```
## 開啟 vue ui
```
vue ui
```
**優先清除 vue-cli 專案設定** 讓vue.config.js發揮作用,

vue.config.js 可以設定port,相關 webpack相關設定檔案, 第三方套件分開打包...等設定

## 專案相關環境變數設定
**.env.development** - 對應開發機的環境設定

**.env.dev** - 對應dev測試機的環境設定 & 對應 **bitbucket專案 dev branch**

**.env.stage** - 對應stage機的環境設定 & 對應 **bitbucket專案 stage branch**

**.env.production** - 對應dev測試機的環境設定 & 對應 **bitbucket專案 master branch**

### package.json 相關設定
```
"scripts": {
    "serve": "vue-cli-service serve --mode development",
    "dev": "vue-cli-service build --mode dev",
    "stage": "vue-cli-service build --mode stage",
    "build": "vue-cli-service build --mode production",
    "lint": "vue-cli-service lint",
    "dll": "rimraf dll && webpack -p --progress --config webpack.dll.config.js",
    "test:unit": "vue-cli-service test:unit"
  },
```

分別以serve, dev, stage, build, lint, dll, test 等相關執行指令

1. serve - 供 vue cli 執行開發 server本機端頁面
2. dev - webpack 打包 **dev** 測試機檔案,以供上傳至**bitbucket專案 dev branch**
3. stage - webpack 打包 **stage** 測試機檔案,以供上傳至**bitbucket專案 stage branch**
4. build - webpack 打包 **build 正式機檔案**,以供上傳至**bitbucket專案 build branch**
5. lint - eslint 依循eslint規範驗證
6. dll - 打包第三方套件
7. test - 目前尚未實作請略過....


```
eslintConfig: {
	"rules": {
		...
	}
}
```
相關省略 eslint設定規則設, 目前以 airbnb 規範為基底,來作為專案的語法堂

## vue.config.js相關設定
```
outputDir: process.env.outputDir,
assetsDir: 'static',
devServer: {
    host: '0.0.0.0',
    port: 8888,
    https: false,
    hotOnly: true,
    proxy: null,
  }
```
內含outputDir .env環境變數設定, 

assetsDir 檔案夾位置, 

devServer 可以修改 port＆https設定 

```
pages: {
    index: {
    ...
    },
    fastregister: {
      ...
    },
    loading: {
     ...    
    },
  }
```
可以讓spa專案增加頁面設定

```
chainWebpack: (config) => {
    config.externals({
      vue: 'Vue',
      'element-ui': 'ELEMENT',
    });
  },
```
config.externals 設定排除相關套件套件包入webpack chunk中，改用cdn引入的方式載入 

```
configureWebpack: (config) => {
	...    
}
```
configureWebpack 內含了 gzip 相關設定,
 
vendor.dll 第三方元件獨立打包,

Uglify相關設定...等設定



### http.js 相關設定
#### 內含 router攔截器設定 axios攔截器設定 jwtDecode JWT 相關驗證

***axios攔截器 request設定***

```
axios.interceptors.request.use(
	(config) => {
		...
	}
);
```

每次request前會先驗證,是否有window.localStorage.JWT_TOKEN,

並將token設定在 每次發送api的 headers Authorization, 若有錯誤會導向error頁面

***axios攔截器 response設定***

```
axios.interceptors.response.use(
	(config) => {
		...
	}
);
```

1. 每次response 先檢查是否有error_code, 若有錯誤會先發送store事件dispatch MemberErrorLogout
2. 檢查是否有window.localStorage.JWT_TOKEN,

	a. **若無window.localStorage.JWT\_TOKEN** 初始化JWT_INIT,
	
	b. **若有window.localStorage.JWT\_TOKEN** 則將JWT Decode登入狀態, 檢查是否有 login, logout, loginfail, expired等狀態
3. window.localStorage.JWT_TOKEN若有非法規則,則跳tokenIllegal()

### vuex 架構
```
import vue from 'vue';
import vuex from 'vuex';
import member from './store_member';
import index from './store_index';
import game from './store_game';
import promotion from './store_promotion';
import news from './store_news';

vue.use(vuex);
export default new vuex.Store({
  modules: {
    member,
    index,
    game,
    promotion,
    news,
  },
});
```
vuex 拆分為以上結構,

1. member - 管理相關會員資訊,狀態, 金額...等設定
2. index - 管理首頁banner, Provider, Jackpot, HeroBoard, JwtExpireCheck...等設定
3. game - 管理遊戲頁面 GameList, GameTagGroup, BrandBanner, 曾經遊玩, 用戶收藏遊戲...等設定
4. news - 管理 NewsGroup, NewsList, 是否有新公告...等設定
5. promotion - 管理 優惠活動群組, 優惠活動列表...等設定


### views pages





