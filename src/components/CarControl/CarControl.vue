<template>
    <div class="carcontrol">
        <transition name="move">
            <div class="car-decrease" v-show="food.count"  @click.stop.prevent="decreaseCar">
                <span class="icon-remove_circle_outline inner" ></span>
            </div>
        </transition>
       <div class="car-count" v-show="food.count">{{food.count}}</div>
       <div class="car-add icon-add_circle" @click.stop.prevent='addCar'></div>
    </div>
</template>

<script>
    import eventbus from '../eventbus';
   
    export default {
       name:'cartcontrol',
       props:{
           food:{
               type:Object,
           }
       },
       created(){
        //    this.$set(this.food,'count',0);
       },
       methods:{
           addCar(eve){
               if(!eve._constructed){   
                   return;
               }
               if(!this.food.count){
                   this.$set(this.food,'count',1);
                //    this.food.count = 1;
               }else{
                   this.food.count++;
               }
               eventbus.$emit('call',eve.target);
           },
           decreaseCar(eve){
               if(!eve._constructed){   
                   return;
               }
               if(this.food.count){
                   this.food.count--
               }
           }
       }
    }
</script>

<style scoped lang="scss" type="text/css">
     .carcontrol{
        //  line-height:normal;
         font-size: 0;
         .car-decrease{
            display: inline-block;
            transform: translate3d(0px,0,0);//可以开启硬件加速
            opacity:1;
            vertical-align: top;
            .inner{
                display: inline-block;
                line-height: .48rem;
                font-size: .48rem;
                color:rgb(0,160,220);
                transition: all 0.4s linear;
                transform: rotate(0) ;
            }
            &.move-enter-active,&.move-leave-active{
              transition:all .4s linear;
            }
            &.move-enter,&.move-leave-active{
              opacity: 0;
              transform:translate3d(.48rem,0,0);
             .inner{
                 transform:rotate(180deg)
             }
            }
         }
        .car-count{
            display: inline-block;
            width:.48rem;
            font-size: .2rem;
            color:rbg(0,160,220);
            line-height: .48rem;
            vertical-align: top;
            text-align: center;
        }
        .car-add{
            display: inline-block;
            line-height: .48rem;
            font-size: .48rem;
            color:rgb(0,160,220);
        }
    }
</style>