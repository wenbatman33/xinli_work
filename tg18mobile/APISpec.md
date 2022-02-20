# 18老虎城mobile API SPEC

## 環境 host

```
https://aa18tg918.tgcity18.center
```

測試機網域

```
https://stage.tgxapi.club
```

stage機網域

```
https://aa18tg918.tgxxstatic.me/a
```

正式機網域

**以下API位置會省略host位置**


## 首頁

```
/Web_Page/GameGroup

```
取得老虎機、捕魚機、棋牌遊戲三種遊戲類別列表，需各別帶入 **GameType:1、GameType:2、GameType:3**

```
/Web_Page/NewsList
```
取得公告列表，並顯示是否有新的公告顯示小紅點，需帶入 **NowTime:1**</font>

```
/Web_Page/PopularGame
/Web_Page/BannerList
/Member_All/AdminMemberData
/Member_All/MemberInbox
/Member_All/MemberBankList
/WalletAll/UserWalletInfo
/WalletAll/GetGameWalletNew
/Web_Page/GetUserOfferCount
```


## 站內信

```
/Web_Page/NewsList
/Web_Page/NewsGroup
```

## 中心錢包

```
/WalletAll/UserWalletInfo
/WalletAll/GetGameWalletNew
/Web_Page/GameGroup
```

## 存轉提

```
/WalletAll/UserWalletInfo
/WalletAll/GetGameWalletNew
/Member_All/MemberBankList
/Payment/GetCashierChannel
/Payment/GetUserBankList
```

## 個人中心

```
/WalletAll/UserWalletInfo
/WalletAll/GetGameWalletNew
```


## 遊戲品牌頁

```
/Web_Page/GameGroup
/Web_Page/BannerList
/Web_Page/Jackpot/Group
```


## 熱門遊戲

```
/Web_Page/GameList
/Web_Page/BannerList
```


## 遊戲收藏

```
/Web/QueryGameRecord
/Web_Page/BannerList
```


## 曾經玩過遊戲

```
/Web/QueryGameRecord
/Web_Page/BannerList
```

## 公告

```
/Web_Page/NewsList
/Web_Page/NewsGroup
```

## 優惠

```
/Web_Page/PromotionsList
/Web_Page/PromotionsGroup
```


## 領獎-返水、救援金、紅利

```
/WalletAll/GetCashLog/return
/WalletAll/GetCashLog/rescue
/WalletAll/GetCashLog/bonus
```

## 資金紀錄- 全部、存款、提款、轉帳

```
/WalletAll/GetCashLog/all
/Payment/QueryOrder
/Payment/QueryOrder
/WalletAll/GetCashLog/trans
```