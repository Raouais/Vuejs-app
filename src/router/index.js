import Vue from 'vue'
import Router from 'vue-router'
import Kitchen from '@/components/kitchen/Kitchen.vue'
import Waiters from '@/components/waiters/Waiters.vue'
import Config from '@/components/Config.vue'
import Products from '@/components/config/Products.vue'
import KitchenConf from '@/components/config/Kitchen.vue'
import WaitersConf from '@/components/config/Waiters.vue'
import Tables from '@/components/config/Tables.vue'
import Menu from '@/components/config/Menu.vue'
import Summary from '@/components/config/Summary.vue'
import Settings from '@/components/config/Settings.vue'
import Waiter from '@/components/Waiter.vue'

Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [{
      path: '/',
      redirect: 'kitchen'
    },{
      path: '/kitchen',
      name: 'kitchen',
      component: Kitchen,
    },{
      path: '/config',
      name: 'config',
      component: Config,
      children:[{
        path: 'Products',
        name: 'config.Products',
        component: Products
      },{
        path: 'Settings',
        name: 'config.Settings',
        component: Settings
      },{
        path: 'Tables',
        name: 'config.Tables',
        component: Tables
      },{
        path: 'Waiters',
        name: 'config.Waiters',
        component: WaitersConf
      },{
        path: 'Summary',
        name: 'config.Summary',
        component: Summary
      },{
        path: 'Kitchen',
        name: 'config.Kitchen',
        component: KitchenConf
      },{
        path: 'Menu',
        name: 'config.Menu',
        component: Menu
      }]
    },{
      path: '/waiters',
      name: 'waiters',
      component: Waiters,
    },{
      path: '/waiter',
      name: 'waiter',
      component: Waiter,
    }, {
      path: '*',
      redirect: '/'
    }
  ]
})
