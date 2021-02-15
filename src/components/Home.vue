<template>
    <div>
        <h1>Home</h1>
        <router-link :to="{name:'home.connexion'}" v-if="!isConnected">Se connecter</router-link>
        <router-link :to="{name:'home.config'}" v-else>Aller à la page de Configurations</router-link>
        <router-view v-model="isConnected"></router-view>
    </div>
</template>

<script>
export default {
    data(){
        return {
            isConnected:false
        }
    },
    computed:{
        connection () {
            if(this.isConnected)
                return router.push({path: 'config', name:'home.config'})
            console.log(router)
        }
    }
}
</script>