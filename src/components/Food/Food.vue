<template>
  <transition name="move">
    <div v-show="showFlag" class="food" ref="food">
      <div class="food-content">
        <div class="image-header">
          <img :src="food.image" alt="image">
          <div class="back" @click='hide'>
            <i class="icon-arrow_lift"></i>
          </div>
        </div>
        <div class="content">
          <div class="title">{{food.name}}</div>
          <div class="detail">
            <span class="sell-count">月售{{food.sellCount}}份</span>
            <span class="rating">好评率{{food.rating}}</span>
          </div>
          <div class="price">
            <span class="now">￥{{food.price}}</span>
            <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
          </div>
          <div class="carcontrol-wrapper">
            <carcontrol :food="food"></carcontrol>
          </div>
          <div class="buy" @click.stop.prevent="addFrist($event)" v-show="!food.count||food.count===0">加入购物车</div>
        </div>
        <vsplit></vsplit>
        <div class="infor box">
          <h1 class="title">商品信息</h1>
          <div class="infor-body">{{food.info}}</div>
        </div>
        <vsplit></vsplit>
        <div class="rating box">
          <h1 class="title">商品评价</h1>
          <vratingselect :selectType="selectType" :onlyContent="onlyContent" :desc="desc" :ratings="food.ratings" @select="select"
            @toggleContent="toggleContent"></vratingselect>
          <div class="rating-wrapper">
            <ul class="" v-show="food.ratings&&food.ratings.length">
              <li v-show="needShow(rating.rateType,rating.text)" v-for="(rating,index) in food.ratings" class="rating-item" :key="index">
                <div class="user">
                  <span class="name">{{rating.username}}</span>
                  <img class="avatar" :src="rating.avatar">
                </div>
                <div class="time">{{rating.rateTime|formateDate}}</div>
                <p class="text">
                  <span :class="{'icon-thumb_up':rating.rateType===0,'icon-thumb_down':rating.rateType===1}"></span>{{rating.text}}
                </p>
              </li>
            </ul>
            <div class="no-ratings" v-show="!food.ratings || food.ratings">暂无评价</div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  import Vue from 'vue';

  import BSscroll from 'better-scroll';

  import {
    formateDate
  } from '../../Common/js/date'

  import vsplit from '../Split/Split';
  import vratingselect from '../RatingSelect/RatingSelect'
  import carcontrol from '../CarControl/CarControl'

  const POSITIVE = 0;
  const NEGATIVE = 1;
  const ALL = 2;

  export default {
    name: 'food',
    props: {
      food: {
        type: Object
      }
    },
    data() {
      return {
        showFlag: false,
        selectType: ALL,
        onlyContent: true,
        desc: {
          all: "全部",
          positive: "推荐",
          negative: "吐槽"
        }
      }
    },
    filters: {
      formateDate(item) {
        let date = new Date(item);
        return formateDate(date, "yyyy-MM-dd hh:mm")
      }
    },
    methods: {
      show() {
        this.showFlag = true;
        this.selectType = ALL;
        this.onlyContent = true;
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BSscroll(this.$refs.food, {
              click: true
            })
          } else {
            this.scroll.refresh();
          }
        })
      },
      hide() {
        this.showFlag = false;
      },
      addFrist(eve) {
        if (!eve._constructed) {
          return;
        }
        console.log('click')
        Vue.set(this.food, 'count', 1)
      },
      select(type) {
        this.selectType = type;
        this.$nextTick(() => {
          this.scroll.refresh();
        })
      },
      toggleContent() {
        this.onlyContent = !this.onlyContent;
        this.$nextTick(() => {
          this.scroll.refresh();
        })
      },
      needShow(type, text) {
        if (this.onlyContent && !text) {
          return false;
        }
        if (this.selectType === ALL) {
          return true;
        } else {
          return type === this.selectType;
        }

      }
    },
    components: {
      carcontrol,
      vsplit,
      vratingselect
    }
  }

</script>

<style scoped lang="scss">
  @import '../../Common/style/_commonscss.scss';
  .food {
    * {
      box-sizing: content-box;
    }
    position: fixed;
    left: 0;
    top:0;
    bottom:.96rem;
    width:100%;
    background: #fff;
    &.move-enter-active,
    &.move-leave-active {
      transition: all .6s;
    }
    &.move-enter,
    &.move-leave-to {
      transform: translate3d(100%, 0, 0)
    }
    .image-header {
      position: relative;
      box-sizing: border-box;
      width: 100%;
      height: 0;
      padding-top: 100%;
      img {
        position: absolute;
        top: 0;
        width: 100%;
        height: 100%;
      }
      .back {
        position: absolute;
        top: .2rem;
        left: 0;
        .icon-arrow_lift {
          display: block;
          padding: 10px;
          font-size: .4rem;
          color: #fff
        }
      }
    }
    .content {
      margin: 0 .36rem;
      position: relative;
      .title {
        font-size: .28rem;
        padding-top: .36rem;
        font-weight: 700;
        color: rgb(7, 17, 27);
        line-height: .28rem;
      }
      .detail {
        font-size: .20rem;
        line-height: .2rem;
        color: rgb(147, 150, 159);
        font-weight: normal;
        padding-top: .16rem;
        .sell-count {
          padding-right: .24rem;
        }
      }
      .price {
        padding: .36rem 0;
        font-size: .28rem;
        color: rgb(240, 20, 20);
        line-height: .48rem;
        font-weight: 700;
        .now {}
        .old {
          font-size: .2rem;
          color: rgb(147, 153, 159);
          vertical-align: top;
        }
      }
      .carcontrol-wrapper {
        position: absolute;
        right: 0;
        bottom: .36rem; //   transform: translate(0,-.6rem)
      }
      .buy {
        position: absolute;
        right: 0;
        bottom: .36rem;
        font-size: .2rem;
        color: rgb(255, 255, 255);
        line-height: .24rem;
        line-height: .48rem;
        border-radius: .24rem;
        background-color: rgb(0, 160, 220);
        padding: 0 .24rem;
      }
    }
    .box {
      padding: .36rem;
      .title {
        line-height: .28rem;
        margin-bottom: .12rem;
        font-size: .28rem;
        color: rgb(7, 17, 27);
      }
    }
    .infor {
      .infor-body {
        font-size: .24rem;
        font-weight: 200;
        color: rgb(77, 85, 93);
        line-height: .48rem;
        padding: 0 .16rem;
      }
    }
    .rating {
      .rating-wrapper {
        .rating-item {
          color: rgb(147, 153, 159);
          padding: .32rem 0;
          @include border-1px(rgba(7, 17, 27, .1));
          .user {
            position: absolute;
            right: 0;
            font-size: 0;
            .name {
              font-size: .2rem;
              line-height: .24rem; // vertical-align: bottom;
              vertical-align: text-bottom;
            }
            .avatar {
              width: .24rem;
              height: .24rem;
              margin-left: .12rem;
              border-radius: 50%;
            }
          }
          .time {
            font-size: .2rem;
            line-height: .24rem;
            padding-bottom: .12rem;
          }
          .text {
            font-size: .24rem;
            color: rgb(7, 17, 27);
            line-height: .32rem;
            span {
              line-height: .32rem;
              color: rgb(147, 153, 159);
              margin-right: .08rem;
              font-size: .24rem;
              &.icon-thumb_up {
                color: rgb(0, 160, 220);
              }
            }
          }
        }
      }
    }
  }

</style>
