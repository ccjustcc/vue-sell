<template>
  <div class="header">
    <div class="content-wrapper clearfix">
      <div class="avatar">
        <img :src="seller.avatar" alt="" />
      </div>
      <div class="content ">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="description">
          {{seller.description}}/{{seller.deliveryTime}}分钟送达
        </div>
        <div class="support" v-if='seller.supports'  @click='showDetail'>
          <span class="icon" :class="classMap[seller.supports[0].type]"></span>
          <span class='text'>{{seller.supports[0].description}}</span>
          <div v-if='seller.supports.length' class="support-count">
            <span class="count">{{seller.supports.length}}个</span>
            <i class="icon-keyboard_arrow_right"></i>
          </div>
        </div>
      </div>
    </div>
    <!--<test></test>-->
    <div class="bulletin-wrapper" @click='showDetail'>
      <span class='bulletin-title'></span>
      <div class="bulletin-content"><span class="bulletin-text">{{seller.bulletin}}</span></div>
      <span class="icon-keyboard_arrow_right"></span>
    </div>
    <div class="background">
      <img :src="seller.avatar" alt="" />
    </div>
    <transition name="detail-fade">
        <div v-show="detail" class="detail clearfix">
        <!--sticky footer-->
        <div class="detail-wrapper">
            <div class="main">
                <h1 class="name">{{seller.name}}</h1>
                <div class="star-wrapper">
                    <vstar :size="48" :score="seller.score"></vstar>
                </div>
                <div class="area">
                    <div class="discount-wrapper">
                    <div class="line"></div>
                    <div class="title">优惠信息</div>
                    <div class="line"></div>
                    <ul v-if="seller.supports">
                        <li class="support-item" v-for="(item,index) in seller.supports" :key="index">
                                <span class="icon" :class="classMap[seller.supports[index].type]"></span>
                                <span class="text" >{{seller.supports[index].description}}</span> 
                        </li>
                    </ul>
                    </div>
                </div>
                <div class="area">
                    <div class="discount-wrapper">
                    <div class="line"></div>
                    <div class="title">商家公告</div>
                    <div class="line"></div>
                    <ul v-if="seller.supports">
                        <p class="announcement">{{seller.bulletin}}</p>
                    </ul>
                    </div>
                </div>
            </div>
        </div>
        <div class="detail-close" @click='detail=false'>
            <i class="icon-close"></i>
        </div>
        </div>
    </transition>
  </div>
