var V = module.exports = {}

V.layout = function (title, content) {
  return `
  <html>
  <head>
    <title>${title}</title>
    <link rel="stylesheet" href="/css/blog.css">
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
  return V.layout(`所有留言板列表`, `<h1>所有留言板列表</h1>
    <a href="/login"><button>登入</button></a>
    <a href="/logout"><button>登出</button></a>
    <a href="/signup"><button>註冊</button></a>
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

V.showSignup = function () {
  return V.layout('註冊', `
  <h2>註冊</h2>
  <form action="/signup" method="post">
    <p><input type="text" placeholder="帳號" name="user"></p>
    <p><input type="email" placeholder="Email" name="email"></textarea></p>
    <p><input type="password" placeholder="輸入密碼" name="password"></textarea></p>
    <p><input type="password" placeholder="確認密碼" name="password2"></textarea></p>
    <p><input type="submit" value="註冊"/><input type="reset" value="清除"/></p>
  </form>
  `)
}

V.logout = function () {
  return V.layout('登出成功！', `回到 <a href="/">首頁！</a>`)
}

V.userLayout = function (user, title, content) {
  return V.layout(title, `<h1>${user} 的留言板</h1>\n` + content)
}

V.listPosts = function (user, posts, ctx) {
  let list = []
  for (let post of posts) {
    list.push(`
    <li>
      <h2>${post.title}</h2>
      <p><a href="/${user}/post/${post.id}">讀取貼文</a></p>
    </li>
    `)
  }
  let content = ''
  if (user === ctx.session.user) {
    content += `<p><a href="/${user}/post/new"><button>創建新貼文</button></a></p>`
  }
  content += `
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
