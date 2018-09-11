<template>
  <div>
    <h1>New Post</h1>
    <p>Create a new post.</p>
    <!-- <form action="/post" method="post"> -->
      <p><input v-model="post.title" type="text" placeholder="Title"></p>
      <p><textarea v-model="post.body" placeholder="Contents"></textarea></p>
      <p>
        <!-- <input type="submit" value="Create"> -->
        <button @click="$emit('create', post)">Create</button>
      </p>
    <!-- </form> -->
  </div>
</template>

<script>
export default {
  name: 'BlogNew',
  props: [],
  data () {
    return {
      post: {title: '', body: ''}
    }
  },
  methods: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
input { width: 30em }
textarea { width: 30em; height: 100px; }
</style>
