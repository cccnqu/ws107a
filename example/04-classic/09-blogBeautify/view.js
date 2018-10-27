var V = module.exports = {}

V.layout = function (title, content, ctx) {
  let user = (ctx.session || {}).user
  return `
  <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
      <link rel="stylesheet" href="/css/main.css"/>
    </head>
    <body>
    <header>
      <title>${title}</title>
      <div id="header">
        <div class="navbar" style="float:left">
          <a onclick="Ui.openNav()" style="cursor:pointer">&#9776;</a>
          <a href="#" style="font-family:Verdana; text-shadow: 1px 0px 1px rgb(243, 243, 154); "></a>
          </div>
          <div class="navbar" style="float:left">
            <a href="#title" id="title">${title}</a>
          </div>
          <div class="navbar" style="float:right">
          <!--menuHtml-->
          <div class="dropdown">
            <button class="dropbtn">
              <label id="userName" style="color:white">
                ${(user == null) ? '未登入' : user}
              </label>
              <i class="fa fa-caret-down"></i>
            </button>
            <div class="dropdown-content">
              ${(user == null) ? '<a href="/signup">我要註冊</a>' : ''}
              ${(user == null) ? '<a href="/login">我要登入</a>' : '<a href="/logout">我要登出</a>'}
              ${(user != null) ? '<a href="/myarea">我的專區</a>' : ''}
              <a href="/">回首頁</a>
            </div>
          </div>
          &nbsp;&nbsp;&nbsp;
        </div>
      </div>
    </header>
    <aside>
      <div id="leftNav" class="sidenav">
        <a href="javascript:void(0)" class="closebtn" onclick="Ui.closeNav()">&times;</a>
        <div id="menu">
          <!--sideHtml-->
        </div>
      </div>
    </aside>
    <main>
      <div id="main">
        ${content}
      </div>
    </main>
    <footer><!--footer--></footer>
    <script src="/js/ui.js"></script>
  </body>
  </html>
    `
}

V.listUsers = function (users, ctx) {
  let list = []
  for (let user of Object.keys(users)) {
    list.push(`<li><a href="/${user}/posts">${user} 的留言板</a></li>`)
  }
  return V.layout(`所有留言板列表`, `<ol>${list.join('\n')}</ol>`, ctx)
}

V.showLogin = function (ctx) {
  return V.layout('登入', `
  <form action="/login" method="post">
    <p><input type="text" placeholder="User" name="user"></p>
    <p><input type="password" placeholder="Password" name="password"></textarea></p>
    <p><input type="submit" value="登入"/><input type="reset" value="清除"/></p>
  </form>
  `, ctx)
}

V.showSignup = function (ctx) {
  return V.layout('註冊', `
  <form action="/signup" method="post">
    <p><input type="text" placeholder="帳號" name="user"></p>
    <p><input type="email" placeholder="Email" name="email"></textarea></p>
    <p><input type="password" placeholder="輸入密碼" name="password"></textarea></p>
    <p><input type="password" placeholder="確認密碼" name="password2"></textarea></p>
    <p><input type="submit" value="註冊"/><input type="reset" value="清除"/></p>
  </form>
  `, ctx)
}

V.logout = function (ctx) {
  return V.layout('登出成功！', `回到 <a href="/">首頁！</a>`, ctx)
}

V.userLayout = function (user, title, content, ctx) {
  return V.layout(`${user} 的留言板`, content, ctx)
}

V.fail = function (ctx) {
  return '失敗！'
}

V.success = function (ctx) {
  return '成功！'
}

V.listPosts = function (user, posts, ctx) {
  if (posts == null) return V.fail()
  let list = []
  for (let post of posts) {
    list.push(`<li><p><a href="/${user}/post/${post.id}">${post.title}</a></p></li>`)
  }
  /*
  let content = ''
  if (user === ctx.session.user) {
    content += `<p><a href="/${user}/post/new"><button>創建新貼文</button></a></p>`
  }
  */
  let content = `
  <div style="float:right">
    ${(user === ctx.session.user) ? '<p><a href="/' + user + '/post/new"><button>創建新貼文</button></a></p>' : ''}
  </div>
  <h1>${user} 總共有 <strong>${posts.length}</strong> 則貼文!</h1>
  <ul id="posts">
    ${list.join('\n')}
  </ul>
  `
  return V.userLayout(user, '貼文列表', content, ctx)
}

V.newPost = function (user, ctx) {
  return V.userLayout(user, '新增貼文', `
  <p>創建一則新貼文</p>
  <form action="/${user}/post" method="post">
    <p><input type="text" placeholder="Title" name="title" size="40"></p>
    <p><textarea placeholder="Contents" name="body"></textarea></p>
    <p><input type="submit" value="送出"></p>
  </form>
  `, ctx)
}

V.showPost = function (user, post, ctx) {
  return V.userLayout(user, post.title, `
    <h2>${post.title}</h2>
    <p>${post.body}</p>
  `, ctx)
}
