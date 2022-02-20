import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/api/v1/Member/Login',
    method: 'post',
    data
  })
}

export function logout(data) {
  return request({
    url: '/api/v1/Member/Logout',
    method: 'post',
    data
  })
}

// //////////////////////////////////////////////////
export function getMemberList(params) {
  return request({
    url: '/api/v1/Member',
    method: 'get',
    params
  })
}
// 訂單列表API，含搜尋功能
export function getOderList(params) {
  return request({
    url: '/api/v1/Order',
    method: 'get',
    params
  })
}
// 訂單紀錄查看
export function getOderLog(id,) {
  return request({
    url: '/api/v1/Order/Log/' + id,
    method: 'get'
  })
}
// 取得用戶點數，含搜尋功能
export function getPoint(params) {
  return request({
    url: '/api/v1/Member/Point',
    method: 'get',
    params
  })
}
// 訂單狀態重新回調API（三方代收）
export function getOderNotify(id,) {
  return request({
    url: '/api/v1/Order/Notify/' + id,
    method: 'get'
  })
}
// 訂單狀態重新回調API（三方代收）
export function oderEdit(id, data) {
  return request({
    url: '/api/v1/Order/Edit/' + id,
    method: 'patch',
    data
  })
}
// //////////////////////////////////////////////////
// 商戶代收訂單，含搜尋功能
export function getMerchantOrder(params) {
  return request({
    url: '/api/v1/MerchantOperator/Order',
    method: 'get',
    params
  })
}
// 商戶回調訂單狀態APII（三方代收）
export function getMerchantNotify(id,) {
  return request({
    url: '/api/v1/MerchantOperator/Notify/' + id,
    method: 'get'
  })
}
// 商戶資訊
export function getMerchantInfo() {
  return request({
    url: '/api/v1/MerchantOperator/Info',
    method: 'get'
  })
}
// 新增、刪除IP白名單 API
export function patchMerchantIps(data) {
  return request({
    url: '/api/v1/MerchantOperator/Ips',
    method: 'patch',
    data
  })
}
// //////////////////////////////////////////////////
// 下游商戶列表API，含搜尋功能
export function getMerchant(params) {
  return request({
    url: '/api/v1/Merchant',
    method: 'get',
    params
  })
}
export function registerMerchant(id, data) {
  return request({
    url: '/api/v1/Merchant' + id,
    method: 'put',
    data
  })
}
// //////////////////////////////////////////////////
/**
 *
 * @param {string} account  會員帳號
 * @param {string} password 密碼，嘴少８碼最多１６碼
 * @param {string} email   	郵件
 * @param {string} name     真實姓名
 * @param {string} note     備註
 */
export function createOperator(data) {
  return request({
    url: '/api/v1/Member/Register/Operator',
    method: 'put',
    data
  })
}

/**
 *
 */
export function createMerchant(data) {
  return request({
    url: '/api/v1/Member/Register/Merchant',
    method: 'put',
    data
  })
}

/**
 *
 */
export function createMasterDistributor(data) {
  return request({
    url: '/api/v1/Member/Register/MasterDistributor',
    method: 'put',
    data
  })
}

/**
 *
 */
export function createSlaveDistributor(data) {
  return request({
    url: '/api/v1/Member/Register/SlaveDistributor',
    method: 'put',
    data
  })
}
/**
 *
 */
export function createTrader(data) {
  return request({
    url: '/api/v1/Member/Register/Trader',
    method: 'put',
    data
  })
}

/**
 * @param {string} id  會員編號
 */
export function updateMember(id, data) {
  return request({
    url: '/api/v1/Member/Edit/' + id,
    method: 'patch',
    data
  })
}
/**
 * @param {string} id  用戶上分
 */

export function updateMemberIncrement(id, data) {
  return request({
    url: '/api/v1/Member/Increment/' + id,
    method: 'patch',
    data
  })
}

/**
 * @param {string} id  會員編號
 */
export function updateMemberStatus(id,) {
  return request({
    url: '/api/v1/Member/Status/' + id,
    method: 'patch'
  })
}

/**
 * @param {string} id  會員編號
 */
export function updateMemberFrozen(id,) {
  return request({
    url: '/api/v1/Member/Frozen/' + id,
    method: 'patch'
  })
}