</template>
<script>
    import vstar from '../Star/Star.vue';
    export default {
        name: 'Header',
        data() {
            return {
                msg: 'Welcome to Your Vue.js App',
                detail: false
            }
        },
        props: { //要限制出入类型就这样写
            seller: {
                type: Object
            }
        },
        methods: {
            showDetail() {
                this.detail = true;
                console.log('dd')
            },
        },
        created() {
            this.classMap = ['decrease', 'discount', 'special','invoice','guarantee'];
            this.$nextTick(()=>{
            })
        },
        components:{
            vstar
        },
        beforeMount(){
            // console.log(this.seller.supports)
            //  console.log('headerBF')
        },
        mounted(){
            //  console.log('headerM')
            //  var avatar = this.$el.getElementsByClassName('description')[0].textContent;
            //  console.log(avatar)
        }
        //		components:{
        //			test
        //		},
        //		created() {
        //			console.log('header+'+new Date().getTime());
        //		},
        //		beforeMount(){
        //		mounted(){
        //			console.log(this.seller.name)
        //			console.log('child+'+new Date().getTime());
        //		}

    }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='scss' type='text/css'>
    @import "../../Common/style/_commonscss.scss";

        /* 可以设置不同的进入和离开动画 */
        /* 设置持续时间和动画函数 */
       
        .detail-fade-leave-active {
           transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
        }
         .detail-fade-enter-active {
           transition: all .3s ease;
        }
        // .detail-fade-enter-to{
        //   transform: translateY(-100%);
        //   opacity: 0;
        //   //过渡的最后状态，之后变为元素的原始状态，不设置就是元素的原始状态
        // }
        .detail-fade-enter{
          transform: translateY(-100%);
          opacity: 0;
        }
        .detail-fade-leave-to
        /* .slide-fade-leave-active for below version 2.1.8 */ {
          transform: translateY(-100%);
          opacity: 0;
        }

    //头部组件
    .header {
        color: #FFFFFF;
        background: rgba(7, 17, 27, 0.5);
        overflow: hidden;
        position: relative;
        /*background: #ccc;*/
         .decrease {
            @include bg-image('decrease_1')
         }
         .discount {
             @include bg-image('discount_1')
         }
         .guarantee {
            @include bg-image('guarantee_1')
         }
         .invoice {
            @include bg-image('invoice_1')
         }
         .special {
            @include bg-image('special_1')
         }
        //内容
        .content-wrapper {
            padding: .48rem .24rem .36rem .48rem;
            .content {
                box-sizing: border-box;
                float: left;
                width: 5.5rem;
                padding-left: .32rem;
                font-size: .24rem;
                position: relative;
                .title {
                    padding-top: .04rem;
                    padding-bottom: .16rem;
                    font-size: .32rem;
                    .name {
                        font-weight: bold;
                    }
                    .brand {
                        float: left;
                        height: .36rem;
                        width: .60rem;
                        margin: {
                            top: -.04rem;
                            right: .12rem
                        }
                        @include bg-image('brand') background-size:100% 100%;
                    }
                }
                .description {
                    padding-bottom: .2rem;
                    font-weight: 400;
                }
                .support {
                    font-size: 10px;
                    .icon {
                        display: inline-block;
                        width: .26rem;
                        height: .26rem;
                        background: #fff;
                        /*margin-top:-0.10rem*/
                        background-size: 100% 100%;
                        background-repeat: no-repeat;
                        vertical-align: middle;
                        &.decrease {
                            @include bg-image('decrease_1')
                        }
                        &.discount {
                            @include bg-image('discount_1')
                        }
                        &.guarantee {
                            @include bg-image('guarantee_1')
                        }
                        &.invoice {
                            @include bg-image('invoice_1')
                        }
                        &.special {
                            @include bg-image('special_1')
                        }
                    }
                    .text {
                        font-weight: 400;
                        font-size: .20rem;
                        line-height: .24rem;
                        font-size: .2rem;
                        line-height: .24rem;//手机汉字最低font-weight:400,200和400开起来几乎没有区别，但是数字却有区别，结果就是数字很细
                    }
                    .support-count {
                        position: absolute;
                        right: 0;
                        bottom: -.04rem;
                        font-size: .20rem;
                        /*font-size: 9px;*/
                        color: #FFFFFF;
                        font-weight: 400;
                        line-height: .24rem;
                        /*line-height: 24px;*/
                        padding: .14rem .16rem;
                        background: rgba(0, 0, 0, 0.2);
                        border-radius: .16rem;
                        .count {
                            font-size: .20rem;
                            color: #FFFFFF;
                            font-weight: 400;
                            margin-right: .04rem;
                        }
                        .icon-keyboard_arrow_right {
                            vertical-align: middle;
                        }
                    }
                }
            }
            .avatar {
                float: left;
                img {
                    width: 1.28rem;
                    height: 1.28rem;
                    border-radius: .04rem;
                }
            }
        }
        //公告
        .bulletin-wrapper {
            height: .56rem;
            padding-right: .52rem;
            padding-left: .76rem;
            background: rgba(7, 17, 27, 0.2);
            position: relative;
            .bulletin-title {
                width: .44rem;
                height: .28rem;
                @include bg-image('bulletin');
                background-size: 100% 100%;
                border-radius: .04rem;
                font-size: .20rem;
                position: absolute;
                left: .24rem;
                top: 50%;
                transform: translateY(-50%);
            }
            .bulletin-content {
                position: relative;
                width: 100%;
                height: 100%;
                .bulletin-text {
                    @include ab-middle();
                    line-height: 1.2;
                    width: 100%;
                    font-size: .20rem;
                    color: rgb(255, 255, 255);
                    font-weight: 200;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                }
            }
            .icon-keyboard_arrow_right {
                vertical-align: middle;
                font-size: .20rem;
                color: #FFFFFF;
                font-weight: 200;
                position: absolute;
                right: .24rem;
                top: 50%;
                transform: translateY(-50%);
            }
        }
        //背景图片
        .background {
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            z-index: -1;
            filter: blur(10px);
            img {
                width: 100%;
                height: 100%;
            }
        }
        //详情弹窗
        .detail {
            position: fixed;
            z-index: 100;
            width: 100%;
            height: 100%;
            overflow: auto;
            background: rgba(7, 17, 27, 0.8);
            top: 0;
            left: 0;
            //只在ios支持
            -webkit-backdrop-filter: blur(10px);
            .detail-wrapper {
                min-height: 100%;
                .main {
                    padding: 1.28rem .72rem;
                    .name {
                        line-height: .32rem;
                        font-weight: 700;
                        font-size: .32rem;
                        color: rgb(255, 255, 255);
                        line-height: .32rem;
                        text-align: center;
                    }
                    .star-wrapper{
                        margin: 0 auto;
                        position: relative;
                        text-align: center;
                        //属性嵌套
                        padding:{
                            top:.32rem;
                            bottom:.56rem
                        }
                        .star{
                            display: inline-block;
                        }
                    }
                    .area{
                        position: relative;
                        padding-top:.48rem;
                        padding-bottom: .56rem;
                        padding-left:.24rem;
                        padding-right:.24rem;
                        .title{
                            line-height: .28rem;
                            font-weight: 700;
                            font-size: .28rem;
                            color: rgb(255, 255, 255);
                            line-height: .32rem;
                            position: absolute;
                            width:auto;
                            height: auto;
                            top: 0;
                            left:50%;
                            padding:0 .24rem;
                            transform: translate(-50%,-50%);
                        }
                        .line{
                            width:2.24rem;
                            height:1px;
                            @media only screen and (-webkit-min-device-pixel-ratio: 2){
                                height:1px;
                                transform: scaleY(0.5)
                            }
                            background: rgba(255 ,255 ,255 ,0.2 ) ;
                            position: absolute;
                            top: 0;
                            &:nth-of-type(1){
                                left : 0;
                            }
                            //这个要去好好理解
                            &:nth-of-type(3){
                                right:0;
                            }
                        }
                    }
                    .support-item{
                        font-size: 0;
                       .icon{
                           width:.32rem;
                           height:.32rem;
                           margin-right:.12rem;
                           display: inline-block;
                           //需要vertical-align:top 文字直接line-height才能和图片对齐
                           vertical-align: top;
                           
                       }
                       .text{
                           font-size: .24rem;
                           display: inline-block;
                           font-weight: 200;
                           color:rgba(255, 255, 255, 1);
                           line-height:.32rem;
                           display: inline-block;
                       }
                       
                    }
                    .support-item+.support-item{
                        margin-top: .24rem;
                    }
                    .announcement{
                        font-size: .24rem;
                        font-weight: 200;
                        line-height: .48rem;

                    }
                }
            }
            .detail-close {
                position: relative;
                font-size: .64rem;
                color: rgba(255, 255, 255, 0.5);
                width: .64rem;
                height: .64rem;
                margin: -1.28rem auto 0 auto;
                clear: both;
            }
        }
    }
</style>