<template>
    <div>
        <h1>Waiter</h1>

        <div>
            <ul>
                <li v-for="table in tables" :key="table.id" @click.prevent.stop="showCurrentCommand(table.id)">
                    <div>
                        <label>Table: {{table.id}} </label>
                        <input type="button" value="ajouter" @click.prevent.stop="prepareCommand(table.id)">
                        <label for=""> Commandes: {{getCurrentCommand(table.id).length}} </label>
                    </div>
                    <div v-show="isTableShowingCommand(table.id)">
                        <ul>
                        <li v-for="command in getCurrentCommand(table.id)" :key="command.command_id">
                            <label :style="{color: command.statut ? 'red' : 'green' }">Command #{{command.id}} </label>
                            <input v-show="!command.statut" type="button" value="Served" @click.prevent.stop="removeCommand(command)">
                            <ul>
                            <br>
                                <li v-for="article in getArticlesByCommand(command.order_line)" :key="article.article_id">
                                    <label for=""> {{article.name}} </label>
                                    <label for="">  {{article.quantity}} </label>
                                </li>
                            <br>
                            </ul>
                        </li>
                    </ul>
                    </div>
                </li>
            </ul>
        </div>

        <div v-if="isTakingCommand">
            <ul>
                <li v-for="product in products" :key="product.id"> 
                    <span > Q: {{productQuantity(product)}} </span> 
                    <label  @click.prevent.stop="addArticle(product)">{{product.name}}</label>
                    <input v-show="productQuantity(product) > 0" type="button" value="remove" @click.prevent.stop="removeArticle(product)"> 
                     </li>
            </ul>
        </div>

        <button @click="sendCommand">Send</button>

    </div>
</template>

<script>

import store from './store/index.js'
import Vuex from 'vuex'
import {Command} from './app/Command.js'
import {OrderLine} from './app/OrderLine.js'
import {IndexedDB} from './Api/indexedDB'



export default {
    store: store,
    data () {
        return  {
            isTakingCommand: false,
            article: [],
            tableId:0,
            list_articles: [],
            list_command: [],
            tableIdShowingCommand:-1
        }
    },
    computed: {
        ...Vuex.mapGetters([
            'tables',
            'products',
            'listCommand',
            'listArticles'
        ]),

    },

    methods: {
        ...Vuex.mapActions([
            'getProducts',
            'addCommand',
            'addOrderLine',
            'setActiveTableId',
            'getCommandId'
        ],
        ),
        ...Vuex.mapActions({
            remove_command:'removeCommand',
            remove_article:'removeArticle',
            get_command: 'getCommand'
        }),
        getCommand(){
            this.get_command()
        },
        async removeCommand(command){
            await this.remove_command(command)
            this.list_command = this.listCommand
        },
        removeArticle(article){
            this.article.splice(this.article.indexOf(article),1);
        },
        async refresh(){
            await this.getProducts()
            this.list_articles = this.listArticles
            this.list_command = this.listCommand
        },
        prepareCommand(id){
            this.tableId = id
            this.isTakingCommand = true
        },
        async sendCommand () {
            if(this.article.length > 0){
                this.setActiveTableId(this.tableId)
                const id = await this.getCommandId();
                const date = new Date()
                const month = date.getMonth()+1
                const fullDate = date.getFullYear()+"-"+ parseInt(month/10) + month%10 +"-"+ parseInt(date.getDate()/10) + date.getDate()%10
                await this.addOrderLineFiltered(id)
                await this.addCommand(new Command(id,this.getAmount(), id, fullDate, this.tableId, 1))
                this.isTakingCommand = false
                this.article = []
            }
        },
        async addOrderLineFiltered(id){
            let tmp = []
            let isNotIn

            for(const item of this.article){
                isNotIn = true
                for(const el of tmp){
                    if(item === el)
                        isNotIn = false
                }
                if(isNotIn){
                    await this.addOrderLine(new OrderLine(0,item.name,item.id,this.productQuantity(item),id))
                    tmp.push(item)
                }
            }
        },
        addArticle(product){
            this.article.push(product);
        },
        productQuantity (product) {
            return this.article.filter(p => p == product).length
        },
        getAmount(){
            let amount = 0
            for(const a of this.article)
                amount += parseFloat(a.price)
            return amount
        },
        getCurrentCommand(id){
            return this.list_command.filter(p => p.table_id === id)
        },
        getArticlesByCommand(id){
            return this.list_articles = this.listArticles.filter(a => a.command_id === id)
        },

        showCurrentCommand(id){
            if(this.tableIdShowingCommand !== id)
                this.tableIdShowingCommand = id
            else 
                this.tableIdShowingCommand = -1
        },

        isTableShowingCommand(id){
            return this.tableIdShowingCommand === id
        }
    },

    async mounted () {
        
        const indexedCommand = new IndexedDB('command', new OrderLine())


        // for(const i of await indexedCommand.getList()){
        //     await addCommand(i)
        //     console.log(i)
        // }


        await this.refresh()

        
        console.log(indexedCommand.value)

        console.log()
    },
}


</script>
