var LC_API = LC_API || {};
let livechat_chat_started = false;

LC_API.on_before_load = function () {
  // don't hide the chat window only if visitor
  // is currently chatting with an agent
  if (LC_API.visitor_engaged() === false && livechat_chat_started === false) {
    LC_API.hide_chat_window();
  }
};

LC_API.on_chat_started = function () {
  livechat_chat_started = true;
};

if (window.localStorage.LC_API_ID) {
  window.__lc = window.__lc || {};
  window.__lc.license = 8233741;
  // 夢工廠群組
  window.__lc.group = 7;
  window.__lc.visitor = { name: window.localStorage.LC_API_ID, Email: window.localStorage.LC_API_EMAIL };
} else {
  window.__lc = window.__lc || {};
  window.__lc.license = 8233741;
  // 夢工廠群組
  window.__lc.group = 7;
  window.__lc.visitor = { name: 'Guest' };
}
(function () {
  const lc = document.createElement('script'); lc.type = 'text/javascript'; lc.async = true;
  lc.src = `${document.location.protocol == 'https:' ? 'https://' : 'http://'}cdn.livechatinc.com/tracking.js`;
  const s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(lc, s);
}());
