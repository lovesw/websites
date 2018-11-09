<template>
  <div id="app">
    <router-view @login="login"/>
  </div>
</template>

<script>
  export default {
    name: 'App',
    methods: {
      login: function (params) {
        this.$kit.ajax('post', '/u/login', params, (res) => {
          // 登录成功后,响应的菜单信息放在sessionStorage中
          sessionStorage.setItem('menu', JSON.stringify(res.data.data))
          this.$router.push('/index')
        }, this)
      }
    }
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
