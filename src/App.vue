<template>
	<div id="app">
	    <header class="topheader">
			<vheader :seller = 'seller'></vheader>
			<div class="tab">
				<router-link to="/goods">
					<div class="tab-item ">商品</div>
				</router-link>
				<router-link to="/ratings">
					<div class="tab-item ">评论</div>
				</router-link>
				<router-link to="/seller">
					<div class="tab-item ">商家</div>
				</router-link>
			</div>
		</header>
		<div class="content">
			<keep-alive>
			<router-view :seller="seller" ></router-view>
			</keep-alive>
		</div>
		<vfooter :deliveryPrice="seller.deliveryPrice" :minPrice="seller.minPrice" :selectFoods="selectFoods"></vfooter>
	</div>
</template>

<script>
	import vheader from './components/Header/Header' //import了啥在这里的标签就用啥
	import vfooter from './components/Footer/Footer'

	import {urlParam} from './Common/js/url'
	
	const ERR_OK = 0;
	export default {
		name: 'app',
		data() {
			return {
               seller:{
				   id:(()=>{
					   let queryParam = urlParam();
					   return queryParam.id;
				   })()
			   }
			}
		},
		computed:{
			categorys(){
			  return this.$store.state.categorys
		    },
			selectFoods(){
			  let foods = [];
				if(this.categorys.forEach){
					this.categorys.forEach((good)=>{
						good.foods.forEach((food)=>{
								if(food.count){
								foods.push(food)
								}
						});
					});
				}
			  return foods ;
			}
		},
		created() {
			this.$nextTick(()=>{
			})
//			console.log('parent+'+new Date().getTime());
//			console.log(this.seller)
//          console.log('parentcreate'+new Date().getTime())
			this.$http.get('/api/seller').then((res) => {
                var res = res.body;				
				if(res.code === ERR_OK) {
				//    this.seller = res.data;
				   this.seller = Object.assign({},this.seller,res.data);
				} else {
                     console.log('wrong')
				}
			});
			   
		},
		 beforeMount(){
            //  console.log('appBF')
        },
        mounted(){
            //  console.log('appM')
        },
//		beforeMount(){
//		mounted(){
//		console.log('parent+'+new Date().getTime());
//		},
		components: {
			vheader,
			vfooter
		}
	}
</script>
<style>
	body,
	html {
		height: 100%;
	}
</style>
<style lang="scss" scoped type="text/css">
  @import './Common/style/_commonscss.scss';
	$primarycolor:#000;
	#app {
		@import "./Common/style/_commonscss.scss";
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		/*text-align: center;*/
		color: #2c3e50;
		font-size: 12px;
		height: 100%;
		width: 100%;
		position: relative;
		// padding-bottom: $footerheight;
		padding-top: 3.48rem ;
		padding-bottom: $footerheight;
		box-sizing: border-box;
		overflow: hidden;
		.topheader{
			position:absolute;
			top:0;
			width:100%;
			.tab {
			font-size: 0px;
			width: 100%;
			text-align:center;
			color: rgba(77, 85, 93, 1.0);
			.tab-item {
				font-size: 14px;
				width: 33.33%;
				padding: .26rem 0;
				line-height: .28rem;
				font-size: .28rem;
				background: #fff;
				display: inline-block;
			}
			a.active {
				color: rgba(240, 20, 20, 1.0);
			}
		}
		}
		.content {
			border-top: 2px solid #E5E5E7;
			height: 100%;
			overflow: hidden;
			box-sizing: border-box;
		}
	}
</style>