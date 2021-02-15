<template>
    <div>
        <h1>Connexion</h1>
        <form action="" @submit.prevent="connect">
            <label for="">Name:</label>
            <input type="text" v-model="name">
            <label for="">Password:</label>
            <input type="text" v-model="password">
            <button type="submit">Connecter</button>
        </form>
    </div>
</template>


<script>

export default {
    props : {
        isConnected: {type:Boolean}
    },   
    data() {
        return {
            name: '',
            password:'',

        }
    },
    methods:{
        connect(){
            this.value = true
            this.$emit('input',this.value)    
        }
    }

}

</script>