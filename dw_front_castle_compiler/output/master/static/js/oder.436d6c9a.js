(window.webpackJsonp=window.webpackJsonp||[]).push([["oder"],{"02c8":function(t,e,a){"use strict";var r=a("0a12");a.n(r).a},"0a12":function(t,e,a){},1063:function(t,e,a){"use strict";var r=a("177a");a.n(r).a},"177a":function(t,e,a){},"4aa0":function(t,e,a){"use strict";var r=a("919b");a.n(r).a},"919b":function(t,e,a){},db7e:function(t,e,a){"use strict";a.r(e),a("8e6e"),a("ac6a"),a("456d");var r=a("bd86"),s=a("2f62");function n(t,e){var a=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),a.push.apply(a,r)}return a}var o={data:function(){return{datePickerRange:[this.$dayjs().subtract(1,"months").format("YYYY-MM-DD HH:mm:ss"),this.$dayjs().format("YYYY-MM-DD HH:mm:ss")],isLargeSize:!1,page:1,per_page:10}},computed:function(t){for(var e=1;e<arguments.length;e++){var a=null!=arguments[e]?arguments[e]:{};e%2?n(Object(a),!0).forEach((function(e){Object(r.a)(t,e,a[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(a)):n(Object(a)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(a,e))}))}return t}({},Object(s.b)("shopping",["pointRecord","pointRecordTotal"])),methods:{getData:function(){var t={sdate:this.datePickerRange[0],edate:this.datePickerRange[1],page:this.page,per_page:this.per_page};this.$store.dispatch("shopping/getPointRecord",t)},changeCurrentOderPage:function(t){this.page=t,this.getData()},expandChange:function(t){this.$matomo_oder_ponit_record_open(t.transType)},resize:function(){760<=window.innerWidth?this.isLargeSize=!0:this.isLargeSize=!1}},beforeDestroy:function(){window.removeEventListener("resize",this.resize)},mounted:function(){this.getData(),window.addEventListener("resize",this.resize),this.resize()}},i=(a("02c8"),a("2877")),c=Object(i.a)(o,(function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"row"},[a("div",{staticClass:"col-12 my-2 mobileDatePicker"},[a("el-date-picker",{staticClass:"DatePicker",attrs:{type:"daterange","range-separator":"至","start-placeholder":"开始日期","value-format":"yyyy-MM-dd HH:mm:ss","default-time":["00:00:00","23:59:59"],"end-placeholder":"结束日期"},on:{change:t.getData},model:{value:t.datePickerRange,callback:function(e){t.datePickerRange=e},expression:"datePickerRange"}})],1),a("div",{staticClass:"col-12"},[a("el-table",{staticStyle:{width:"100%"},attrs:{data:t.pointRecord},on:{"expand-change":t.expandChange}},[a("el-table-column",{attrs:{type:"expand"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("p",[t._v("交易前:  "+t._s(t._f("commaFormatDefault")(e.row.transBefore)))]),a("p",[t._v("交易后:  "+t._s(t._f("commaFormatDefault")(e.row.transAfter)))]),a("p",[t._v("备注:  "+t._s(e.row.note))])]}}])}),a("el-table-column",{attrs:{prop:"date",label:"日期"}}),a("el-table-column",{attrs:{prop:"transType",label:"类型"}}),a("el-table-column",{attrs:{label:"金额"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(t._f("commaFormatDefault")(e.row.transAmount)))])]}}])}),t.isLargeSize?a("el-table-column",{attrs:{label:"交易前"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(t._f("commaFormatDefault")(e.row.transBefore)))])]}}],null,!1,1610830265)}):t._e(),t.isLargeSize?a("el-table-column",{attrs:{prop:"transAfter",label:"交易后"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(t._f("commaFormatDefault")(e.row.transAfter)))])]}}],null,!1,3901529604)}):t._e(),t.isLargeSize?a("el-table-column",{attrs:{prop:"note",label:"备注"}}):t._e()],1)],1),0<t.pointRecordTotal?a("div",{staticClass:"col-12 my-3"},[a("el-pagination",{staticClass:"float-right",attrs:{background:"",layout:"prev, pager, next","pager-count":5,total:t.pointRecordTotal},on:{"current-change":t.changeCurrentOderPage}})],1):t._e()])}),[],!1,null,"428ebff0",null).exports;function l(t,e){var a=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),a.push.apply(a,r)}return a}var d={data:function(){return{datePickerRange:[this.$dayjs().subtract(1,"months").format("YYYY-MM-DD"),this.$dayjs().format("YYYY-MM-DD")],isLargeSize:!1,page:1,per_page:9999,status:1}},computed:function(t){for(var e=1;e<arguments.length;e++){var a=null!=arguments[e]?arguments[e]:{};e%2?l(Object(a),!0).forEach((function(e){Object(r.a)(t,e,a[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(a)):l(Object(a)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(a,e))}))}return t}({},Object(s.b)("shopping",["goodsOrder","goodsOrderTotal"])),methods:{getData:function(){var t={sdate:this.datePickerRange[0],edate:this.datePickerRange[1],page:this.page,per_page:this.per_page,status:this.status};this.$store.dispatch("shopping/getGoodsOrder",t)},changeStatus:function(t){this.status=t,this.getData()},goodDetail:function(t){this.$matomo_oder_record_open(t.transType)},resize:function(){760<=window.innerWidth?this.isLargeSize=!0:this.isLargeSize=!1}},beforeDestroy:function(){window.removeEventListener("resize",this.resize)},mounted:function(){this.getData(),window.addEventListener("resize",this.resize),this.resize()}};function u(t,e){var a=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),a.push.apply(a,r)}return a}a("4aa0");var p={components:{bl_pointRecord:c,bl_goodsOrder:Object(i.a)(d,(function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"row"},[a("div",{staticClass:"col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6"},[a("el-button",{class:{active:1===t.status},attrs:{round:""},on:{click:function(e){return t.changeStatus(1)}}},[t._v("已完成")]),a("el-button",{class:{active:0===t.status},attrs:{round:""},on:{click:function(e){return t.changeStatus(0)}}},[t._v("未完成")])],1),a("div",{staticClass:"col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 my-2 mobileDatePicker"},[a("el-date-picker",{staticClass:"DatePicker",attrs:{type:"daterange","range-separator":"至","start-placeholder":"开始日期","value-format":"yyyy-MM-dd","end-placeholder":"结束日期"},on:{change:t.getData},model:{value:t.datePickerRange,callback:function(e){t.datePickerRange=e},expression:"datePickerRange"}})],1),a("div",{staticClass:"col-12"},[a("el-table",{staticStyle:{width:"100%"},attrs:{data:t.goodsOrder,stripe:""},on:{"expand-change":t.goodDetail}},[a("el-table-column",{attrs:{type:"expand"},scopedSlots:t._u([{key:"default",fn:function(e){return t._l(e.row.goodsDetail.data,(function(r,s){return a("div",{staticClass:"goodGoodsItem"},[a("p",[t._v("商品内容:  "+t._s(t._f("noneHtmlCode")(r.content)))]),a("p",[t._v("数量:  "+t._s(r.quantity))]),a("p",[t._v("点数:  "+t._s(r.totalPoint))]),a("p",[t._v("商品状态:  "+t._s(r.status))]),a("p",[t._v("完成时间:  "+t._s(r.successAt))]),a("p",[t._v("商品备注:  "+t._s(e.row.note))]),a("hr")])}))}}])}),a("el-table-column",{attrs:{prop:"createdAt",label:"订单时间"}}),a("el-table-column",{attrs:{prop:"orderId",label:"订单号"}}),a("el-table-column",{attrs:{label:"订单总额"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(t._f("commaFormatDefault")(e.row.totalPoint)))])]}}])})],1)],1)])}),[],!1,null,"768142ba",null).exports},data:function(){return{oderMenuArray:[{icon:"fas fa-chess-knight",name:"梦基金纪录"},{icon:"fas fa-receipt",name:"兑换纪录"},{icon:"fas fa-exclamation-circle",name:"兑换规则"}],oderTypeArray:["梦基金纪录","兑换纪录","兑换规则"],currentOderType:0,isLargeSize:!1,page:1,per_page:10,CDN_ASSETS:window.CDN_ASSETS}},computed:function(t){for(var e=1;e<arguments.length;e++){var a=null!=arguments[e]?arguments[e]:{};e%2?u(Object(a),!0).forEach((function(e){Object(r.a)(t,e,a[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(a)):u(Object(a)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(a,e))}))}return t}({},Object(s.b)("shopping",["goodsOrder","pointRecord","pointRecordTotal"]),{},Object(s.b)("wallet",["memberWallet"])),methods:{changeCurrentOderPage:function(t){var e={sdate:this.$dayjs().subtract(1,"months").format("YYYY-MM-DD"),edate:this.$dayjs().format("YYYY-MM-DD"),page:t,per_page:vm.per_page};this.$store.dispatch("shopping/getPointRecord",e)},changeCurrentOderType:function(t,e){this.currentOderType=t,this.$matomo_oder_type(e)},resize:function(){760<=window.innerWidth?this.isLargeSize=!0:this.isLargeSize=!1},goodDetail:function(t){this.$matomo_oder_record_open(t.transType)}},beforeDestroy:function(){window.removeEventListener("resize",this.resize)},mounted:function(){this.changeCurrentOderType(0),window.addEventListener("resize",this.resize),this.resize()}},m=(a("1063"),Object(i.a)(p,(function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"container-fluid"},[a("div",{staticClass:"container goodOderWarp"},[a("div",{staticClass:"row no-gutters"},[a("div",{staticClass:"col-12 my-3"},[a("div",{staticClass:"DWBreadcrumb"},[a("router-link",{attrs:{to:"/"}},[t._v("首页")]),a("span",{staticClass:"mx-2"},[t._v("/")]),a("span",[t._v("商品订单")])],1)]),a("div",{staticClass:"col-12 text-center"},t._l(t.oderMenuArray,(function(e,r){return a("div",{staticClass:"menuBtn mr-3",on:{click:function(a){return t.changeCurrentOderType(r,e.name)}}},[a("div",{staticClass:"menuBtnRect",class:{active:t.currentOderType===r}},[a("div",{staticClass:"i fas",class:e.icon})]),a("p",{staticClass:"text-white"},[t._v(t._s(e.name))])])})),0),0===t.currentOderType?a("div",{staticClass:"col-12 my-3"},[a("div",{staticClass:"goodOderBackground"},[a("bl_pointRecord")],1)]):t._e(),1===t.currentOderType?a("div",{staticClass:"col-12 my-3"},[a("div",{staticClass:"goodOderBackground"},[a("bl_goodsOrder")],1)]):t._e(),2===t.currentOderType?a("div",{staticClass:"col-12 my-3"},[a("div",{staticClass:"goodOderBackground"},[a("div",{staticClass:"row goodOderRule"},[a("div",{directives:[{name:"lazy-container",rawName:"v-lazy-container"}],staticClass:"col-6 col-sm-6 col-md-3 col-lg-3 col-xl-3"},[a("p",[a("img",{staticClass:"goodOderRuleImg",attrs:{"data-src":t.CDN_ASSETS+"/static/img/dw/pic-user-transaction-1@3x.png"}})]),t._m(0),t._m(1)]),a("div",{directives:[{name:"lazy-container",rawName:"v-lazy-container"}],staticClass:"col-6 col-sm-6 col-md-3 col-lg-3 col-xl-3"},[a("p",[a("img",{staticClass:"goodOderRuleImg",attrs:{"data-src":t.CDN_ASSETS+"/static/img/dw/pic-user-transaction-2@3x.png"}})]),t._m(2),t._m(3)]),a("div",{directives:[{name:"lazy-container",rawName:"v-lazy-container"}],staticClass:"col-6 col-sm-6 col-md-3 col-lg-3 col-xl-3"},[a("p",[a("img",{staticClass:"goodOderRuleImg",attrs:{"data-src":t.CDN_ASSETS+"/static/img/dw/pic-user-transaction-3@3x.png"}})]),t._m(4),t._m(5)]),a("div",{directives:[{name:"lazy-container",rawName:"v-lazy-container"}],staticClass:"col-6 col-sm-6 col-md-3 col-lg-3 col-xl-3"},[a("p",[a("img",{staticClass:"goodOderRuleImg",attrs:{"data-src":t.CDN_ASSETS+"/static/img/dw/pic-user-transaction-4@3x.png"}})]),t._m(6),t._m(7)]),t._m(8)])])]):t._e()])])])}),[function(){var t=this.$createElement,e=this._self._c||t;return e("p",{staticClass:"text-center"},[e("b",[this._v("STEP1 赚取梦基金")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("p",{staticClass:"text-center"},[e("small",[this._v("通过每日任务/游戏竞猜 赚取梦基金")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("p",{staticClass:"text-center"},[e("b",[this._v("STEP2 兑换礼品")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("p",{staticClass:"text-center"},[e("small",[this._v("丰富礼品随你挑选")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("p",{staticClass:"text-center"},[e("b",[this._v("STEP3 资料确认")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("p",{staticClass:"text-center"},[e("small",[this._v("填写收获信息、联系方式")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("p",{staticClass:"text-center"},[e("b",[this._v("STEP4 坐等收货")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("p",{staticClass:"text-center"},[e("small",[this._v("我们会尽快发货")])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"col-12 my-4"},[a("p",{staticClass:"text-center"},[a("b",[t._v("梦基金兑换规则")])]),a("div",{staticClass:"ruleContent"},[a("small",[t._v("1、梦基金不代表真实人民币，不能直接套现，只能用于兑换『梦之城商城』内的商品以及参与『游戏竞猜』。"),a("br"),t._v("2、梦基金不能转移，也不能与他人梦基金叠加使用。"),a("br"),t._v("3、若您的收货信息不完整或有误，相关的申请与兑换将会取消。"),a("br"),t._v("4、『梦工厂』可能要求您补充相关资料，如您选择拒绝补充相关资料，将影响您参与梦基金兑换商品活动。"),a("br"),t._v("5、玩家成功提交梦基金兑换后，有关兑换将会尽快发货。"),a("br"),t._v("6、『梦工厂』保留不时更改换商品之权利，而毋须另行通知。"),a("br"),t._v("7、所有商品或服务，数量有限，先兑先得，换完即止。"),a("br"),t._v("8、已兑换的商品，不可取消或更改。"),a("br"),t._v("9、『梦工厂』不负商品之任何维护或保固责任。"),a("br"),t._v("10、如有任何争议，『梦工厂』保留最终决定权。")])])])}],!1,null,"569126ae",null));e.default=m.exports}}]);
//# sourceMappingURL=oder.436d6c9a.js.map