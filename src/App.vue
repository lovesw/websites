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

