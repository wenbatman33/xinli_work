<template lang="pug">
.container-fluid.p-0.faqPage
  .faqHeader
    h2 帮助中心
    el-input.searchFormInput.searchFaq.my-3(placeholder='请输入问题的关键字，如：存款' size="small", v-model='searchForm.keyword',@input='searchFormSubmit')
      i.el-input__icon.el-icon-search(slot='suffix')
    p.my-3 仍需要帮助 ？我们提供 7x24 小时的 在线客服 随时待命
  .faqContent.mb-5(v-if='steps==1')
    .row.no-gutters
      .col-4.p-3(v-for='(item, index) in faqJsonData', @click='setSelectedData(item)')
        .faqCard
          .iconWrap
            .icon
              .bg
                img(:src='imgPath+"/pic-faq-bg.png"'  
                  :srcset='imgPath+"/pic-faq-bg@2x.png 2x, "+imgPath+"/pic-faq-bg@3x.png 3x"')
              .iconImg
                img(:src='imgPath+"/pic-faq-question-"+(index+1)+".png"'  
                  :srcset='imgPath+"/pic-faq-question-"+(index+1)+".png 2x, "+imgPath+"/pic-faq-question-"+(index+1)+".png 3x"')

            //- .icon
            //-   i.fas(:class='item.iconClass')
          .title {{item.title}}
          .des {{item.des}}
  .faqListContent(v-if='steps==2')
    .Breadcrumb
      span.highLight(@click='steps=1') 帮助中心 
      span / {{selectedTitle}}
    .faqListInner
      .row.no-gutters
        .col-12(v-for='(item, index) in selectedData')
          p.title {{item.q}}
          p.dec(v-html='item.a')
          el-divider
      
  .faqListContent(v-if='steps==3')
    .Breadcrumb
      span.highLight(@click='steps=1, searchForm.keyword=""') 帮助中心 
      span / 搜索与"{{searchForm.keyword}}"相关的问题 
    .faqListInner
      .row.no-gutters(v-if='searchData.length>0')
        .col-12(v-for='(item, index) in searchData')
          p.title {{item.q}}
          p.dec(v-html='item.a')
          el-divider
      .row.no-gutters(v-else)
        .col-12.my-5
          h3.text-center 无"{{searchForm.keyword}}"相关的问题 
  bl_Footer
</template>

<script>
import bl_Footer from '@/components/bl_Footer/bl_Footer.vue';

