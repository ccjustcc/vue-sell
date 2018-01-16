
<template>
   <div class="leftBar" ref="menuWrapperdom">
      <ul>
      	<li v-for='(category,index) in categorys' @click.stop.prevent='click(index,$event)' :key='index' class="menu-item-hook" :class='{clicked:currentIndex == index}'>
			  <span>
            	  <span v-if='category.type>-1' class="icon" :class="classMap[category.type]"></span>{{category.name}}
			  </span>
	    </li>
      </ul>
   </div>
</template>

<script>
	import BSscroll from 'better-scroll' ;
	export default{
		name:'leftBar',
		data(){
			return{
				getdata:{
				}
			}
		},
		watch:{
          currentIndex:function(val,oldval){
            let el = this.$el.getElementsByClassName("menu-item-hook")[val];
			this.menuScroll.scrollToElement(el,300);
		  }
		},
		props:[
			'currentIndex','foodsScroll','el','test'
		],
		computed:{
          categorys(){
			  return this.$store.state.categorys
		  },
		  store(){
			  return this.$store.state.name
		  }
		},
		// beforeCreate(){
		// 	console.log(this.$data)
		// 	//this.hellow = 'ddd';//这种this.xx方式添加的属性永远没有响应式，但是可访问，需要用
		// 	//$set的方法，但是set方法也需要本身data中存在的值（一级）才能存进去，所以就是直接改data值那就好， set的意思何在？
		// 	//答案： 不用set绑定的至始至终都没有响应式，哪怕一级有存在；这是源于setpropery里面的限制
		// 	this.$http.get('/api/goods').then((res) => {
		// 		let data = res.body.data;
        //          //这个会有延迟
		// 		// console.log(this.data);
		// 	})
		// },
		created(){
			// this.$set(this.test,'age',11);
			this.classMap = ['decrease', 'discount', 'special','invoice','guarantee'] ;
			var that = this;
			this.$nextTick(()=>{
				this._initScroll();
			});
			// 	//var secondes = new Date().getTime();
			// 	// console.log('延迟'+secondes);
			// 	// setTimeout(()=>{
			// 	// 	secondes = new Date().getTime();
			// 	// 	this.getdata.name = 'hehe'+secondes;
			// 	// 	console.log('完了'+secondes)
			// 	// },1000)
			// 	// //输出这个居然要一秒
			
		},
		mounted(){
		},
		beforeMount(){},
		// mounted(){
		// 	console.log(this.$data);
		// 	console.log(this.test);
		// 	var secondes = new Date().getTime();
		// 	//原因在于输出object需要时间较多，所以在还没完整输出完全部的时候已经运行到了上面的http放大，name改变
		// 	console.log(this.getdata)
		// 	secondes = new Date().getTime();
		// 	console.log(this.getdata.name+secondes)
		// 	// this.name='hel'
		// },
		methods:{
				click(index,event){
					if(!event._constructed){ //event._contstructed 是betterscroll自定义的事件
					   return ;//由于pc端也有原生的
					}
					let foodList = this.el.getElementsByClassName('food-list-hook');
					let el = foodList[index] ;
					this.foodsScroll.scrollToElement(el,300);
			},
			_initScroll(){
				if(!this.menuScroll){
                   this.menuScroll = new BSscroll(this.$refs.menuWrapperdom,{
				   click : true //原本的click被betterscroll中的touch preventdefault 阻止掉了，开启这个就会让better scroll 派发一个click事件，但是不算原生事件
				});
				}
				
				
			}
		}
	}
</script>

<style lang="scss" scoped type="text/css">
   @import  '../../../../Common/style/_commonscss.scss' ;
  .leftBar{
  	 width:1.60rem ;
  	 height:100%;
  	 background:#f3f5f7;
  	 position:absolute;
	 left:0;
  	//  &::-webkit-scrollbar{width: 0;
	//    border:0;
	//    height:0}
  	 li{
  	 	height: 1.08rem;
		width:100%;
  	 	padding:0 .24rem;
		display: table;
  	 	color:#07111B;
		position: relative;
  	 	cursor:pointer; 
  	 	&:before{
  	 		content:'';
  	 		display: inline-block;
  	 		height: 100%;
  	 		width:0px;
  	 		vertical-align: middle;
  	 	}
		//下面的黑线
  	 	&:after{
  	 		content:'';
			position: absolute;
			left:50%;
			bottom:0;
			transform: translateX(-50%);
  	 		display: block;
  	 		height: 1px;
  	 		width:1.12rem;
  	 		background: rgba(7,17,27,0.1);
  	 		margin:0 auto;
  	 	}
  	 	&.clicked{
  	 		background: #fff;
  	 		color:#07111B;
  	 		&:after{
  	 		content:'';
  	 		display: block;
  	 		height: 1px;
  	 		width:100%;
  	 		background: transparent;
  	 		margin:0 auto;
  	 	     }
  	 		span{
  	 			font-weight: 500;
  	 			position:relative;
  	 			/*&:before{
  	 				content:'11';
  	 				width:14px;
  	 				height: 14px;
  	 				/*position: relative;*/
  	 				/*display: inline-block;
  	 				border: 1px solid #000;
  	 				transform: translateY(-1px);
  	 			}*/
  	 		}
  	 	}
  	 	span{
  	 		display:table-cell; 
  	 		line-height:1.26em;
            font-weight:200;
  	 		font-size:.24rem; 
  	 		vertical-align:middle;
  	 		text-align: left;
  	 		width:100%;
			height:1.26em;
			position: relative;
			overflow: hidden;
			letter-spacing: 0.02em;
			.icon {
				margin-right:0.04rem;
				display: inline-block;
				width: 1.16em;
				height: 1.16em;
				/*margin-top:-0.10rem*/
				background-size: 100% 100%;
				background-repeat: no-repeat;
				vertical-align: top;
				&.decrease {
					@include bg-image('decrease_3')
				}
				&.discount {
					@include bg-image('discount_3')
				}
				&.guarantee {
					@include bg-image('guarantee_3')
				}
				&.invoice {
					@include bg-image('invoice_3')
				}
				&.special {
					@include bg-image('special_3')
				}
			}
  	 	}
  	 }
  }
</style>