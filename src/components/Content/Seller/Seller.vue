<template>
  <div class="seller" ref="seller">
    <div class="seller-content">
      <div class="overview">
        <h1 class="title">{{seller.name}}</h1>
        <div class="desc">
          <vstar :size="36" :score="seller.score"></vstar>
          <span class="text">{{seller.ratingCount}}</span>
          <span class="text">月售{{seller.sellCount}}单</span>
        </div>
        <ul class="remark">
          <li class="block">
            <h2>起送价</h2>
            <div class="content">
              <span class="stress">{{seller.minPrice}}</span>元
            </div>
          </li>
          <li class="block">
            <h2>商家配送</h2>
            <div class="content">
              <span class="stress">{{seller.deliveryPrice}}</span>元
            </div>
          </li>
          <li class="block">
            <h2>平均配送时间</h2>
            <div class="content">
              <span class="stress">{{seller.deliveryTime}}</span>分钟
            </div>
          </li>
        </ul>
        <div class="favorite" @click="toggleFavorite">
          <span class="icon-favorite" :class="{'active':favorite}"></span>
          <div class="text">{{favoriteText}}</div>
        </div>
      </div>
      <vsplit></vsplit>
      <div class="bulletin">
        <h1 class="title">公告与活动</h1>
        <div class="content-wrapper border-1px">
          <p class="content">{{seller.bulletin}}</p>
        </div>
        <ul v-if="seller.supports" class="supports">
          <li class="support-item border-1px" v-for="(item,index) in seller.supports" :key="index">
            <span class="icon" :class="classMap[seller.supports[index].type]"></span>
            <span class="text">{{item.description}}</span>
          </li>
        </ul>
      </div>
      <vsplit></vsplit>
      <div class="pics">
        <h1 class="title">商家实景</h1>
        <div class="pic-wrapper" ref="picWrapper">
          <ul class="pic-list" ref="picList">
            <li class="pic-item" v-for="(pic,index) in seller.pics" :key="index">
              <img :src="pic" width="120" height="90">
            </li>
          </ul>
        </div>
      </div>
      <vsplit></vsplit>
      <div class="info">
        <h1 class="title">商家信息</h1>
        <ul>
          <li class="info-item" v-for="(info,index) in seller.infos" :key="index">{{info}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import BSscroll from 'better-scroll';
  import {saveToLocal,loadFromLocal} from '../../../Common/js/store'
  import vstar from '../../Star/Star';
  import vsplit from '../../Split/Split';
  import vratingselect from '../../RatingSelect/RatingSelect';

  let rem = document.documentElement.clientWidth * 100 / 750;
  export default {
    name: 'Seller',
    components: {
      vstar,
      vsplit
    },
    data(){
      return{
        favorite:(()=>{
          return loadFromLocal(this.seller.id,'favorite',false);
        })()
      }
    },
    props: {
      seller: {
        type: Object,
      }
    },
    computed:{
     favoriteText(){
       return this.favorite?'已收藏':'收藏';
     }
    },
    watch: {
      'seller' (nv) {
        console.log('jjj');
        this.$nextTick(() => {
          this._initScroll();
        });
      }
    },
    created() {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
      //   this.$nextTick(() => {
      // 	  console.log(this);
      // 	  console.log(this.$refs.seller)
      // 	 this._initScroll();
      //   })
    },
    mounted() {
      this.$nextTick(() => {
        this._initScroll();
        this._initPic();
      })
    },
    methods: {
      _initScroll() {
        if (!this.scroll) {
          this.scroll = new BSscroll(this.$refs.seller, {
            click: true
          })
        } else {
          this.scroll.refresh();
        }
      },
      _initPic() {
        if (this.seller.pics) {
          let picWidth = 2.40 * rem;
          let margin = 0.06 * rem;
          let width = (picWidth + margin) * this.seller.pics.length - margin;
          this.$refs.picList.style.width = width + 'px';
          this.$nextTick(() => {
            if (!this.picScroll) {
              this.picScroll = new BSscroll(this.$refs.picWrapper, {
                scrollX: true,
                eventPassthrough: 'vertical'
              })
            } else {
              this.picScroll.refresh();
            }
          })
        }
      },
      toggleFavorite(eve){
        if (!eve._constructed) {
          return;
        }
        this.favorite = !this.favorite;
        saveToLocal(this.seller.id,'favorite',this.favorite);
        
      }
    }
  }

</script>

<style lang="scss">
  @import '../../../Common/style/_commonscss.scss';
  $primarycolor:rgb(7, 17, 27);
  $linecolor:rgba(7, 17, 27, .1);
  .seller {
    height: 100%;
    width: 100%;
    position: relative;
    .overview {
      padding: .36rem;
      .title {
        font-size: .28rem;
        color: $primarycolor;
        line-height: .28rem;
      }
      .desc {
        padding: .16rem 0 .36rem 0;
        font-size: 0;
        @include border-1px($linecolor);
        >* {
          display: inline-block;
        }
        .star {
          padding-right: .16rem
        }
        .text {
          font-size: .2rem;
          color: rgb(77, 85, 93);
          line-height: .36rem;
          padding-right: .24rem;
          vertical-align: top;
        }
      }
      .remark {
        padding: .36rem 0 0 0;
        font-size: 0;
        .block {
          text-align: center;
          display: inline-block;
          width: 33.333%;
          h2 {
            font-size: .20rem;
            color: rgb(147, 153, 159);
            line-height: .2rem;
            padding-bottom: .08rem;
          }
          .content {
            font-weight: normal;
            color: $primarycolor;
            line-height: .48rem;
            font-size: .2rem;
            .stress {
              font-size: .48rem;
            }
          }
        }
        .block+.block {
          border-left: solid 1px $linecolor;
        }
      }
      .favorite{
        text-align: center;
        width:3em;
        position: absolute;
        top:.36rem;
        right:.36rem;
        font-size: .2rem;
       .icon-favorite {
         display:inline-block;
         font-size: .48rem;
         line-height: .48rem;
         vertical-align: top;
         &.active{
           color:rgb(240,20,20);
         }
       }
       .text{
         color:rgb(77,85,93);
         line-height: .20rem;
       }
      }
    }
    .bulletin {
      padding: .36rem;
      padding-bottom: 0;
      .title {
        font-size: .28rem;
        color: $primarycolor;
        line-height: .28rem;
      }
      .content-wrapper {
        padding: .16rem 0 .32rem 0;
        font-size: .24rem;
        font-weight: normal;
        color: rgb(240, 20, 20);
        line-height: .48rem;
      }
      .supports {
        .support-item {
          padding: .32rem .24rem;
          @include border-1px($linecolor, $option: top);
          font-size: 0;
        }
        .icon {
          display: inline-block;
          width: .32rem;
          height: .32rem;
          vertical-align: top;
          background-size: 100% 100%;
          background-repeat: no-repeat;
          &.decrease {
            @include bg-image('decrease_4')
          }
          &.discount {
            @include bg-image('discount_4')
          }
          &.guarantee {
            @include bg-image('guarantee_4')
          }
          &.invoice {
            @include bg-image('invoice_4')
          }
          &.special {
            @include bg-image('special_4')
          }
        }
        .text {
          display: inline-block;
          font-size: .24rem;
          font-weight: normal;
          color: rgb(7, 17, 27);
          line-height: .32rem;
          padding-left: .12rem;
        }
      }
    }
    .pics {
      padding: .36rem;
      padding-right: 0;

      .title {
        font-size: .28rem;
        color: $primarycolor;
        line-height: .28rem;
        padding-bottom: .24rem;
      }
      .pic-wrapper {
        width: 100%;
        white-space: nowrap;
        overflow: hidden;
        .pic-list {
          font-size: 0;
          .pic-item {
            display: inline-block;
            margin-right: .12rem;
            &:last-child {
              margin-right: 0;
            }
            img {
              width: 2.4rem;
              height: 1.8rem;
            }
          }
        }
      }
    }
    .info {
      padding: .36rem;
      padding-bottom: 0;
      .title {
        font-size: .28rem;
        color: $primarycolor;
        line-height: .28rem;
        padding-bottom: .24rem;
        @include border-1px($linecolor);
      }
      .info-item {
        padding: .32rem .24rem;
        font-size: .24rem;
        color: rgb(7, 17, 27);
        line-height: .32rem;
        @include border-1px($linecolor);
        &:last-child {
          @include border-1px(transparent);
        }
      }
    }
  }

</style>
