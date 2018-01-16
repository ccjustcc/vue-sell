<template>
  <div class="footer">
       <div class="content" @click="toggleList">
          <div class="rightcontent" :class="{enough:(minPrice - totalPrice)<=0}">
               <div class="pay" @click.stop.prevent="pay">
                  {{payDesc}}
               </div>
          </div>
          <div class="leftcontent">
             <div class="logo-wrapper">
                 <div :class="{highlight:totalCount}">
                    <i class="icon-shopping_cart"  :class="{highlight:totalCount}"></i>
                 </div>
                 <div class="number" v-show="totalCount>0">{{totalCount}}</div>
             </div>
             <span class="price" :class="{highlight:totalCount}">{{totalPrice}}元</span>
             <span class="desc">另需配送费￥{{deliveryPrice}}元</span>
          </div>
          <!-- float到底还是跟文件位置有关 -->
       </div>
        <div class="ball-container">
            <div v-for="(ball,index) in balls" :key="index">
                <transition name="drop" 
                @before-enter='dropBeforeEnter' 
                @enter="dropEnter" 
                @after-enter=" dropAfterEnter">
                    <div class="ball" v-show="ball.show">
                        <div class="inner inner-hook"></div>
                    </div>
                </transition>
            </div>
        </div>
        <transition name="fold">
          <div class="shopcar-list" v-show="listShow">
              <div class="list-header">
                <h1 class="title">购物车</h1>
                <span class="empty" @click="empty">清空</span>
              </div>
              <div class="list-container" ref="listContainer">
                <ul>
                    <li class="food" v-for="(food,index ) in selectFoods" :key="index">
                      <span class="name">{{food.name}}</span>
                      <div class="price">
                          <span>￥{{food.price*food.count}}</span>
                      </div>
                      <div class="carcontrol-wrapper">
                            <carcontrol :food="food"></carcontrol>
                      </div>
                    </li>
                </ul>
              </div>
          </div>
        </transition>
        <div class="mask" v-show="listShow" @click="hideList"></div>
  </div>
</template>

<script >
  import eventbus from '../eventbus' ;
  import carcontrol from '../CarControl/CarControl';
  import BSscroll from 'better-scroll' ;
  let rem = document.documentElement.clientWidth * 100 / 750 ;
  export default {
     name:'footer',
     props:{
       selectFoods:{
          type:Array,
          default(){
            return [{
              price:10,
              count:10
            }];
          }//如果是函数的默认值就得用一个方法
       },
       minPrice:{
         type:Number,
         default: 0
       },
       deliveryPrice:{
         type:Number,
         default:0
       }
     },//props用对象是个编程习惯吧，约定俗成的
     computed:{
       totalPrice(){
          let total = 0 ;
          this.selectFoods.forEach((food) =>{
            total += food.price*food.count ;      
          })
          return total;
       },
       totalCount(){
          let count = 0;
          this.selectFoods.forEach((food)=>{
            count+= food.count;
          })
          return count;
       },
       payDesc(){
         if(this.totalPrice === 0){
            return `￥${this.minPrice}元起送`
         }else if(this.totalPrice<this.minPrice){
           let diff = this.minPrice - this.totalPrice ;
           return `还差￥${diff}元起送`
         }else{
           return '去结算'
         }
       },
       listShow(){
         if(!this.totalCount){
           this.fold = true;
           return false;
         }
         let show = !this.fold;
         if(show){
            
            this.$nextTick(()=>{
              if(!this.scroll){
                this.scroll = new BSscroll(this.$refs.listContainer,{
                    click:true
                });
              }else{
                this.scroll.refresh();
              }
            })
         }
         return show;
       }
     },
     components:{
        carcontrol
     },
     data(){
       return {
         balls:[
           {
              show:false
           },
           {
              show:false
           },
           {
              show:false
           },
           {
              show:false
           },
           {
              show:false
           }

         ],
         dropBalls:[],
         fold:true
       }
     },
     methods:{
       drop(el){
         for(let i = 0;i<this.balls.length;i++ )
          {
            let ball = this.balls[i];
             if(!ball.show)
             {
                ball.show = true;
                ball.el = el;
                this.dropBalls.push(ball) ;
                return ;
             }
          }
       },
       dropBeforeEnter(el){
         let count = this.balls.length ;
          let left=0.64*rem;
          let  bottom=0.44*rem;
         while (count -- ){
           let ball = this.balls[count];
           if(ball.show){
             let rect = ball.el.getBoundingClientRect(); //获取相对于视口
             let h =rect.height;//小球高度
             let x = rect.left-left;//获取x
             let y = -((window.innerHeight - (rect.top+h/2))-bottom) ;
             el.style.display = '';
             el.style.webkitTransform = `translate3d(0,${y}px,0)`;
             el.style.transform = `translate3d(0,${y},0)`;
             let inner = el.getElementsByClassName('inner-hook')[0];
             inner.style.webkitTransform = `translate3d(${x}px,0,0)`;
             inner.style.transform = `translate3d(${x}px,0,0)`;
           }
         }
       },
       dropEnter(el,done){
         /**/
          let rf =el.offsetHeight ;
          this.$nextTick(()=>{
              el.style.display = '';
              el.style.webkitTransform = `translate3d(0,0,0)`;
              el.style.transform = `translate3d(0,0,0)`;
              let inner = el.getElementsByClassName('inner-hook')[0];
              inner.style.webkitTransform = `translate3d(0,0px,0)`;
              inner.style.transform = `translate3d(0,0px,0)`;
              el.addEventListener('transitionend',done);
              
          })
       },
       dropAfterEnter(el){
            let ball = this.dropBalls.shift() ;
            if(ball){
                ball.show = false;
                el.style.display = 'none';
            }
       },
       toggleList(){
          if(!this.totalCount){
            return;
          }
          this.fold = !this.fold;
       },
       empty(){
           this.selectFoods.forEach((food)=>{
               food.count = 0;
           });
       },
       hideList(){
          this.fold = true;
       },
       pay(){
         if(this.totalPrice<this.minPrice){
             return ;
           }
          alert(this.totalPrice);
       }
     },
     mounted(){
        eventbus.$on('call',(el)=>{
          this.$nextTick(()=>{//这是为了提高性能，让点击加按钮是不是同时触发两个动画，等等再触发
            this.drop(el);
          })
        })
     }
  }

