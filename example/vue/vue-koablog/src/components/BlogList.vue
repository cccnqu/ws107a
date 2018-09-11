<template>
  <div>
    <h1>Posts</h1>
    <p>You have <strong>{{ posts.length }}</strong> posts!</p>
    <p><button @click="$emit('create')">Create a Post</button></p>
    <ul id="posts">
      <li v-for="(post, i) in posts" v-bind:key="i">
        <h2>{{ post.title }}</h2>
        <p><button @click="$emit('show', {id:i})">Read post</button></p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'BlogList',
  props: [ 'posts' ],
  data () {
    return {
      // posts: []
    }
  },
  mounted: function () {
  },
  methods: {
    /*
    readPost: function (i) {
      this.$emit('readPost')
    }
    */
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
