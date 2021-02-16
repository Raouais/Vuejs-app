import {ApiFetch} from '../../Api/apiFetch.js'
import {IndexedDB} from '../../Api/indexedDB.js'
import { Command } from '../../app/Command.js';
import {OrderLine} from '../../app/OrderLine.js'

const indexedCommand = new IndexedDB('command',new Command());
const indexedOrder = new IndexedDB('order', new OrderLine());
const api = new ApiFetch('http://localhost:8090/MyApp/ApiRest/api.php?db=myapp');

const state = {
    listCommand: [],
    listArticles: []
}

const getters = {
    listCommand: state => state.listCommand,
    listArticles: state => state.listArticles
}

const actions = {
    async addCommand ({commit, rootState},command) {
        api.setUrl(api.url+'&table=command')
        indexedCommand.insert(command)
        await api.insert(command.getCommand())
        commit('ADD_COMMAND', command)
    },
    async addOrderLine({commit}, products){
        api.setUrl(api.url+'&table=orderline')
        indexedOrder.insert(products)
        await api.insert(products.getOrderLine())
        commit('ADD_ARTICLES',products)
    },
    getListCommand({commit}){
        let $this = indexedCommand
        let transaction = $this.db.transaction([$this.db_name], "readwrite");
        
        let objectStore = transaction.objectStore($this.db_name)
        
        objectStore.getAll().onsuccess = async e => {
            let value = await e.target.result; 
            console.log(value)     
            value.forEach(v => commit('ADD_COMMAND', new Command(null,null,null,null,null,null,v)))
        };

    },
    getListOrder({commit}){
        let $this = indexedOrder
        let transaction = $this.db.transaction([$this.db_name], "readwrite");
        
        let objectStore = transaction.objectStore($this.db_name)
        
        objectStore.getAll().onsuccess = e => {
            let value = e.target.result;      
            console.log(value)
            value.forEach(v => commit('ADD_ARTICLES', new OrderLine(null,null,null,null,null,v)))
        };

    },
    async getCommandId(){
        api.setUrl(api.url+'&table=command')
        const res = await api.list()
        return res.results.command.length
    },
    removeArticle({commit}, article){
        this.commit('REMOVE_ARTICLE',article)
    },
    async removeCommand({commit}, command){
        await api.delete(command.getCommand())
        this.commit('REMOVE_COMMAND', command)
    },
    removeArticle({commit}, article){
        this.commit('REMOVE_ARTICLE', article)
    },
    setReadyCommand({commit}, command){
        this.commit('SET_READY_COMMAND', command)
    },
    setRestoreCommand({commit}, command){
        this.commit('SET_RESTORE_COMMAND', command)
    }
}

const mutations = {
    ADD_COMMAND:(state, command) => {
        state.listCommand.push(command)
    },
    ADD_ARTICLES:(state, articles) => {
        state.listArticles.push(articles)
    },
    REMOVE_ARTICLE:(state,article) => {
        state.listArticles = state.listArticles.filter(el => el !== article)
    },
    REMOVE_COMMAND:(state,command) => {
        state.listCommand = state.listCommand.filter(el => el !== command)
    },
    SET_READY_COMMAND:(state, command) => {
        command.statut = false
        command.stopTimer()
    },
    SET_RESTORE_COMMAND:(state, command) => {
        command.statut = true
        command.getTimer()
    }
}

export default {
    state:state,
    mutations: mutations,
    getters: getters,
    actions: actions,
    strict: true,
}