</script>

<style scoped lang="scss" typescript="text/css">
@import '../../Common/style/_commonscss.scss';

$linecolor : rgba(7,17,27,0.1);
     .footer{
       height: .96rem;
       width:100%;
       position: fixed;
       bottom:0;
       background: #141d27;/*不知道为什么在谷歌浏览器下计算不准，所以用这个来让他露出来的地方不明显*/
       .content{
         height:100%;
         .leftcontent{
           background: #141d27;
           height: 100%;
           margin-right:2.1rem;
          .logo-wrapper{
             display: inline-block;
             position:relative;
             background: #141d27;
             top:-.2rem;
             border-radius: 50%;
             height: 1.16rem;
             width:1.12rem;
             padding:.12rem;
             padding-bottom:.16rem;
             margin:0 .24rem;
             vertical-align: top;
             .number{
               position: absolute;
               top:0;
               right: 0;
               width:.48rem;
               height: .32rem;
               line-height:.32rem;
               text-align: center;
               border-radius: .32rem;
               font-size: .18rem;
               font-weight: 700;
               color:#fff;
               background: rgb(240,20,20);
               box-shadow: 0 .08rem 0.16rem 0 rgba(0, 0, 0, 0.4)

             }
             div{
               height: 100%;
               width: 100%;
               background:#2b343c;
               border-radius: 50%;
               text-align: center;
               vertical-align:top;
               &.highlight{
                 background: rgb(0,160,220);
               }
               i{
                 font-size: .48rem;
                 color:rgba(255,255,255,0.4);
                 line-height: .88rem;
                 &.highlight{
                   color:#fff;
                 }
               }
             }
           }
           .price{
             display: inline-block;
             vertical-align: top;
             margin:.24rem 0 ;
             padding-right:.24rem;
             font-size: .32rem;
             font-weight: 700;
             color:rgba(255, 255, 255,0.4);
             line-height: .48rem;
             border-right:1px solid rgba(255,255,255,0.1);
             &.highlight{
               color:#fff;
             }
           }
           .desc{ 
             font-size: .24rem;
             color:rgba(255,255,255,0.4);
             font-weight: 200;
             line-height:.96rem;
             padding-left:.24rem;
           }
         }
         .rightcontent{
           width:2.1rem;
           height: 100%;
           background: #2B333B;
           font-size: .32rem;
           color:rgba(255, 255, 255,0.4);
           font-weight: 700;
           line-height:.96rem;
           padding:0 .16rem;
           float:right;
           text-align: center;
           &.enough{
             background: #00b43c;
             color:#fff;
           }
         }
       }
       .ball-container{
         .ball{
            position: fixed;
            left: .64rem;
            bottom:.44rem;
            z-index:200;
            transition: all .4s cubic-bezier(0.49, -0.29, 0.75, 0.41);
            .inner{
               width: .32rem;
               height:.32rem;
               border-radius: 50%;
               background: rgb(0,160,220);
               transition: all .4s linear;
            }
            
         }
       }
       .shopcar-list{
         position: absolute;
         left: 0;
        //  max-height: 200px;
        //  overflow: scroll;
         top:0;
         transform: translate3d(0,-100%,0);
         z-index:-1;
         width:100%;
         background: #fff;
         &.fold-enter-active,&.fold-leave-active{
           transition:all 0.5s
         }
         &.fold-enter,&.fold-leave-to{
            transform: translate3d(0,0,0);
         }
         .list-header{
           height: .8rem;
           line-height: .8rem;
           padding:0 .36rem;
           background: #f3f5f7;
           @include border-1px($linecolor);
           .title{
             font-size:.28rem;
             font-weight: 200;
             color:rgb(7,17,27);
             float:left;
           }
           .empty{
             font-size: .24rem;
             color:rgb(0,160,220);
             float:right;
           }
         }
         .list-container{
           max-height: 4rem;
           overflow: hidden;
         }
         .food{
           margin:0 .36rem;
           height: .96rem;
           padding-right:1.44rem;
           @include border-1px($linecolor);
           .name,.price{
             display: inline-block;
             line-height:.96rem;
             font-size: .28rem;
             color:rgb(7,17,27);
           }
           .name{

           }
           .price{
             position: absolute;
             top:0;
             right:1.68rem;
             color:rgb(240 ,20,20);
             font-weight: 700;
           }
           .carcontrol-wrapper{
             position: absolute;
             right:0;
             top:50%;
             margin-top:-.22rem;
           }
         }
       }
       .mask{
         position: fixed;
         top:0;
         left: 0;
         width:100%;
         height: 100%;
         z-index:-2;
         background: rgba(0,0,0,.6);
       }
     }
</style> 