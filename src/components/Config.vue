<template>
    <div>
        <h1> <router-link v-show="!isShowingConfig" :to="{name: 'config'}"><span @click="backToConfig">return</span></router-link> {{current}} </h1>
        <ul v-if="isShowingConfig">
            <router-link v-for="option in options" :key="option" :to="{name: 'config.'+option}"> 
               <span @click="changeCurrent(option)"> {{option}} </span>
            </router-link>
        </ul>
        <router-view :property="current" ></router-view>
    </div>
</template>

<script>
export default {
    data(){
        return {
            options:['Products','Menu','Kitchen','Summary','Tables','Waiters','Settings'],
            current: 'Configurations',
        }
    },
    methods: {
        changeCurrent(val){
            this.current = val
        },
        
        backToConfig(){
            this.current = 'Configurations'
        }
    },
    computed:{
        isShowingConfig(){
            return this.current === 'Configurations'
        },
    },
    mounted() {
        const location = window.location.pathname
        for(const option of this.options){
            if(location == '/config/'+option.toString()){
                this.current = option
                this.isShowingConfig 
            }
        }
    }   
}
</script>