<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import io from "socket.io-client";
let socket = null;
let socketBackendEventLogin = false;
let socketBackendWithdrawLogin = false;
let notifyConfig = {
  body: "18老虎城通知",
  icon: "./favicon.ico"
};
export default {
  name: "App",
  methods: {
    getNotify() {
      let self = this;
      this.$store.dispatch("member/MemberSocket", socket);
      // 有userid 且開啟究收通知
      if (parseInt(this.$store.state.member.user_info.admin_userid) > 0) {
        // ＝＝＝＝＝＝＝＝＝＝＝＝＝ socket 新增使用者 ＝＝＝＝＝＝＝＝＝＝＝＝＝
        function checkBackendEventLogin() {
          // 判斷是否有「事件」權限
          return axios({
            method: "post",
            url: process.env.VUE_APP_APIHOST + "Admin/QueryAuthority",
            data: {
              Path: "/tgEventInfo"
            }
          })
            .then(function(response) {
              if (response.data.status == 1) {
                let page_event_auth = response.data.data.find(function(
                  item,
                  index,
                  array
                ) {
                  if (
                    item.AdminUserId ==
                    self.$store.state.member.user_info.admin_userid
                  ) {
                    if (item.Read_Auth === "1") {
                      socketBackendEventLogin = true;
                    }
                  }
                });
              }
            })
            .catch(function(error) {
              console.log(error);
            });
        }
        function checkBackendWithdrawLogin() {
          // 判斷是否為財務部
          return axios({
            method: "post",
            url: process.env.VUE_APP_APIHOST + "Admin/QueryUser",
            data: {
              UserGroupList: 4
            }
          })
            .then(function(response) {
              if (response.data.status == 1) {
                let group_auth = response.data.data.find(function(
                  item,
                  index,
                  array
                ) {
                  if (
                    item.AdminUserId ==
                    self.$store.state.member.user_info.admin_userid
                  ) {
                    if (item.Status === "1") {
                      socketBackendWithdrawLogin = true;
                    }
                  }
                });
              }
            })
            .catch(function(error) {
              console.log(error);
            });
        }

        axios.all([checkBackendEventLogin(), checkBackendWithdrawLogin()]).then(
          axios.spread(function(acct, perms) {
            // console.log(
            //   "socketBackendWithdrawLogin:" + socketBackendWithdrawLogin
            // );
            // console.log("socketBackendEventLogin:" + socketBackendEventLogin);
            if (socketBackendEventLogin || socketBackendWithdrawLogin)
              if (socket == null) {
                socket = io.connect(process.env.VUE_APP_SOCKET);
                socket.io.autoConnect = true;
                self.$store.dispatch("member/MemberSocket", socket);
                // console.log("socket open");
              } else return;

            if (socketBackendEventLogin) {
              // console.log("socket BackendEventLogin");
              socket.emit(
                "BackendEventLogin",
                self.$store.state.member.user_info.admin_userid
              );
            }
            if (socketBackendWithdrawLogin) {
              // console.log("socket BackendWithdrawLogin");
              socket.emit(
                "BackendWithdrawLogin",
                self.$store.state.member.user_info.admin_userid
              );
            }

            socket.on("connect", () => {
              // console.log("socket on Notice");
              socket.on("Notice", val => {
                let notification = new Notification(val.Data.Title, {
                  icon: notifyConfig.icon,
                  body: val.Data.Msg.replace("<span>", "").replace(
                    "</span>",
                    ""
                  ),
                  requireInteraction: true,
                  tag: val.Data.Title
                });

                notification.onclick = function(e) {
                  e.preventDefault();
                  if (val.Data.Type == 5)
                    self.$router.push({ path: "/tgEventList" });
                  else if (val.Data.Type == 4)
                    self.$router.push({ path: "/tgWithdrawalList" });

                  notification.close();
                };
              });
            });
            socket.on("disconnect", () => {
              // console.log("disconnect");

              if (
                parseInt(self.$store.state.member.user_info.admin_userid) > 0
              ) {
                // console.log("reconnect");
                socket.open();
                if (socketBackendEventLogin) {
                  // console.log("socket BackendEventLogin again");
                  socket.emit(
                    "BackendEventLogin",
                    self.$store.state.member.user_info.admin_userid
                  );
                }
                if (socketBackendWithdrawLogin) {
                  // console.log("socket BackendWithdrawLogin again");
                  socket.emit(
                    "BackendWithdrawLogin",
                    self.$store.state.member.user_info.admin_userid
                  );
                }
                // setTimeout(function() {
                //   this.socketContent();
                // }, 50000);
              } else {
                socket = null;
                socketBackendEventLogin = false;
                socketBackendWithdrawLogin = false;
                self.$store.dispatch("member/MemberSocket", socket);
              }
              return;
            });
          })
        );
      }
    },

    // 連接socket並接收事件
    socketContent() {
      let self = this;

      if (!("Notification" in window)) {
        // 檢查瀏覽器是否支援通知
        console.log("This browser does not support notification");
      } else if (Notification.permission === "granted") {
        // 使用者已同意通知
        this.getNotify();
      } else if (Notification.permission !== "denied") {
        // 通知權限為 default (未要求) or undefined (老舊瀏覽器的未知狀態)，向使用者要求權限
        Notification.requestPermission(function(permission) {
          if (permission === "granted") {
            self.getNotify();
          }
        });
      }
    }
  },
  mounted() {
    this.socketContent();
  }
};
</script>