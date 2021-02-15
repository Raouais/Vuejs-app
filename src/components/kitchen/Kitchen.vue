<template>
    <div>
        <h1>Kitchen</h1>


        <input type="button" value="En cours" @click="showPreparing()">
        <input type="button" value="Terminées" @click="showFinished()">

        <div>
            <ul>
                <li v-for="command in listCommand.filter(l => l.statut === commandStatut)" :key="command.command_id">
                    <label for="">Command #{{command.id}} </label>
                    <label for="">Table: {{command.table_id}} </label>
                    <input type="button" value="Ready"  @click="readyCommand(command)" v-show="commandStatut">
                    <input type="button" value="Retore"  @click="restoreCommand(command)"  v-show="!commandStatut">
                    <label for=""> {{getTimerToString(command.timer)}} </label>
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
<!-- 
        <div>
            <ul>
                <li></li>
            </ul>
        </div> -->

    </div>
</template>

<script>

import store from '../store/index'
import {IndexedDB} from '../Api/indexedDB.js'
import Vuex from 'vuex'


export default {
    store:store,
    data(){
        return {
            table:0,
            list_articles: [],
            commands: [],
            commandStatut: true
        }
    },
    methods: {
        ...Vuex.mapActions({
            remove_article : 'removeArticle',
            ready_command : 'setReadyCommand',
            restore_command: 'setRestoreCommand'
        }),
        restoreCommand(command){
            this.restore_command(command)
        },
        removeArticle(article){
            this.remove_article(article)
        },
        readyCommand(command){
            this.ready_command(command)
        },
        getArticlesByCommand(id){
            return this.list_articles = this.listArticles.filter(a => a.command_id === id)
        },
        showPreparing(){
            this.commandStatut = true
        },
        showFinished(){
            this.commandStatut = false
        },
        getTimerToString(timer){
            let seconds = timer
            let minutes = parseInt(timer/60)
            let hours = parseInt(minutes/60)
            if(timer >= 60)
                seconds -= minutes*60;
            
            if(hours > 0){
                minutes -= hours*60
                return  "Timer: "+parseInt(hours/10)+hours%10+":"+parseInt(minutes/10)+minutes%10+":"+parseInt(seconds/10)+seconds%10
            }

            return "Timer: "+parseInt(minutes/10)+minutes%10+":"+parseInt(seconds/10)+seconds%10
        }

    },
    computed:{
        ...Vuex.mapGetters([
            'listCommand',
            'listArticles'
        ]),
        getFinishCommand(){
            return this.commands.filter( el => {
                this.list_articles.forEach( a => {
                    el.order_line !== a.product_id
                })
            })
        },
    },
    mounted(){
        this.$interval = setInterval( _ => {
            this.list_articles = this.listArticles
            this.commands = this.listCommand
            // console.log(this.commands)
        },100000)
    }
}
</script>