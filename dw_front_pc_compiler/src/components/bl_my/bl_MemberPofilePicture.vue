<template lang="pug">
el-form.w-100(:model="pictureForm", ref="pictureForm")
  .row.no-gutters.p-4
    .col-12.my-3
      h3.text-center 更换头像
    .col-12.my-3
      .row
        .col-4.my-2(v-for='(item, index) in 6')
          .avaterItem(@click='pictureForm.profile_picture=index+1')
            img.avater(:src='imageUrl(index+1)')
            .overLayer(v-if='pictureForm.profile_picture==index+1')
              i.fas.fa-check-circle
    .col-12.my-2
      el-form-item
        el-button.w-100(type="primary", @click='formSubmit("pictureForm")') 提交
</template>
<script>
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex';

let loop;
export default {
  data() {
    return {
      pictureForm: {
        profile_picture: 0,
      },
    };
  },
  computed: {
    ...mapState('member', [
      'PersonalDetail',
    ]),
  },
  watch: {
    PersonalDetail(val) {
      const vm = this;
      vm.pictureForm.profile_picture = val.memberPofilePicture;
    },
  },
  methods: {
    formSubmit() {
      const vm = this;
      this.$store.dispatch('member/PersonalDataPatch', vm.pictureForm)
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            vm.$message({ message: '修改成功', type: 'success' });
            vm.$store.dispatch('member/PersonalGetData');
            vm.$store.dispatch('dialog/closeCommandDialog');
          }
        });
    },
    imageUrl(index) {
      return `${window.CDN_ASSETS}/static/img/memberPofilePicture/avater_${index}.png`;
    },
  },
  mounted() {
    const vm = this;
    vm.pictureForm.profile_picture = this.PersonalDetail.memberPofilePicture;
  },
};
</script>

<style lang="scss" scoped>
.avaterItem{
  position: relative;
  width: 100px;
  height: 100px;
  border-radius: 100%;
  overflow: hidden;
  .avater{
    position: relative;
    display: inline-block;
    width: 100px;
    height: 100px;
    text-align: center;
    line-height: 120px;
    border: solid 1px $DW_ColorLight;
    border-radius: 100%;
    color: #DFD8F5;
    font-size: 50px;
    background-color: $DW_ColorAlpha_10;
  }
  .overLayer{
    position: absolute;
    width: 100%;
    height: 100px;
    background: $DW_ColorDarkAlpha_80;
    top: 0;
    left: 0;
    z-index: 2;
    color: white;
    line-height: 100px;
    text-align: center;
    font-size: 20px;
  }
}
</style>
