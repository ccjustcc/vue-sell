<template>
    <div class="ratingselect">
        <div class="rating-type">
            <span class="all" :class="{active:selectType===2}" @click="select(2,$event)">{{desc.all}}<span class="count">{{ratings.length}}</span></span>
            <span class="positive" :class="{active:selectType===0}" @click="select(0,$event)">{{desc.positive}}<span class="count">{{positives.length}}</span></span>
            <span class="negative" :class="{active:selectType===1}" @click="select(1,$event)">{{desc.negative}}<span class="count">{{negatives.length}}</span></span>
        </div>
        <div class="switch" :class="{on:onlyContent}" @click="toggleContent">
             <span class="icon-check_circle" ></span>
             <span class="title">只看内容的评价</span>
        </div>
    </div>
</template>

<script>
     const POSITIVE = 0;
     const NEGATIVE = 1;
     const ALL = 2;
     export default {
        name:"ratingselect",
        props:{
            ratings:{
                type:Array,
                default(){
                    return []
                }
            },
            selectType:{
                type:Number,
                default:ALL
            },
            onlyContent:{
                type:Boolean,
                default:false
            },
            desc:{
                type:Object,
                default(){
                    return{
                        all:"全部",
                        positive:"推荐",
                        negative:"吐槽"
                    }
                }
            }
        },
        methods:{
            select(type,eve){
                if(!eve._constructed){ return; }
                this.$emit('select',type);
            },
            toggleContent(eve){
                if(!eve._constructed){ return; }
                this.$emit('toggleContent')
            }
        },
        computed:{
            positives(){
              return this.ratings.filter((rating) => { return rating.rateType === POSITIVE; });
            },
            negatives(){
              return this.ratings.filter((rating) => { return rating.rateType === NEGATIVE; });
            }
        }
    }
</script>

<style scoped lang="scss">
     @import '../../Common/style/_commonscss.scss';
     .ratingselect{
         .rating-type{
             font-size:0;
             padding:.24rem 0 .36rem 0;
             @include border-1px(rgba(7,17,27,0.1));
             >span{
                 display: inline-block;
                 font-size:.24rem;
                 color:rgb(77,85,93);
                 line-height: .32rem;
                 padding:.16rem .24rem;
                 margin-right:.16rem;
                 border-radius: .02rem;
                 .count{
                     font-size: .20rem;
                     margin-left:.04rem;
                 }
                 &.active{color:#fff};
             }
             .positive,.all{
                 background: rgba(0,160,220,0.2);
                 &.active{background:rgba(0,160,220,1) };
             }
             .negative{
                 background:rgba(77,85,93,.2);
                &.active{background:rgba(77,85,93,1); };
             }
         }
         .switch{
             padding:.24rem 0;
             color:rgb(147,153,159);
             border-bottom:2px solid rgba(7,17,27,.1);
             font-size: 0;
             line-height:.48rem;
             &.on{
                .icon-check_circle{
                    color: #00c850;
                }  
             }
             .icon-check_circle{
                 display: inline-block;
                 font-size: .48rem;
                 color:rgb(147,153,159);
                 vertical-align: top;
                 margin-right:.08rem;
                 
             }
             .title{
                 display: inline-block;
                 vertical-align: top;
                 font-size: .24rem;
             }
         }
     }
</style>