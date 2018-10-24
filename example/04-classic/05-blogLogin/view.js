var V = module.exports = {}

V.layout = function (title, content) {
  return `
  <html>
  <head>
    <title>${title}</title>
    <style>
      body {
        padding: 20px;
        font: 16px Helvetica, Arial;
      }
  
      h1 {
        font-size: 2em;
        color: #222222;
      }
  
      h2 {
        font-size: 1.4em;
        color: #666666;
      }
      
      h3 {
        font-size: 1.2em;
        color: #888888;
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
  
      input,
      textarea {
        border: 1px solid #eee;
        border-top-color: #ddd;
        border-left-color: #ddd;
        border-radius: 2px;
        padding: 15px;
        font-size: .8em;
      }
  
      input[type=text] {
        /*width: 500px;*/
      }

      a, a:visited {
        color: #336699;
        text-decoration: none;
      }

      li { line-height: 160%; }
    </style>
  </head>
  <body>
    <section id="content">
      ${content}
    </section>
  </body>
  </html>
  `
}

V.listUsers = function (users) {
  let list = []
  for (let user of Object.keys(users)) {
    list.push(`<li><a href="/${user}/posts">${user} 的留言板</a></li>`)
  }
  return V.layout(`<h1>所有留言板列表</h1>`, `
    <ol>${list.join('\n')}</ol>
  `)
}

V.showLogin = function () {
  return V.layout('登入', `
  <h2>登入</h2>
  <form action="/login" method="post">
    <p><input type="text" placeholder="User" name="user"></p>
    <p><input type="password" placeholder="Password" name="password"></textarea></p>
    <p><input type="submit" value="登入"/><input type="reset" value="清除"/></p>
  </form>
  `)
}

V.userLayout = function (user, title, content) {
  return V.layout(title, `<h1>${user} 的留言板</h1>\n` + content)
}

V.listPosts = function (user, posts) {
  let list = []
  for (let post of posts) {
    list.push(`
    <li>
      <h2>${post.title}</h2>
      <p><a href="/${user}/post/${post.id}">讀取貼文</a></p>
    </li>
    `)
  }
  let content = `
  <p><a href="/${user}/post/new"><button>創建新貼文</button></a></p>
  <p>您總共有 <strong>${posts.length}</strong> 則貼文!</p>
  <ul id="posts">
    ${list.join('\n')}
  </ul>
  `
  return V.userLayout(user, '貼文列表', content)
}

V.newPost = function (user) {
  return V.userLayout(user, '新增貼文', `
  <h2>新增貼文</h2>
  <p>創建一則新貼文</p>
  <form action="/${user}/post" method="post">
    <p><input type="text" placeholder="Title" name="title" size="40"></p>
    <p><textarea placeholder="Contents" name="body"></textarea></p>
    <p><input type="submit" value="送出"></p>
  </form>
  `)
}

V.showPost = function (user, post) {
  return V.userLayout(user, post.title, `
    <h2>${post.title}</h2>
    <p>${post.body}</p>
  `)
}
