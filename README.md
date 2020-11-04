# vue 專案範本
vue , vuex, vue-router, axios, bootstrap-vue

多語系: 語系檔由server端拉取

多版型: 自訂assets/theme

## 安裝方式
```
npm install
```

各環境指令可在package.json中定義

### 開發環境
```
npm run serve
```
要自行建立 .env.local (不加入git版控)

### 編譯develop環境dist
```
npm run build:dev
```

### 編譯production環境dist
```
npm run build:prod
```
環境設定檔位於.env.production

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### 切換語系網址
```
網址加query string language
如 http://localhost:8080?language=en
```

### 語系檔使用方式
  $t('<類別key>.<內容key>')，請參照i18n底下的cn.js
  例如:
  ```
  {{ $t('Common.Hello') }}
```
 API抓到的語系檔預設放在Remote這一層類別下面
```
  {{ $t('Remote.api_info') }}
  {{ $t('Remote["Point has refund"]') }}
```

### 提醒modal
```
import { showNotice } from '@/utils/tool'

showNotice('message')
```

### 確認modal
```
import { showConfirm } from '@/utils/tool'

showConfirm('message', function(){})
```
**Note:** 第二個參數如果不是function就不會有點擊後callback