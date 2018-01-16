<template>
	<div class='home'  ref="foodList">
		 <vleftbar  :currentIndex ="currentIndex" :el="el" :test="'t11t'" :foodsScroll="foodsScroll" ></vleftbar>
		 <div class="foods-wrapper" ref="foodsWrapper">
              <ul>
				<li @click="test"  v-for="(category,index) in categorys" :key="index" class="food-list food-list-hook">
					<h1 class="title">{{category.name}}</h1>
					<ul>
						<li v-for='(food,index) in category.foods' @click="selectFood(food,$event)" :key="index" class="fooditem clearfix">
							<div class="icon">
								<img :src="food.icon" alt="" width="100%" height="100%">
							</div>
							<div class="content">
								<h2 class="name">{{food.name}}</h2>
								<p class="desc" v-show="food.description">
									{{food.description}}
								</p>
								<div class="extra">
									<span>月售{{food.sellCount}}份</span><span >好评率{{food.rating}}%</span>
								</div>
								<div class="price">
									<span class="current-price">￥<span class="bigword">{{food.price}}</span></span>
									<span v-show="food.oldPrice" class="old-price">￥{{food.oldPrice}}</span>
								</div>
								<div class="carcontrol-wrapper">
									 <carcontrol :food="food"></carcontrol>
								</div>
							</div>
						</li>
					</ul>
				</li>
			  </ul>
		 </div>
		 <vfood :food="selectedFood" ref="vfood"></vfood>
	</div>
</template>

<script>
	import vleftbar from './leftBar/leftBar' ;
	import carcontrol from '../../CarControl/CarControl';
	import vfood from '../../Food/Food'

	import BSscroll from 'better-scroll' ;
	export default{
		 name:'Goods',
		 components:{
		 	vleftbar,
			carcontrol,
			vfood
		 },
		 props: {
			seller: {
				type: Object
			}
		},
		 data(){
			 return{
				 listheight:[],
				 x:0,
				 foodsScroll:{},
				 el:{},
				 selectedFood:{},
				 scrollY:0
			 }
		 },
		 watch:{
			// selectFoods(nv,ov){
            //      this.$store.state.selectFoods = this.selectFoods;
			// }
		 },
		 computed:{
			categorys(){
			  return this.$store.state.categorys
		    },
			currentIndex(){
				for(let i = 0;i<this.listheight.length;i++)
				{   //console.log('dd');
					let height1 = this.listheight [i] ;
					let height2 = this.listheight [i+1];
					if(!height2 || (this.scrollY >= height1 && this.scrollY<height2))
					{
						return i ;
					}
				}

				
			},
			selectedFoods(){//模板或者方法没有应用到的计算属性计算
				
			}
		  },
		 created(){
			    this.$http.get('/api/goods').then((res) =>{
				var code = res.body.code ;
				var data = res.body.data ;
				if(code === 0)
				{
					this.$store.state.categorys = data ;
					this.$nextTick(()=>{
					 this._initScroll();
					 this._calculateHeight();
				    });
				}  
				else{
				}})
			    this.$nextTick(()=>{
				})
			     
		 },
		methods:{
			_initScroll(){
				this.foodsScroll = new BSscroll(this.$refs.foodsWrapper,{
					probeType : 3 , //开启scrolly监听
					click:true
				});

				this.foodsScroll.on('scroll',(pos)=>{
					this.scrollY = Math.abs(Math.round(pos.y));
				})
			},
			_calculateHeight(d){
				this.el = this.$refs.foodsWrapper ;
				let foodList = document.getElementsByClassName('food-list-hook');
				let height = 0 ;
				var data = new Date().getTime();
				this.listheight.push(height);
				for(let i =0 ;i<foodList.length;i++)
				{
				  let item = foodList[i] ;
				  height += item.clientHeight ;
				  this.listheight.push(height);
				}
			},
			test(){
			},
			selectFood(food,event){
                if (!event._constructed) {
					return;
				}
				this.selectedFood = food;
				this.$refs.vfood.show();
			},
			click(eve){
				
				// console.log('click')
			}
		},
		mounted(){
			 this.$nextTick(()=>{
					//   this._initScroll();
				//    this._calculateHeight("mounted");
	        });
		},
		 beforeMount: function() {
       }
	}
</script>

<style lang="scss" scoped type="text/css">
    @import '../../../Common/style/_commonscss.scss' ;
    .home{
    	height: 100%;
		padding-left:1.60rem;
		position: relative;
		.foods-wrapper{
			height:100%;
			overflow:hidden;
			.food-list{
			    .title{
					font-size: .24rem;
					color:rgb(147, 153, 159);
					line-height:2.16em;
					padding:0 .28rem;
					background: #f3f5f7;
					font-weight: normal;
					position: relative;
					&::before{
						content:'';
						width:.04rem;
						position: absolute;
						height:100%;
						top:0;
						left: 0;
						background: #d9dde1;
					}
				 }
				.fooditem{
					margin:0 .36rem;
					padding:.36rem 0;
					position: relative;
					@include border-1px();
					&:last-child::after{
                       display: none;
					}
					.icon{
						height: 1.14rem;
						width:1.14rem;
						border-radius: .01rem;
						// margin-left:.36rem;
						float: left;
						overflow: hidden;
					}
					.content{
						margin-left: 1.14rem;
						padding-left:.20rem;
						position: relative;
						font-size: .2rem;
						color:rgb(147,153,159);
						line-height:1.2;//line-height就尽量用纯数字
						font-weight: normal;
						.name{
							font-size: .28rem;
							color:rgb(7, 17, 27);
							font-weight: normal;
							line-height:1em;
							padding-top:0.1428em;
						}
						.desc{
							padding-top:.8em;
						}
						.extra{
							padding-top:.8em;
							span+span{
								padding-left:1.2em
							}
						}
						.price{
							font-size: 0;
							.current-price{
								font-size: .2rem;
								color:#F01414;
								line-height:.48rem;
								font-weight: 700;
								.bigword{
									font-size: .28rem;
									vertical-align: top;
								}
							}
							.old-price{
							padding-left:.8em;
							font-size: .2rem;
							color:rgb(147,153,159);
							line-height: .48rem;
							font-weight: 700;
							text-decoration: line-through;
							}
						}
						.carcontrol-wrapper{
							position: absolute;
							right:0;
							bottom:0;
						}
						
					}
				}
			}
		
		}
    }
</style>