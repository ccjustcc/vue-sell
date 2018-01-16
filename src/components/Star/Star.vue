<template>
  <div class='star' :class='starType'>
    <span v-for='(itemClass,index) in itemClasses' :key='index' class='star-item' :class='itemClass'></span>
  </div>
</template>
<script type='text/javascript'>
    const length = 5;
    const cls_on = 'on';
    const cls_half = 'half';
    const cls_off = 'off';

    export default {
        props: {
            size: {
                type: Number
            },
            score: {
                type: Number    
            }
        },
        computed: {
            starType() {
                return 'star-' + this.size;
            },
            itemClasses() {
                let result = [];
                let score = Math.floor(this.score * 2 ) / 2;
                let hasDecimal = score % 1 !== 0;
                let integer = Math.floor(score);
                for(let i =0 ;i < integer ; i++){
                    result.push(cls_on)
                }
                if(hasDecimal){
                    result.push(cls_half)
                }
                while(result.length<length){
                     result.push(cls_off);
                }
                return result;
            }
        }
    };
</script>
<style scoped lang='scss' type='text/css'>
    @import "../../Common/style/_commonscss.scss";
    .star {
        text-align: center;
        .star-item {
            display: inline-block;
            background-repeat: no-repeat;
        }
        &.star-48 {
            .star-item {
                width: .4rem;
                height: .4rem;
                margin-right: .44rem;
                background-size: 100% 100%;
                &.on {
                    @include bg-image('star48_on')
                }
                &.half {
                    @include bg-image('star48_half')
                }
                &.off {
                    @include bg-image('star48_off')
                }
                &:nth-last-of-type(1){
                    margin-right:0;
                }
            }
            
        }
        &.star-36 {
            .star-item {
                width: .30rem;
                height: .30rem;
                margin-right: .12rem;
                background-size: .30rem .30rem;
                &.on {
                    @include bg-image('star36_on')
                }
                &.half {
                    @include bg-image('star36_half')
                }
                &.off {
                    @include bg-image('star36_off')
                }
                &:nth-last-of-type(1){
                    margin-right:0;
                }
            }
        }
        &.star-24 {
            .star-item {
                width: .20rem;
                height:.20rem;
                margin-right: .06rem;
                background-size: .20rem .20rem;
                &.on {
                    @include bg-image('star24_on')
                }
                &.half {
                    @include bg-image('star24_half')
                }
                &.off {
                    @include bg-image('star24_off')
                }
                 &:nth-last-of-type(1){
                    margin-right:0;
                }
            }
        }
    }
</style>