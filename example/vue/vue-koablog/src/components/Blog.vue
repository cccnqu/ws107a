<template>
  <div>
    <title>Blog</title>
    <blog-list v-if="op==='BlogList'" :posts="posts" v-on:show="showPost" v-on:create="op='BlogNew'"/>
    <blog-show v-if="op==='BlogShow'" :post="posts[postId]" v-on:list="op='BlogList'"/>
    <blog-new  v-if="op==='BlogNew'"  v-on:create="createPost"/>
  </div>
</template>

<script>
import BlogList from './BlogList.vue'
import BlogShow from './BlogShow.vue'
import BlogNew from './BlogNew.vue'
import axios from 'axios'

export default {
  name: 'Blog',
  components: {
    BlogList,
    BlogShow,
    BlogNew
  },
  data () {
    return {
      op: 'BlogList',
      posts: [],
      postId: 0
    }
  },
  mounted: function () {
    let self = this
    axios.get(`http://localhost:3000/post/list`).then(function (response) {
      self.posts = response.data
      console.log('axios:get posts=', self.posts)
    })
  },
  methods: {
    showPost (post) {
      this.postId = post.id
      this.op = 'BlogShow'
    },
    createPost (post) {
      this.posts.push(post)
      axios.post(`http://localhost:3000/post`, {post: post}).then(function (response) {
        console.log('createPost success! post=', post)
      })
      this.op = 'BlogList'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
body {
  padding: 80px;
  font: 16px Helvetica, Arial;
}
h1 {
  font-size: 2em;
}
h2 {
  font-size: 1.2em;
}
#posts {
  margin: 0;
  padding: 0;
}
#posts li {
  margin: 40px 0;
  padding: 0;
  padding-bottom: 20px;
  border-bottom: 1px solid #eee;
  list-style: none;
}
#posts li:last-child {
  border-bottom: none;
}
textarea {
  width: 500px;
  height: 300px;
}
input[type=text],
textarea {
  border: 1px solid #eee;
  border-top-color: #ddd;
  border-left-color: #ddd;
  border-radius: 2px;
  padding: 15px;
  font-size: .8em;
}
input[type=text] {
  width: 500px;
}
</style>
