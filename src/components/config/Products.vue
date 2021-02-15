<template>
    <div>
        <div>
            <label>Filter</label>
             <select @change="filterByCategory">
                    <option v-for="category in categories" :key="category" :value="category"> {{category}} </option>
            </select> <br>
            <button @click="isAppending">Add</button>
        </div>
        <div>
            <div v-show="append">
                <label for="">Name:</label>
                    <input type="text" v-model="name"><br>
                    <label for="">Price:</label>
                    <input type="text" v-model="price"><br>
                    <label for="">Category:</label>
                    <select @change="handleChange">
                        <option v-for="category in categories" :key="category" :value="category"> {{category}} </option>
                    </select> <br>
                    <button @click="app">ok</button>
            </div>
        </div>
        <div>
            <ul>
                <li v-for="p in productsFilter" :key="p.id"> 
                    <div>
                        <label v-show="!isEditing || elEdit != p"> {{p.name}} </label>
                        <div v-show="isEditing && elEdit == p">
                            <label for="">Name:</label>
                            <input type="text" v-model="name"><br>
                            <label for="">Price:</label>
                            <input type="text" v-model="price"><br>
                            <label for="">Category:</label>
                            <select @change="handleChange">
                                <option v-for="category in categories" :key="category" :value="category" :class="{active:category == p.category}"> {{category}} </option>
                            </select>
                        </div>
                        <button v-show="isEditing && elEdit == p" @click="edit">Ok</button>
                        <button @click="editing(p)" v-show="!isEditing || elEdit != p">Edit</button>
                        <button @click="remove(p)">Delete</button>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>

import store from '../store/index'
import Vuex from 'vuex'

global.v = Vuex

export default {
    store: store,
    data(){
        return {
            productsFilter: null,
            categories: ['Drinks','Desserts','Wines'],
            isEditing:false,
            elEdit: null,
            name:'',
            price:'',
            append: false,
            categoryChoice: 'Drinks',
            category: 'Drinks',
            store:store,
        }
    },

    methods: {
        ...Vuex.mapActions({
            getProducts: 'getProducts',
            addProducts: 'addProducts',
            deleteProducts: 'deleteProducts',
            updateProducts: 'updateProducts'
        }),

        editing (p) {
            this.isEditing = true
            this.elEdit = p
            this.name = p.name
            this.price = p.price
            this.category = p.category
        },

        reseting(){
            this.elEdit = null
            this.name = ''
            this.price = ''
            this.category = 'Drinks'
        },

        handleChange(e) {
            if(e.target.options.selectedIndex > -1) {
                this.category = e.target.options[e.target.options.selectedIndex].value
            }
        },

        getCategoryChoice(e) {
            if(e.target.options.selectedIndex > -1) {
                this.categoryChoice = e.target.options[e.target.options.selectedIndex].value
            }
        },

        async edit() {
            const newProduct = {id:this.elEdit.id,name:this.name,price:this.price,category:this.category}
            await this.updateProducts(newProduct)
            await this.refresh()
            this.reseting()
        },

        async remove (p) {
            await this.deleteProducts(p) 
            await this.refresh()
        },

        async app() {
            const newProduct = {name : this.name, price: this.price, category : this.category}
            if(!this.isSameProduct(newProduct) && !this.isEmptyProduct(newProduct)){
                await this.addProducts(newProduct)
                await this.refresh()
            }
            this.isAppending()
            this.reseting()
        },

        isAppending () {
            this.append = !this.append
        },

        isSameProduct(p){
            for(const product in this.products)
                if(product.name === p.name)
                    return true
            return false
        },

        isEmptyProduct(p){
            return p.name == ''
        },

        filterByCategory(e){
            if(e != undefined)
                this.getCategoryChoice(e)
            this.productsFilter = this.products.filter(p => p.category == this.categoryChoice)
        },

        async refresh(){
            await this.getProducts()
            this.filterByCategory()
        }
    },

    computed: {
        ...Vuex.mapGetters([
            'products',
        ]),

    },

    mounted () {
        this.refresh()
    },

}
</script>