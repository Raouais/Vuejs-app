import {ApiFetch} from '../../Api/apiFetch.js'

const api = new ApiFetch('http://localhost:8090/MyApp/ApiRest/api.php?db=myapp&table=tables');

const state = {
    activeTable: 0,
    tables: [{id:1},{id:2}],
}

const getters = {
    tables: state => state.tables,
    activeTable: state => state.activeTable,
    
}

const actions = {
    setActiveTableId ({commit}, id) {
        this.commit('SET_ACTIVE_TABLE', id)
    },
    async addTables ({commit}, table) {
        this.commit('ADD_TABLE', table)
        await api.insert(table)
    },
    async deleteTable({commit},table){
        this.commit('DELETE_TABLE', table)
        await api.delete(table)
    }
}

const mutations = {
    SET_TABLES:(state, tables) => {
        state.tables = tables;
    },
    SET_ACTIVE_TABLE:(state, id) => {
        state.activeTable = id
    },
    ADD_TABLE:(state, table) => {
        state.table.push(table)
    },
    DELETE_TABLE:(state,table) => {
        state.table = state.table.filter(el => el !== table)
    }
}

export default {
    state: state,
    mutations: mutations,
    getters: getters,
    actions: actions,
    strict: true,
}
