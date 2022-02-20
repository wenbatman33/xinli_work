# 共用组件： 修改记录

## 共用组件说明：
  PM(阿孟)说要记录后端才会记录 且要绑上权限
## 开启方式：
  - Header Icon 开启 `(@/components/blHeader.vue)`
  - vuex 变数 common/hasLog `(@/store/modules/common.js)`
  - 判断是否可以开启写在 `(@/views/index.vue)` 内的 `watchers.activeTab`
## 权限 2种：
  1 表格不用id `rul` 后加上 `HasLog`
    ex: (/banner) bannerHasLog: "查看修改记录"
  2 单一的需要id 但仅限查看单一资料可开启 新增时不可开启 , 加上 `HasLogNeedId`
    ex: (/bannerCreate) bannerCreateHasLogNeedId: "查看修改记录"
## 参数：
  1. API 需要参数 `logGroupId` 来判别回传资料类型(有提供API查询 但目前写死在前端)
  2. 后续若有需要新增 需手动于`(@/components/UpdateLog/groupIdMap.js)`添加
## 开发懒人包：
  1. 增加权限 (权限2种 第二点)
  2. logGroupId参数设定 (参数 第二点)
## 特殊规则
  - 无单一页面, 单一修改记录开启于列表
    - 全站推播 `pushManage`
    - 体育推播 `sportPushManage`
    - 科目 `paymentAccount`
    - 全站app更新 `appVersion`
    - 体育app更新 `sportAppVersion`
  - api未完成 未加上修改记录
    - 体育欢迎词
  - 后端表示：体育与全站无法分开 目前是共用 GroupId
