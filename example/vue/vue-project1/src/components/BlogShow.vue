<template>
  <div>
    <h1>{{ post.title }}</h1>
    <p>{{ post.body }}</p>
    <button @click="$emit('list')">回列表</button>
  </div>
</template>

<script>
export default {
  name: 'BlogShow',
  props: [ 'post' ],
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