export default {
  components: {
    bl_Footer,
  },
  data() {
    return {
      imgPath: `${window.CDN_ASSETS}/static/img/faq`,
      steps: 1,
      searchForm: {
        keyword: '',
      },
      selectedTitle: '',
      selectedData: [],
      searchData: [],
      faqJsonData: [
        {
          'title': '存款问题？',
          'des': '关于存款的步骤、常见问题与应注意事项',
          'iconClass': 'fa-fist-raised',
          'questions': [
            {
              'q': '该如何进行存款?',
              'a': '存款前请先登录梦工厂账号，若无账号请先进行注册。</br>电脑：</br>1.登陆后，在页面左侧点击【蓝色】钱包资金按钮，开启存款页面。</br>2.开启存款页面后，请先填写存款金额——再选择您要支付的方式——点击提交存款后，按照您所选择的支付方式，完成存款。</br></br>手机：</br>1.点击下方【存提】开启存款页面。</br>2.开启存款页面后，请先填写存款金额——再选择您要支付的方式——点击提交存款后，按照您所选择的支付方式，完成存款。</br></br>梦工厂提供多种存款支付的方式，若您在存款上有任何问题，欢迎联络客服提供宝贵的建议。',
            },
            {
              'q': '如何使用“网银”进行存款?',
              'a': '1.如未开通网上银行，须请您先到当地银行柜台开通网上银行业务，以加速您存款到账时间。  </br>2.在您提交存款后，请您依据页面显示的内容「转账到获取的账号并在附言处填写正确附言代码」，以完成存款。 ',
            },
            {
              'q': '没有网银如何充值？',
              'a': '选择微信支付或支付宝存款，扫一扫即可直接到账。',
            },
            {
              'q': '网银存款附言是什么？一定要填吗？',
              'a': '在您通过转账时，建议您在备注/附言/用途等处填写附言编码，可及时到账。',
            },
            {
              'q': '存款至旧的银行卡账户怎么办？',
              'a': '每次存款前请登录官网获取最新的银行卡账户，存至旧的银行卡账户将导致存款无法到账。',
            },
            {
              'q': '存款一般多久到账？',
              'a': '1. 极速网银快捷、微信、支付宝：完成支付后一般都是即时到账，如果出现延迟到账，请联系在线客服。 </br>2. 银行转账：相关部门会在确认到款项后的5分钟内办理到账。 记得填写正确的附言编码，即可实时到账。',
            },
            {
              'q': '延迟到账怎么办？',
              'a': '款项出现延迟到账的几种情况：</br>1. 银行系统维护或者系统延迟，导致款项延迟。一般出现在银行转账中，玩家可以耐心等待，等待款项到账后，再提交证明即可。 </br>2. 使用微信存款或者其他三方金流支付，由于系统延迟，导致款项延迟超过30分钟。玩家可以联系在线客服咨询详细情况，在线客服会协助您查询存款回单',
            },
          ],
        },
        {
          'title': '提款问题',
          'des': '关于提款的步骤、常见问题与应注意事项',
          'iconClass': 'fa-coins',
          'questions': [
            {
              'q': '该如何进行提款?',
              'a': '提款前请先设定真实姓名、验证手机号码与银行卡资料。真实姓名可在个人资料页中设定，手机号码与银行卡资料可在安全中心绑定。</br>电脑</br>1.真实姓名：在页面左侧点击【头像】进入个人资料页。在个人资料页中输入【真实姓名】并提交。   </br>2.绑定手机：在安全中心页面，选择手机验证。输入您的手机号码，点击【发送验证码】，系统将会发送一组验证码简讯给您。将验证码输入后，点击【提交绑定】。   </br>3.绑定银行卡：在安全中心页面，选择【绑定银行卡】。点击【添加新银行卡】，在页面上输入开户名、选择开户行、开户行省份、城市与分行，以及您的银行卡号，点击【提交绑定】。   </br>4.在页面左侧点击【蓝色】钱包资金按钮，开启存提款页面，并切换至提款，并输入您的提款金额与选择要提款的银行卡，点击【提交提款】。</br></br>手机：</br>1.真实姓名：点击下方【我的】->【个人资料】->【真实姓名】，输入您的真实姓名并提交。   </br>2.手机验证：点击下方【我的】->【安全中心】->【手机验证】，输入您的手机号码，点击【发送验证码】，系统将会发送一组验证码简讯给您。将验证码输入后，点击【提交】完成验证。</br>3.绑定银行卡：点击下方【我的】->【安全中心】->【银行卡管理】，点击【添加新银行卡】，在页面上输入开户名、选择开户行、开户行省份、城市与分行，以及您的银行卡号，点击【提交】。</br>4.点击下方【存提】开启存款页面，切换至提款，并输入您的提款金额与选择要提款的银行卡，点击【提交】。</br></br>若您在提款上有任何问题，欢迎联络客服提供宝贵的建议。',
            },
            {
              'q': '为什么任何一笔存款都需要打一倍流水？',
              'a': '为了防止套利者进行洗钱行为，任何一笔存款都必须一倍流水才能提款。且依据不同的存款回馈活动，流水限制皆有不同。若您在提款流水上有任何问题，欢迎联络客服詢問。',
            },
            {
              'q': '提款单笔限额和每日额度是多少？',
              'a': '提款金额单笔最低100元最高20万，每日额度为50万。',
            },
            {
              'q': '可以用多少张银行卡提款？',
              'a': '可绑定多張与您真实姓名一致的提款卡。【安全中心-->银行卡绑定】中，点击新增进行添加。',
            },
            {
              'q': '一张银行卡允许绑定多次吗？',
              'a': '一张银行卡只允许绑定一个会员账号，不可以多次绑定。',
            },
            {
              'q': '提款注意事项',
              'a': '1.提款银行账户持有人姓名必须与您的真实姓名一致, 否则提款无法通过。</br>2.需达到流水限制：</br>每笔存款需一倍有效流水才可提款 (例: 您存款100, 需要有效投注100后，才可进行提款)</br>若您的存款有搭配优惠活动，则需要按照优惠活动的流水要求计算 (例: 存款100, 有搭配首存回馈20%红利，且提款条件为3倍流水,，则您的流水需达成360，才可提款。[100*20%=20，(100+20)x3=360])',
            },
          ],
        },
        {
          'title': '注册与登录问题',
          'des': '关于注册与登录的步骤、常见问题与应注意事项',
          'iconClass': 'fa-gift',
          'questions': [
            {
              'q': '该如何进行注册？',
              'a': '梦工厂提供两种注册方式： </br>1.使用账号密码注册（预设） </br>电脑</br>（1）点击网站左侧第一颗“注册”按键，开启注册介面。 </br>（2）填写“账号与密码”，并勾选「已年满18岁，并接受相关的条款与隐私权政策。」，点击【立即注册】后，即可完成注册。 </br>手机</br>（1）进入首页后，点击上方注册按钮。 </br>（2）填写“账号与密码”，点击【注册】后，即可完成。 </br></br>2.使用手机快捷注册</br>电脑</br>（1）点击网站左侧第一颗“注册”按键，开启注册介面并切换为【手机快捷注册】。 </br>（2）填写您的手机号码，点击【发送验证码】，系统将会发送一组验证码简讯给您。将验证码输入后，并勾选「已年满18岁，并接受相关的条款与隐私权政策。」，点击【立即注册】，即可注册完成。 </br>（3）手机注册完成后，系统会提供给您一组账号密码，以便日后登入使用，建议您可立即修改账号密码，以免忘记。</br>手机</br>（1）进入首页后，点击上方注册按钮。 </br>（2）切换至“手机注册”，填写您的手机号码，点击【发送验证码】，系统将会发送一组验证码简讯给您。将验证码输入后，点击【注册】，即可注册完成。 </br></br>3. 如果注册信息栏有提示错误，代表该信息不符合要求，请根据提示重新填写。',
            },
            {
              'q': '忘记密码？',
              'a': '于登录页面上点击【忘记密码】，输入您需要找回登录密码的用户绑定的手机或邮箱来进行取回密码。如果您的邮箱未收到邮件或手机未收到简讯，请咨询客服人员',
            },
            {
              'q': '如何更改密码？',
              'a': '请您登录会员账户后，至【我的/个人中心 → 安全中心 → 密码管理】内，进行密码修改。',
            },
            {
              'q': '会员账号注册成功后可以修改吗？',
              'a': '1. 若您使用账号注册，非常抱歉账号是不可修改的，每个会员注册成功会员账号后一经确认则无法进行修改的。 </br> 2. 若您使用手机号码注册，由于账号是由系统先帮您产生，您可至【我的/个人中心 → 安全中心】内，进行账号修改。 </br> 请注意账号只能修改一次。',
            },
            {
              'q': '注册须知',
              'a': '1. 每一位会员只允许注册一个游戏账户，请您填写真实的姓名，提款需绑定和注册姓名一致的银行卡。</br> 2. 同一用户名，邮箱以及电话只能注册一个游戏账户，如果该信息已被使用，将无法再次被用于注册新账户。',
            },
          ],
        },
        {
          'title': '优惠问题',
          'des': '关于优惠的步骤、常见问题与应注意事项',
          'iconClass': 'fa-gift',
          'questions': [
            {
              'q': '优惠如何申请？',
              'a': '自助参加须从首页进入”优惠活动“，点选想申请的优惠并在下方点击“参加优惠”，等到审核通过后可至“我的优惠”页面领取该笔优惠红利。',
            },
            {
              'q': '返水何时派发？',
              'a': '返水需自助申请，最迟次日中午(北京时间12:00 pm)前系统自动派发,只需一倍流水即可提款（不限游戏平台）。',
            },
            {
              'q': '返水派发的比例是多少？',
              'a': '依据不同的游戏分类与投注金额，提供不同的返水比例。详情请参阅优惠活动内容唷！',
            },
            {
              'q': '救援金何时派发？',
              'a': '救援金最迟次日中午(北京时间12:00 pm)前系统自动派发、无需申请，流水达8倍即可提款（不限游戏平台）。',
            },
            {
              'q': '救援金派发的比例是多少？',
              'a': '依据不同等级的负盈利，提供不同的救援金额。详情请参阅优惠活动内容唷！',
            },
          ],
        },
        // {
        //   'title': '体育相关问题',
        //   'des': '体育怎么玩怎么好玩',
        //   'iconClass': 'fa-futbol',
        //   'questions': [
        //     {
        //       'q': '梦工厂体育平台有效流水细则 ',
        //       'a': '1. 梦工厂体育仅对已结算并产生输赢结果的投注额计算有效流水。2. 任何走盘、取消的赛事、对押等(包括串关和单双)赔率低于欧洲盘1.70，香港盘0.70的投注将不计算在有效流水内。请您在投注时，尽量选择符合有效流水的内容进行投注，否则很可能造成您无法提款或者无法领取每日返水。',
        //     },
        //     {
        //       'q': '连串过关如何计算输赢? ',
        //       'a': '在连串过关中输赢计算是用本金连乘每场的赔率再减去本金。如果投注分股盘，赢半乘以（1+赔率）/2，输半直接乘以0.5。平局场赔率以1计算，如果有一场比赛为输，那么整个注单都算作输。',
        //     },
        //     {
        //       'q': '连串过关流水是如何计算的？',
        //       'a': '连串过关中所有赛事的平均赔率若低于欧洲盘1.70，香港盘0.70的投注将不计算在有效流水内。平均赔率计算例如：（赔率1.8+赔率1.1+赔率1.6）/3=1.5，即该串关注单为无效流水；（赔率1.65+赔率1.7+赔率1.9）/3=1.75即该串关注单为有效流水。',
        //     },
        //     {
        //       'q': '赛事延期如何计算?',
        //       'a': '如果比赛或赛事取消，中断或延迟并且没有在官方指定开球时间的36小时内重新开始，所有该场赛事的投注即被视为无效且取消，除非在个别体育规则里另有指定注明。某些无条件终止的盘口将会相应地结算。单独的体育规则中对此类盘口的结算程序做了说明。 公司取消该赛事所有注单的结果被视为最终决定，无需参考官方赛事裁判或相关部门的决定。连串投注将会继续按照注单剩余赛事的赛果结算，该取消赛事的赔率将会按照1计算。',
        //     },
        //   ],
        // },
        // {
        //   'title': '真人娱乐问题',
        //   'des': '我就爱看Live',
        //   'iconClass': 'fa-dice',
        //   'questions': [
        //     {
        //       'q': '什么是百家乐？',
        //       'a': '百家乐是一种简单的纸牌游戏，庄闲各发两手牌。玩家可押注于【庄】或【闲】，点数接近9点的一方即获胜，也可押注【和】局（即庄家和闲家的牌总点数相同）',
        //     },
        //     {
        //       'q': '什么是免佣百家乐？',
        //       'a': '免佣百家乐是由传统百家乐演变而来，两者的玩法非常相似，不同的是免佣百家乐增加了一项【超级6】的特别投注，庄家的赔率也有别于传统百家乐。例如：庄家除6点以外赢，赔率为1赔1，庄家6点赢，赔率为1赔0.5。',
        //     },
        //     {
        //       'q': '真人平台最高投注金额为多少？',
        //       'a': '所有拒绝投注、无效投注、打平、任何出现对压情况的投注（例：于百家乐同时下注庄家及闲家）及任何轮盘之投注将不会计算在累积投注要求内。若所得之红利奖金由投注于上述游戏所得，我们保留不给与客户提取高于所存款项的数额之权利。',
        //     },
        //     {
        //       'q': '结算后可以进行查看当时下注牌面吗？',
        //       'a': '打开全站并登录账号后进入我的/个人中心→我的投注，选择【真人】--选择厂商后，即可查看到投注的赛事当时的下注牌面。',
        //     },
        //   ],
        // },
        // {
        //   'title': '彩票相关问题',
        //   'des': '头奖是我的！！',
        //   'iconClass': 'fa-bowling-ball',
        //   'questions': [
        //     {
        //       'q': '彩票的赔率是多少？',
        //       'a': '赔率将不时浮动，暂没有固定的赔率，派彩时的赔率将以确认投注时之赔率为准。',
        //     },
        //     {
        //       'q': '彩票最高投注金额是多少？',
        //       'a': '彩票最高投注是1万， 单期的是2万。',
        //     },
        //     {
        //       'q': 'VR彩票最高派彩金额是多少吗？',
        //       'a': '单期最高利润，200000，（单期利润为同一频道同一期号所有注单的总利润）单挑最高利润：20000,(单期单挑利润为同一频道同一期号所有单挑注单的总利润)。',
        //     },
        //     {
        //       'q': 'VR彩票什么时候进行关盘时间？',
        //       'a': 'VR所有游戏项目都是全年无休 每日营业时间总共为21H 营运时间从早上9:00(am)至隔天早上6:00(am)。',
        //     },
        //   ],
        // },
        // {
        //   'title': '电子竞技问题',
        //   'des': '电玩选手就是潮！',
        //   'iconClass': 'fa-fist-raised',
        //   'questions': [
        //     {
        //       'q': '电子竞技一般规则',
        //       'a': '1. 如果比赛没有完成（例如：队员退赛、取消资格或游戏服务器的问题）所有该赛事的投注将被视为无效。2. 如赛事在原定比赛前提前开始，在赛事开始后的所有注单视为无效，滚球投注除外。3. 如果一个队员/队伍在比赛开始前给出至少一个地图的轻易获胜，所有投注在该赛事的注单将被视为无效，除非这个优势在该投注市场已经很明显。4. 如地图/回合的数量和该投注市场所显示的不一致，所有投注将被视为无效。5. 如一个队伍使用一个已知的昵称来比赛或者和至少一个官方玩家游戏，所有的投注视为有效。6. 如一个队伍或者两个队伍有较少队员进行比赛，所有的投注视为有效。7. 一旦比赛开始或者已经杀死，所有投注在个别地图的注单视为有效，将根据官方宣布的赢家计算，包含比赛中队员退赛、取消资格和游戏服务器的问题（延迟/ DDOS）。8. 如果比赛为轻易获胜的判决结果，所有的投注将被视为无效，除非投注在单一已经完成的地图。9. 所有的投注将按照官方正式公布的相关赛果进行结算。如果一场比赛一直在进行（例如：游戏出现BUG或者游戏服务器问题），游戏将立即被通知重置，官方结果适用。',
        //     },
        //     {
        //       'q': '电子竞技投注类型-【独赢】',
        //       'a': '预测谁将会赢得这场比赛，任何形式的加时或补时将予以计算在内。',
        //     },
        //     {
        //       'q': '电子竞技投注类型-【让分】',
        //       'a': '1. 预测计算让分结果胜者。任何形式的加时或补时将予以计算在内。2. 电子竞技赛中的让分投注，将授权某队或队员，在地图或回合中处于劣势的一方前面会显示+号，例如：队员A -1.5 1.88  队员B +1.5 1.88如果队员A取得净胜两个或以上地图的胜利，则队员A为胜出选项，队员B为输的选项。如果队员A取得净胜1个地图或队员B赢了，则队员B为胜出选项，队员A为输的选项。3. 在电子竞技赛事中，让分可被视为让回合/地图或其他计算方式，具体取决于相关赛事。让分盘口类型仅会显示让分。 （例如，在反恐精英让分是受让回合，而在魔兽中是让地图数。4. 在单一的反恐精英地图中，如果一场比赛已经开始但未完成（一些回合结束以后队员退赛或取消资格），投注在独赢盘口的注单根据官方宣布的赢家结算，然而投注在回合让分盘的注单将视为无效。',
        //     },
        //     {
        //       'q': '电子竞技投注类型-【让分】',
        //       'a': '预测在比赛中的总地图数/回合数是否大于或小于盘口数，任何形式的额外时间或加时赛均计算在内。',
        //     },
        //   ],
        // },
        {
          'title': '其它问题',
          'des': '若您有任何问题欢迎来找我们',
          'iconClass': 'fa-question-circle',
          'questions': [
            {
              'q': '游戏出错或有纠纷的情况下我该怎么办? ',
              'a': '请您通过在线客服或者发送邮件到梦工厂客服邮箱 , 联系我们的客服人员，并提供以下信息：</br>1. 问题类型</br>2. 您的梦工厂账号。</br>3. 详细说明：包括游戏名称、投注编号、金额、时间。',
            },
          ],
        },
      ],
    };
  },
  computed: {
  },
  methods: {
    setSelectedData(item) {
      this.steps = 2;
      this.selectedTitle = item.title;
      this.selectedData = item.questions;
    },
    searchFormSubmit() {
      // const result = this.faqJsonData.filter((item) => {
      //   console.log(item.questions)
      //   item.questions === this.searchForm.keyword
      // });
      console.log('searchFormSubmit');
      const vm = this;
      this.searchData = [];
      const result = this.faqJsonData.forEach((item, index, array) => {
        const subResult = item.questions.filter(qus => qus.q.indexOf(vm.searchForm.keyword) >= 0 || qus.a.indexOf(vm.searchForm.keyword) >= 0);
        if (subResult.length > 0) {
          vm.searchData.push(subResult[0]);
        }
        return subResult;
      });
      if (vm.searchForm.keyword === '') {
        this.steps = 1;
      } else {
        this.steps = 3;
      }
      
      // console.log(this.searchForm.keyword)
      // console.log(result)
      // let resultTxt;
      // if (result.length > 0) {
      //   resultTxt = result[0].CompanyName;
      // } else {
      //   resultTxt = '';
      // }
      // return resultTxt;
    },
    searchKeyUp() {
      console.log('searchKeyUp');
    },
  },
  mounted() {
  },
};
</script>
<style lang="scss" scoped>
.faqPage{
  position: relative;
  margin: 0;
  overflow: auto; 
  min-height: 600px;
  .faqPageBackground{
    position: absolute;
    width: 100%;
    height: 360px;
    min-height: 360px;
    top: 0px;
    background: linear-gradient(to bottom, $DW_Color, $DW_ColorDark);
    background-size: cover;
    background-repeat: no-repeat;
    z-index: -1;
    overflow: hidden;
    img{
      width: 100%;
    }
  }
}
.faqHeader{
  position: relative;
  text-align: center;
  z-index: 2;
  height: 180px;
  color: white;
  text-align: center;
  margin-top: 120px;
}
.faqContent{
  padding: 0 40px;
  .faqCard{
    position: relative;
    height: 160px;
    border-radius: 8px;
    box-shadow: 0 2px 8px 0 $balckAlpha_20;
    background-color: white;
    text-align: center;
    cursor: pointer;
    .iconWrap{
      position: relative;
      width: 100%;
      height: 60px;
      margin: auto auto;
      text-align: center;
      .icon{
        position: relative;
        display: inline-block;
        width: 68px;
        height: 68px;
        text-align: center;
        border-radius: 100%;
        color: white;
        font-size: 32px;
        margin-top: -20px;
        // line-height: 80px;
        // background-image: linear-gradient(45deg, $DW_Color, $DW_ColorDark);
        .bg{
          position: absolute;
          top: 0;
          width: 68px;
          height: 68px;
        }
        .iconImg{
          position: absolute;
          top: 0;
          width: 68px;
          height: 68px;
          img{
            width: 100%;
            height: 100%;
          }
        }
      }
    }
    .title{
      font-size: 20px;
      line-height: 2;
      color: $DW_ColorDark;
    }
    .des{
      font-size: 14px;
      line-height: 2;
      color: $garyBlue_Dark;
    }
  }
}
.faqListContent{
  margin-top: 60px;
}
/deep/.searchFormInput{
  input{
    height: 40px;
    width: 100%!important;
  }
}
/deep/.searchFaq{
  width: 648px;
  margin: auto auto;
  input.el-input__inner{
    width: 100%!important;
  }
}
.faqListInner{
  width: 100%;
  padding: 20px 60px;
  background-color: $garyBlue_lightest;
  .title{
    font-size: 16px;
    color: $DW_Color;
  }
  .dec{
    font-size: 14px;
    line-height:2;
    color:black;
  }
}
.Breadcrumb{
  width: 100%;
  height: 64px;
  left: 64px;
  line-height: 64px;
  padding: 0 60px;
  background-color: $garyBlue_lightest;
  color: $garyBlue_Dark;
}
.highLight{
  cursor: pointer;
  font-size: 16px;
  line-height: 1;
  color: $DW_Color;
}
</style>
<style lang="scss">
.MAIN_LIGHT{
  .faqPage{
    .faqHeader{
      h2{
        color: black;
      }
      p{
        color: $garyBlue_Dark;
      }
    }
    .faqCard{
      .iconWrap{
        .icon{
          background-image: linear-gradient(45deg, $L_DW_Color, $L_DW_ColorDark);
        }
      }
    }
  }
}
</style>
