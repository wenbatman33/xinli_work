<template lang="pug">
.container-fluid
  .container.goodCartWarp.mb-5
    .row
      .col-12.col-sm-12.col-md-12.col-lg-12.col-xl-12.my-3
        .DWBreadcrumb
          router-link(to='/') 首页
          span.mx-2 /
          router-link(to='/cart') 购物车订单
          span.mx-2 /
          span 收货信息
    .goodCartTitle.text-white 订单总结
    hr
    .shoppingPoint
      p.text-white.text-right
        h6.text-white.mr-5 合计: {{shoppingPoint | commaFormatDefault}} 
      hr
      p.text-white.text-right 
    .goodCartTitle.text-white 订单信息
    .exchangeFormDIV
      el-form( :model="exchangeForm", ref="exchangeFormREF", :rules="exchangeFormRules", @submit.native.prevent='submit("exchangeFormREF")')
        //- p.my-2
        //-   el-radio(v-if='memberStatus.phone', :disabled='!memberStatus.phone', v-model='phoneRadio', :label='1') 
        //-     span.text-white {{memberStatus.phone}}
        p.my-2(v-if='needsPhone')
          el-radio(v-model='phoneRadio', :label='2')  
            span
              span.text-white.my-2 请输入联系手机号
              span
                  el-form-item(prop='phone')
                    el-input(label='手机号：', 
                    :disabled='phoneRadio===1' 
                    v-model.number='exchangeForm.phone', 
                    type='tel', maxlength='11', 
                  placeholder='请输入联系手机号')
        div.my-2.d-flex.flex-row(v-if='needsAddress')
          .inputTite.text-white 收货地址:
          el-form-item.w-100(prop='address')
            el-input.w-100(label='收货地址', v-model='exchangeForm.address')
        div.my-2.d-flex.flex-row
          .inputTite.text-white 备注:
          el-form-item.w-100(prop='note')
            el-input(label='备注', v-model='exchangeForm.note')
        hr
        p.text-right 
          el-button(:disabled='(memberWallet.point-shoppingPoint)<0',type='primary',  @click='submit("exchangeFormREF")') 提交订单
</template>
<script>
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex';

export default {
  data() {
    const check_Phone = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输手机号'));
      } else if (!/^(13|14|15|16|17|18|19)\d{9}$/.test(value)) {
        callback(new Error('请输入正确的手机号'));
      } else {
        callback();
      }
    };
    return {
      // 选择另外的手机表单
      exchangeForm:{
        phone:'',
      },
      exchangeFormRules: {
        phone: [
          { required: false,  type: 'number', message: '请输手机号', trigger:'blur'},
          { validator: check_Phone, trigger: 'change' },
        ],
        address: [
          { required: false, message: '请输入正确的收货地址', trigger:'change'},
        ],
      },
      // 商品清单
      CART:[],
      phoneRadio:1,
      exchangeForm:{
        phone:'',
        address:'',
        note: '',
      },
      needsPhone: false,
      needsAddress: false,
    };
  },
  computed: {
    ...mapState('shopping', ['goodsCartList']),
    ...mapState('wallet', ['memberWallet']),
    ...mapState('member', ['memberStatus','PersonalDetail']),
    shoppingPoint() {
      let  allshoppingPoint = 0;
      this.$store.state.shopping.goodsCartList.map(function(obj) { 
        allshoppingPoint += (obj.point* obj.quantity)
      });
      return allshoppingPoint;
    },
  },
  methods: {
    deleteGood(index){
      // 删除品项
      const temp = this.goodsCartList
      temp.splice(index, 1); 
      this.$store.commit('shopping/setGoodsCartList', temp);
    },
    submit(form){
      // 发送表单
      const vm = this;
      this.$refs[form].validate((valid) => {
        if(valid){
          const payload ={
            goods:[],
            note: this.exchangeForm.note,
            phone: (this.phoneRadio===1)? this.memberStatus.phone : this.exchangeForm.phone,
            address: this.PersonalDetail.memberFullAddress,
          };
          this.$store.state.shopping.goodsCartList.map(function(obj) { 
            payload.goods.push(
              {
                goods_id: obj.goods_id,
                quantity: obj.quantity,
              }
            )
          });
          axios.post('/api/Goods/Exchange',payload)
            .then((res)=>{
              window.localStorage.removeItem(`CART_${window.localStorage.LC_API_ID}`);
              window.localStorage.removeItem('CARTTIME');
              this.$store.commit('shopping/setGoodsCartList', []);
              // 刷新錢包
              this.$store.dispatch('wallet/getMemberWallet');
              this.$router.push({ path: '/oder'});
            });
        }
      });
    }
  },
  mounted() {
    const vm =this;
    this.exchangeForm.address = this.PersonalDetail.memberFullAddress;
    this.goodsCartList.map((item)=>{
      if(item.type===1){
        vm.needsAddress = true;
        vm.exchangeFormRules.address.required = true;
      }

      if(item.category===1){
        vm.needsPhone = true;
        vm.exchangeFormRules.phone.required = true;
      }
    })
    if(this.memberStatus.phone) this.exchangeForm.phone= Number(this.memberStatus.phone);

    if(!this.memberStatus.phoene) this.phoneRadio =2;
    this.$store.dispatch('shopping/checkGoodsCartList');
  },
};
</script>

<style lang="scss" scoped>
.goodCartWarp{
  min-height: 500px;
  .cartImg{
    width: 90px;
    height: 90px;
  }
  .goodsItem{
    height: 120px;
    padding: 10px 0;
    box-shadow: inset 0 -1px 0 0 $whiteAlpha_30;
  }
  hr{
    border-top: 1px solid $whiteAlpha_30;
  }
  .inputTite{
    width: 120px;
  }
}
</style>
