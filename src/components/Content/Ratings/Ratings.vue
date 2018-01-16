<template>
  <div class="ratings" ref="ratings">
    <div class="ratings-content">
      <div class="overview">
        <div class="overview-left">
          <h1 class="score">{{seller.score}}</h1>
          <div class="title">综合评分</div>
          <div class="rank">高于周边商家{{seller.rankRate}}%</div>
        </div>
        <div class="overview-right">
          <div class="score-wrapper">
            <span class="title">服务态度</span>
            <vstar :size="36" :score="seller.serviceScore"></vstar>
            <span class="score"> {{seller.serviceScore}}</span>
          </div>
          <div class="score-wrapper">
            <span class="title">商品评分</span>
            <vstar :size="36" :score="seller.foodScore"></vstar>
            <span class="score"> {{seller.foodScore}}</span>
          </div>
          <div class="delivery-wrapper">
            <span class="title">送达时间</span>
            <span class="delivery">{{seller.deliveryTime}}分钟</span>
          </div>
        </div>
      </div>
      <vsplit></vsplit>
      <div class="rating-wrapper">
        <vratingselect 
        :ratings="ratings" 
        :onlyContent="onlyContent"
         :selectType="selectType"
         @toggleContent="toggleContent"
         @select="select"></vratingselect>
        <div class="rating-content" ref="ratingsContent">
          <ul>
            <li v-for="(rating,index) in ratings" :key="index" class="rating-item" v-show="needShow(rating.rateType,rating.text)">
              <div class="avatar">
                <img :src="rating.avatar">
              </div>
              <div class="content">
                <h1 class="name">{{rating.username}}</h1>
                <div class="star-wrapper">
                  <vstar :size="24" :score="rating.score"></vstar>
                  <span class="delivery" v-show="rating.deliveryTime">{{rating.deliveryTime}}</span>
                </div>
                <p class="text">{{rating.text}}</p>
                <div class="recommend" v-show="rating.recommend && rating.recommend.length">
                  <span class="icon-thumb_up"></span>
                  <span class="item" v-for="(item,index) in rating.recommend" :key="index">{{item}}</span>
                </div>
                <div class="time">
                  {{rating.rateTime | formateDate}}
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import BSscroll from 'better-scroll';

  import {
    formateDate
  } from '../../../Common/js/date'

  import vstar from '../../Star/Star';
  import vsplit from '../../Split/Split';
  import vratingselect from '../../RatingSelect/RatingSelect';

  const POSITIVE = 0;
  const NEGATIVE = 1;
  const ALL = 2;
  const ERR_OK = 0;

  export default {
    name: 'Ratings',
    props: {
      seller: {
        type: Object,
      }
    },
    components: {
      vstar,
      vsplit,
      vratingselect
    },
    data() {
      return {
        selectType: ALL,
        onlyContent: true,
        ratings: [],
        desc: {
          all: "全部",
          positive: "推荐",
          negative: "吐槽"
        }
      }
    },
    methods: {
      select(type){
        this.selectType = type;
        this.$nextTick(()=>{
          this.scroll.refresh();
        })
      },
      toggleContent(){
        this.onlyContent = !this.onlyContent;
           this.$nextTick(()=>{
          this.scroll.refresh();
        })
      },
      needShow(type,text){
        if(this.onlyContent && !text){
          return false;
        }
        if(this.selectType === ALL){
          return true;
        }else{
          return type === this.selectType;
        }
        
      }
    },
    filters: {
      formateDate(item) {
        let date = new Date(item);
        return formateDate(date, "yyyy-MM-dd hh:mm")
      }
    },
    created() {
      this.$http.get('/api/ratings').then((res) => {
        res = res.body;
        if (res.code === ERR_OK) {
          this.ratings = res.data;
          this.$nextTick(() => {
            this.scroll = new BSscroll(this.$refs.ratings, {
              click: true
            })
          })
        }
      })
    }
  }

</script>

<style lang="scss">
   @import  '../../../Common/style/_commonscss.scss';
  .ratings {
    height: 100%;
    width: 100%;
    overflow: hidden;
    .overview {
      padding: .36rem 0;
      .overview-left {
        float: left;
        padding: .12rem 0;
        width: 2.75rem;
        height: 100%;
        border-right: 1px solid rgba(7, 17, 27, 0.1);
        text-align: center;
        .score {
          font-size: .48rem;
          color: rgb(255, 153, 0);
          line-height: .56rem;
          padding-bottom: .12rem;
        }
        .title {
          font-size: .24rem;
          color: rgb(7, 17, 27);
          line-height: .24rem;
          padding-bottom: .16rem;
        }
        .rank {
          font-size: .2rem;
          color: rgb(147, 153, 159);
          line-height: .2rem;
        }
      }
      .overview-right {
        margin-left: 2.75rem;
        padding: 0 .48rem;
        >* {
          font-size: 0;
        }
        .title {
          display: inline-block;
          line-height: .36rem;
          color: rgb(7, 17, 27);
          font-size: .24rem;
          vertical-align: top;
        }
        .score-wrapper {
          padding-bottom: .16rem;
          .star {
            display: inline-block;
            vertical-align: top;
            padding-left: .24rem; // line-height:.36rem;
          }
          .score {
            display: inline-block;
            vertical-align: top;
            font-size: .24rem;
            color: rgb(255, 153, 0);
            padding-left: .22rem;
            line-height: .36rem;
          }
        }
        .delivery-wrapper {
          font-size: 0;
          .delivery {
            font-size: .24rem;
            ;
            color: rgb(147, 153, 159);
            line-height: .36rem;
            padding-left: .24rem;
          }
        }
      }
    }
    .rating-wrapper {
      padding: 0 .36rem;
      padding-top: .12rem;
      .rating-item {
        padding:.36rem 0;
        @include border-1px(rgba(7,17,27,.1));
        .avatar {
            float: left;
            margin-right:.24rem;
          img {
            width: .56rem;
            height: .56rem;
            border-radius: 50%;
          }
        }
        .content{
             overflow:hidden;
             position:relative;
            .name{
              font-size: .20rem;
              line-height: .24rem;
            }
            .star-wrapper{
              padding:.08rem 0 .12rem 0;
              .star{
                display: inline-block;
                text-align: left;
                padding-right: .12rem;
              }
              .delivery{
                font-size: .2rem;
                display: inline-block;
                vertical-align: top;
                color:rgb(147,153,159);
                line-height: .24rem;
              }
            }
            .text{
              font-size: .24rem;
              line-height: .36rem;
              padding-bottom:.16rem;
            }
            .recommend{
               line-height: .32rem;
              .icon-thumb_up,.icon-thumb_down{
                font-size: .24rem;
                line-height:.32rem;
              }
              .icon-thumb_up{
                color:rgb(0,160,220);
              }
              .item{
                font-size: .18rem;
                color:rgb(147,153,159);
                line-height: .32rem;
                padding:0 .12rem;
                display: inline-block;//span是content的内容，而inline-block是包含行
                border-width:1px;
                border-style: solid;
                border-color:rgba(7,17,27,.1);
                border-radius: .02rem;
                margin-right:.16rem;
                margin-bottom: .08rem;
              }
              
            }
            .time{
                position: absolute;
                right:0;
                font-size: .2rem;
                line-height: .24rem;
                color:rgb(126, 146, 167);
                top:0;
            }
        }
      }
    }
  }

</style>
