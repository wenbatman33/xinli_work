// timestamp 转 日期 + 时间
export function toDateTime(timestamp) {
  if (!timestamp) return ''; // 没传就回空字串
  return new Date(timestamp * 1000).toLocaleString();
}

// timestamp 转日期
export function toDate(timestamp) {
  return new Date(timestamp * 1000).toLocaleDateString();
}

// *100 + %后保留两位 0.066 转成 6.60 %
export function toPercent(value) {
  return `${(value * 100).toFixed(2)}%`;
}

// 金额增加千位符号 金额增加千位符号及补小数点后两位
// MARK: 格式不对会回传 0.00 回去 如果不符合需求 在判断掉
export function toMoney(value) {
  const money = +value || 0;

  let str = ((money * 100) / 100).toFixed(2).toString();
  let rs = str.indexOf('.');

  if (rs < 0) {
    rs = str.length;
    str += '.';
  }

  while (str.length <= rs + 2) {
    str += '0';
  }

  return str.toString().replace(/^(-?\d+?)((?:\d{3})+)(?=\.\d+$|$)/, (all, pre, groupOf3Digital) => pre + groupOf3Digital.replace(/\d{3}/g, ',$&'));
}

// 后面沒有小數點
export function toMoney2(value) {
  const money = +value || 0;

  let str = ((money * 100) / 100).toFixed(2).toString();
  let rs = str.indexOf('.');

  if (rs < 0) {
    rs = str.length;
    str += '.';
  }

  while (str.length <= rs + 2) {
    str += '0';
  }

  return str.toString().replace(/^(-?\d+?)((?:\d{3})+)(?=\.\d+$|$)/, (all, pre, groupOf3Digital) => pre + groupOf3Digital.replace(/\d{3}/g, ',$&')).slice(0, -3);
}
