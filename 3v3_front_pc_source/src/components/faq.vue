<template lang="pug">
.page(style="overflow-x: scroll; overflow-y: hidden;")
  .headBg
  .mt-3.p-3.h-100.d-flex.flex-column
    //- 標题
    h2.text-white
      img(:src="img_alert_white")
      span.ml-2 帮助中心
    //- 狀態card
    .row.no-gutters.my-4.d-flex.align-items-center.flex-nowrap(
      style="white-space: nowrap; overflow: auto"
    )
      .btn.btn-lg.btn-light.mr-2(@click="clickHandle(0)", :class="{active: selectBtnNum===0}")
        span.mr-2
          img(:src="img_add_user")
        span 注册流程
      .btn.btn-lg.btn-light.mr-2(@click="clickHandle(1)", :class="{active: selectBtnNum===1}")
        span.mr-2
          img(:src="img_wallet")
        span 存款流程
      .btn.btn-lg.btn-light.mr-2(@click="clickHandle(2)", :class="{active: selectBtnNum===2}")
        span.mr-2
          img(:src="img_yuan")
        span 提款流程
      .btn.btn-lg.btn-light.mr-2(@click="clickHandle(3)", :class="{active: selectBtnNum===3}")
        span.mr-2
          img(:src="img_edit")
        span 手动下单
      .btn.btn-lg.btn-light.mr-2(@click="clickHandle(7)", :class="{active: selectBtnNum===7}")
        span.mr-2
          img(:src="img_alert")
        span 会员推广
      .btn.btn-lg.btn-light.mr-2(@click="clickHandle(4)", :class="{active: selectBtnNum===4}")
        span.mr-2
          img(:src="img_alert")
        span 常见问题
      .btn.btn-lg.btn-light.mr-2(@click="clickHandle(5)", :class="{active: selectBtnNum===5}")
        span.mr-2
          img(:src="img_alert")
        span 规则条款
      .btn.btn-lg.btn-light.mr-2(@click="clickHandle(6)", :class="{active: selectBtnNum===6}")
        span.mr-2
          img(:src="img_alert")
        span 关于PLK
      .btn.btn-lg.btn-light.mr-2(@click="clickHandle(8)", :class="{active: selectBtnNum===8}")
        span.mr-2
          img(:src="img_alert")
        span 玩法说明
    //- 表格
    .row.no-gutters.my-4(style="flex: 1; overflow-y: auto; overflow-x: hidden")
      .table3V3Wrap.overflow-auto
        .table3V3
          .faqItemDetail
            component(:is="faqList[selectBtnNum]")
</template>

<script>
import faq8 from '@/components/faq8.vue';
import faq0 from '@/components/faq0.vue';
import faq1 from '@/components/faq1.vue';
import faq2 from '@/components/faq2.vue';
import faq3 from '@/components/faq3.vue';
import faq4 from '@/components/faq4.vue';
import faq5 from '@/components/faq5.vue';
import faq6 from '@/components/faq6.vue';
import faq7 from '@/components/faq7.vue';

