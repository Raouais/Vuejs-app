import Vuex from 'vuex'
import Vue from 'vue'
import products from './modules/products.js'
import tables from './modules/tables.js'
import command from './modules/command.js'

Vue.use(Vuex)

export default new Vuex.Store({
    modules : {
        products,
        tables,
        command
    },
})

