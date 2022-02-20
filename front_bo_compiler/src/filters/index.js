// 金額增加千位符號
export function formatMoney(money) {
  return (+money || 0).toLocaleString('zh-cn', { maximumFractionDigits: 2 });
}

// url 增加時間戳
export function urlAddTimestamp(url) {
  try {
    const urlObject = new URL(url);
    const params = urlObject.searchParams;
    const timestamp = Date.now();

    params.has('timestamp') ? params.set('timestamp', timestamp) : params.append('timestamp', timestamp);

    return urlObject.toString();
  } catch (error) {
    return '';
  }
}

// 週 format
export function formatWeek(value) {
  try {
    const date = new Date(value);
    const y = date.getFullYear();
    let m = date.getMonth() + 1;
    if (m < 10) {
      m = '0' + m;
    }

    let d = date.getDate();
    if (d < 10) {
      d = '0' + d;
    }

    return `${y}-${m}-${d}`;
  } catch (error) {
    return '';
  }
}
