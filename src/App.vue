<template>
  <div id="app">
    <router-link :to="{name: 'config'}" class="header item">Config</router-link>
    <router-link :to="{name: 'kitchen'}" class="header item">Kitchen</router-link>
    <router-link :to="{name: 'waiters'}" class="header item">Waiters</router-link>
    <router-link :to="{name: 'waiter'}" class="header item">Waiter</router-link>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
}
</script>