export default {
  name: 'faq',
  components: {
    faq0,
    faq1,
    faq2,
    faq3,
    faq4,
    faq5,
    faq6,
    faq7,
    faq8,
  },
  data() {
    return {
      img_alert_white: `${process.env.VUE_APP_STATIC}/img/alert.png`,
      img_add_user: `${process.env.VUE_APP_STATIC}/img/add-user.svg`,
      img_wallet: `${process.env.VUE_APP_STATIC}/img/wallet.svg`,
      img_yuan: `${process.env.VUE_APP_STATIC}/img/yuan.svg`,
      img_edit: `${process.env.VUE_APP_STATIC}/img/edit.svg`,
      img_alert: `${process.env.VUE_APP_STATIC}/img/alert.svg`,
      selectBtnNum: 0,
      faqList: ['faq0', 'faq1', 'faq2', 'faq3', 'faq4', 'faq5', 'faq6', 'faq7', 'faq8'],
      showFaqDetail: false,
      showFaqDetailItem: {},
      imgUrl: `${process.env.VUE_APP_STATIC}/img/pic-transaction.png`,
      faqJsonData: [
        {
          title: '存款问题？',
          des: '关于存款的步骤、常见问题与应注意事项',
          questions: [
            {
              q: '该如何进行存款?',
              a: '存款前请先登录梦工厂账号，若无账号请先进行注册。</br>电脑：</br>1.登陆后，在页面左侧点击【蓝色】钱包资金按钮，开启存款页面。</br>2.开启存款页面后，请先填写存款金额——再选择您要支付的方式——点击提交存款后，按照您所选择的支付方式，完成存款。</br></br>手机：</br>1.点击下方【存提】开启存款页面。</br>2.开启存款页面后，请先填写存款金额——再选择您要支付的方式——点击提交存款后，按照您所选择的支付方式，完成存款。</br></br>梦工厂提供多种存款支付的方式，若您在存款上有任何问题，欢迎联络客服提供宝贵的建议。',
            },
            {
              q: '如何使用“网银”进行存款?',
              a: '1.如未开通网上银行，须请您先到当地银行柜台开通网上银行业务，以加速您存款到账时间。  </br>2.在您提交存款后，请您依据页面显示的内容「转账到获取的账号并在附言处填写正确附言代码」，以完成存款。 ',
            },
            {
              q: '没有网银如何充值？',
              a: '选择微信支付或支付宝存款，扫一扫即可直接到账。',
            },
            {
              q: '网银存款附言是什么？一定要填吗？',
              a: '在您通过转账时，建议您在备注/附言/用途等处填写附言编码，可及时到账。',
            },
            {
              q: '存款至旧的银行卡账户怎么办？',
              a: '每次存款前请登录官网获取最新的银行卡账户，存至旧的银行卡账户将导致存款无法到账。',
            },
            {
              q: '存款一般多久到账？',
              a: '1. 极速网银快捷、微信、支付宝：完成支付后一般都是即时到账，如果出现延迟到账，请联系在线客服。 </br>2. 银行转账：相关部门会在确认到款项后的5分钟内办理到账。 记得填写正确的附言编码，即可实时到账。',
            },
            {
              q: '延迟到账怎么办？',
              a: '款项出现延迟到账的几种情况：</br>1. 银行系统维护或者系统延迟，导致款项延迟。一般出现在银行转账中，玩家可以耐心等待，等待款项到账后，再提交证明即可。 </br>2. 使用微信存款或者其他三方金流支付，由于系统延迟，导致款项延迟超过30分钟。玩家可以联系在线客服咨询详细情况，在线客服会协助您查询存款回单',
            },
          ],
        },
        {
          title: '提款问题',
          des: '关于提款的步骤、常见问题与应注意事项',
          questions: [
            {
              q: '该如何进行提款?',
              a: '提款前请先设定真实姓名、验证手机号码与银行卡资料。真实姓名可在个人资料页中设定，手机号码与银行卡资料可在安全中心绑定。</br>电脑</br>1.真实姓名：在页面左侧点击【头像】进入个人资料页。在个人资料页中输入【真实姓名】并提交。   </br>2.绑定手机：在安全中心页面，选择手机验证。输入您的手机号码，点击【发送验证码】，系统将会发送一组验证码简讯给您。将验证码输入后，点击【提交绑定】。   </br>3.绑定银行卡：在安全中心页面，选择【绑定银行卡】。点击【添加新银行卡】，在页面上输入开户名、选择开户行、开户行省份、城市与分行，以及您的银行卡号，点击【提交绑定】。   </br>4.在页面左侧点击【蓝色】钱包资金按钮，开启存提款页面，并切换至提款，并输入您的提款金额与选择要提款的银行卡，点击【提交提款】。</br></br>手机：</br>1.真实姓名：点击下方【我的】->【个人资料】->【真实姓名】，输入您的真实姓名并提交。   </br>2.手机验证：点击下方【我的】->【安全中心】->【手机验证】，输入您的手机号码，点击【发送验证码】，系统将会发送一组验证码简讯给您。将验证码输入后，点击【提交】完成验证。</br>3.绑定银行卡：点击下方【我的】->【安全中心】->【银行卡管理】，点击【添加新银行卡】，在页面上输入开户名、选择开户行、开户行省份、城市与分行，以及您的银行卡号，点击【提交】。</br>4.点击下方【存提】开启存款页面，切换至提款，并输入您的提款金额与选择要提款的银行卡，点击【提交】。</br></br>若您在提款上有任何问题，欢迎联络客服提供宝贵的建议。',
            },
            {
              q: '为什么任何一笔存款都需要打一倍流水？',
              a: '为了防止套利者进行洗钱行为，任何一笔存款都必须一倍流水才能提款。且依据不同的存款回馈活动，流水限制皆有不同。若您在提款流水上有任何问题，欢迎联络客服詢问。',
            },
            {
              q: '提款单笔限额和每日额度是多少？',
              a: '提款金额单笔最低100元最高20万，每日额度为50万。',
            },
            {
              q: '可以用多少张银行卡提款？',
              a: '可绑定多張与您真实姓名一致的提款卡。【安全中心-->银行卡绑定】中，点击新增进行添加。',
            },
            {
              q: '一张银行卡允许绑定多次吗？',
              a: '一张银行卡只允许绑定一个会员账号，不可以多次绑定。',
            },
            {
              q: '提款注意事项',
              a: '1.提款银行账户持有人姓名必须与您的真实姓名一致, 否则提款无法通过。</br>2.需达到流水限制：</br>每笔存款需一倍有效流水才可提款 (例: 您存款100, 需要有效投注100后，才可进行提款)</br>若您的存款有搭配优惠活动，则需要按照优惠活动的流水要求计算 (例: 存款100, 有搭配首存回馈20%红利，且提款条件为3倍流水,，则您的流水需达成360，才可提款。[100*20%=20，(100+20)x3=360])',
            },
          ],
        },
        {
          title: '注册与登录问题',
          des: '关于注册与登录的步骤、常见问题与应注意事项',
          questions: [
            {
              q: '该如何进行注册？',
              a: '梦工厂提供两种注册方式： </br>1.使用账号密码注册（预设） </br>电脑</br>（1）点击网站左侧第一颗“注册”按键，开启注册介面。 </br>（2）填写“账号与密码”，并勾选「已年满18岁，并接受相关的条款与隐私权政策。」，点击【立即注册】后，即可完成注册。 </br>手机</br>（1）进入首页后，点击上方注册按钮。 </br>（2）填写“账号与密码”，点击【注册】后，即可完成。 </br></br>2.使用手机快捷注册</br>电脑</br>（1）点击网站左侧第一颗“注册”按键，开启注册介面并切换为【手机快捷注册】。 </br>（2）填写您的手机号码，点击【发送验证码】，系统将会发送一组验证码简讯给您。将验证码输入后，并勾选「已年满18岁，并接受相关的条款与隐私权政策。」，点击【立即注册】，即可注册完成。 </br>（3）手机注册完成后，系统会提供给您一组账号密码，以便日后登入使用，建议您可立即修改账号密码，以免忘记。</br>手机</br>（1）进入首页后，点击上方注册按钮。 </br>（2）切换至“手机注册”，填写您的手机号码，点击【发送验证码】，系统将会发送一组验证码简讯给您。将验证码输入后，点击【注册】，即可注册完成。 </br></br>3. 如果注册信息栏有提示错误，代表该信息不符合要求，请根据提示重新填写。',
            },
            {
              q: '忘记密码？',
              a: '于登录页面上点击【忘记密码】，输入您需要找回登录密码的用户绑定的手机或邮箱来进行取回密码。如果您的邮箱未收到邮件或手机未收到简讯，请咨询客服人员',
            },
            {
              q: '如何更改密码？',
              a: '请您登录会员账户后，至【我的/个人中心 → 安全中心 → 密码管理】内，进行密码修改。',
            },
            {
              q: '会员账号注册成功后可以修改吗？',
              a: '1. 若您使用账号注册，非常抱歉账号是不可修改的，每个会员注册成功会员账号后一经确认则无法进行修改的。 </br> 2. 若您使用手机号码注册，由于账号是由系统先帮您产生，您可至【我的/个人中心 → 安全中心】内，进行账号修改。 </br> 请注意账号只能修改一次。',
            },
            {
              q: '注册须知',
              a: '1. 每一位会员只允许注册一个游戏账户，请您填写真实的姓名，提款需绑定和注册姓名一致的银行卡。</br> 2. 同一用户名，邮箱以及电话只能注册一个游戏账户，如果该信息已被使用，将无法再次被用于注册新账户。',
            },
          ],
        },
        {
          title: '优惠问题',
          des: '关于优惠的步骤、常见问题与应注意事项',
          questions: [
            {
              q: '优惠如何申请？',
              a: '自助参加须从首页进入”优惠活动“，点选想申请的优惠并在下方点击“参加优惠”，等到审核通过后可至“我的优惠”页面领取该笔优惠红利。',
            },
            {
              q: '返水何时派发？',
              a: '返水需自助申请，最迟次日中午(北京时间12:00 pm)前系统自动派发,只需一倍流水即可提款（不限游戏平台）。',
            },
            {
              q: '返水派发的比例是多少？',
              a: '依据不同的游戏分类与投注金额，提供不同的返水比例。详情请参阅优惠活动内容唷！',
            },
            {
              q: '救援金何时派发？',
              a: '救援金最迟次日中午(北京时间12:00 pm)前系统自动派发、无需申请，流水达8倍即可提款（不限游戏平台）。',
            },
            {
              q: '救援金派发的比例是多少？',
              a: '依据不同等级的负盈利，提供不同的救援金额。详情请参阅优惠活动内容唷！',
            },
          ],
        },
      ],
    };
  },
  methods: {
    clickHandle(num) {
      this.selectBtnNum = num;
    },
    faqItemClick(item) {
      this.showFaqDetailItem = item;
      this.showFaqDetail = true;
    },
  },
  created() {
    if (this.$route.query.type) {
      this.selectBtnNum = Number(this.$route.query.type);
    }
  },
};
</script>
<style lang="scss" scoped>
.active{
  color: #ffffff;
  border-color: #f76b1c !important;
  background: #f76b1c !important;
  span{
    color: #ffffff;
  }
  img{
    filter:invert(100%);
  }
}
.faqItem{
  cursor: pointer;
  padding: 0 40px;
  font-size: 14px;
  font-weight: 600;
  line-height: 1;
  color: #202020;
  line-height: 60px;
  box-shadow: inset 0 -1px 0 0 #ebeef5;
}
.faqItemDetail{
  padding: 30px;
  font-size: 14px;
  font-weight: 600;
  color: #202020;
  line-height: 50px;
  box-shadow: inset 0 -1px 0 0 #ebeef5;
}
.backBtn{
  border-color: #f76b1c;
  color: #f76b1c;
  &:hover{
    background-color: #f76b1c;
    border-color: #f76b1c;
  }
}
</style>
