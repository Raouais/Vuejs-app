import {ApiFetch} from '../../Api/apiFetch.js'

namespace:true;

const api = new ApiFetch('http://localhost:8090/MyApp/ApiRest/api.php?db=myapp&table=products');

const state = {
    products: [],
}

const getters = {
    products: state => state.products,
}

const actions = {
    async addProducts ({commit},product) {
        await api.insert(product)
        this.commit('ADD_PRODUCT', product)
    },
    async getProducts(){
        const res = await api.list()
        this.commit('SET_PRODUCTS',res.results.products)
    },
    async deleteProducts({commit}, product){
        await api.delete(product)
    },
    async updateProducts({commit}, product){
        await api.update(product)
    },
}

const mutations = {
    ADD_PRODUCT: (state, product) => {
        state.products.push({
            id: product.id,
            name:product.name,
            price:product.price,
            category:product.category,
        })
    },
    SET_PRODUCTS:(state, products) => {
        state.products = products;
    },
}

export default {
    state: state,
    mutations: mutations,
    getters: getters,
    actions: actions,
    strict: true,
}