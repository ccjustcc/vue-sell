import Vue from 'vue'
import Router from 'vue-router'
import goods from '@/components/Content/Goods/Goods'
import ratings from '@/components/Content/Ratings/Ratings'
import seller from '@/components/Content/Seller/Seller'

Vue.use(Router)

var router = new Router({
  routes: [
    {
      path: '/goods',
      name: 'goods',
      component: goods,
    },
    {
      path: '/ratings',
      name: 'ratings',
      component: ratings
    },
    {
      path: '/seller',
      name: 'seller',
      component: seller
    }
    
  ],
 linkActiveClass:'active'
})

//进行各种逻辑操作
router.push('/goods')

export default router;
