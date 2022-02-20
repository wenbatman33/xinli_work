<template lang="pug">
  .container-fluid.px-0
    .col-12.px-3.login_page.d-flex.justify-content-center.flex-column
      .logo.pb-5
        img(src="@/assets/img/logo.svg")
      .row.no-gutters.align-items-center
        el-form.col-md-4.col-12.offset-md-4
          el-card.box-card
            el-button.my-3(size='medium', type='primary', plain='', @click='handleClickGetAuth') 使用公司信箱登入
            .col-12.pb-1
    .footer
      tgFooter
</template>	
<script>
import tgFooter from "@/components/tgFooter";
export default {
  name: "login",
  components: {
    tgFooter
  },
  mounted() {
    let self = this;
    setTimeout(() => {
      self.googleBtnVisiable = true;
    }, 1000);
  },
  data() {
    return {
      googleBtnVisiable: false,
      memberData: {
        ID: "",
        FullName: "",
        IGivenNameD: "",
        FamilyName: "",
        ImageURL: "",
        Email: "",
        id_token: ""
      }
    };
  },
  methods: {
    handleClickGetAuth() {
      let self = this;
      this.$gAuth.signIn(function(authCode) {
        const access_token = authCode.Zi.access_token;
        axios
          .post(process.env.VUE_APP_APIHOST + "Login_Admin/GoogleLogin/", {
            access_token: access_token
          })
          .then(
            function(res) {
              if (res.data.status) {
                self.$store.dispatch(
                  "member/MemberLogin",
                  res.data.data.jwt_token
                );
                self.$parent.socketContent();
              } else {
                alert(res.data.error_message);
              }
            },
            function(error) {
              // console.log(error);
            }
          );
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.login_page {
  height: 90vh;
  background-image: linear-gradient(286deg, #0088da, #0050b3);
  .logo {
    width: 100%;
    text-align: center;
    img {
      width: 20vw;
      min-width: 200px;
      height: auto;
    }
  }
}
.box-card {
  width: 100%;
  text-align: center;
  line-height: 40px;
  font-size: 14px;
  border-bottom: 6px #fadb14 solid;
}
.footer {
  width: 100%;
  line-height: 5vh;
  background: #fff;
  text-align: center;
}
</style>