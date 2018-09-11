<template>
  <div>
    <p>{{ message }}</p>
    <input v-model="message">
    <button v-on:click="reverseMessage">反转字符串</button>
  </div>
</template>

<script>
export default {
  name: 'MyTest',
  data () {
    return {
      message: 'Hello 你好!'
    }
  },
  methods: {
    reverseMessage: function () {
      this.message = this.message.split('').reverse().join('')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
