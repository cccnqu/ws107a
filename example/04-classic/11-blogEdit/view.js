const MarkdownIt = require('markdown-it')
const mdit = new MarkdownIt()

const V = module.exports = {}

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
              ${(user != null) ? '<a href="/profile">個人檔案</a>' : ''}
              ${(user != null) ? '<a href="/' + user + '/posts">我的留言</a>' : ''}
              <a href="/">網站首頁</a>
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

V.listBoards = function (boards, ctx) {
  let list = []
  for (let board of boards) {
    list.push(`<li><a href="/${board.board}/posts">${board.board} 留言板</a></li>`)
  }
  return V.layout(`留言版列表`, `<h1>所有留言版</h1><ol>${list.join('\n')}</ol>`, ctx)
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

V.showProfile = function (profile, ctx) {
  return V.layout('個人檔案', `
  <form action="/profile" method="post">
    <p><input type="text" placeholder="帳號" name="user" value="${profile.user}"></p>
    <p><input type="password" placeholder="密碼" name="password" value="${profile.password}"></textarea></p>
    <p><input type="password" placeholder="再次確認密碼" name="password2" value=""></textarea></p>
    <p><input type="submit" value="儲存"/></p>
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

V.boardLayout = function (board, title, content, ctx) {
  return V.layout(`${board} 留言板`, content, ctx)
}

V.fail = function (ctx) {
  return V.layout('失敗！', '失敗！', ctx)
}

V.success = function (ctx) {
  return V.layout('成功！', '成功！', ctx)
}

V.boardPosts = function (board, posts, ctx) {
  if (posts == null) return V.fail()
  let list = []
  for (let post of posts) {
    list.push(`<li><a href="/${post.board}/post/${post.file}">${post.title}</a></li>`)
  }
  /*
    ${(user === ctx.session.user) ? '<p><a href="/' + user + '/post/new"><button>創建新貼文</button></a></p>' : ''}
  */
  let content = `
  <div style="float:right">
    <p><a href="/${board}/post/new"><button>創建新貼文</button></a></p>
  </div>
  <h1>${board} 留言板</h1>
  <ol id="posts">
    ${list.join('\n')}
  </ol>
  `
  return V.boardLayout(board, '貼文列表', content, ctx)
}

/*
V.guid = function () {
  return 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'.replace(/[x]/g, function (c) {
    var r = Math.floor(Math.random() * 16)
    return r.toString(16)
  })
}

${V.guid()}
*/
V.showAddPost = function (board, ctx) {
  return V.boardLayout(board, '新增貼文', `
  <form action="/${board}/post" method="post">
    <p><input type="text" placeholder="Title" name="title" size="40" style="width:100%"></p>
    <p><textarea placeholder="Contents" name="body"></textarea></p>
    <p>
      <input type="text" placeholder="File" name="file" size="10" value="">
      <input type="submit" value="儲存"/>
    </p>
  </form>
  `, ctx)
}

V.getPost = function (post, ctx) {
  return V.boardLayout(post.board, post.title, `
  <div style="float:right">
    <p><a href="/${post.board}/post/${post.file}/edit"><button>編輯貼文</button></a></p>
  </div>
  <h1>${post.title}</h1>
  <p>${mdit.render(post.body)}</p>
  `, ctx)
}

V.editPost = function (post, ctx) {
  return V.boardLayout(post.board, post.title, `
  <form action="/${post.board}/post/${post.file}/save" method="post">
  <p><input type="text" placeholder="Title" name="title" size="40" style="width:100%" value="${post.title}"></p>
  <p><textarea placeholder="Contents" name="body">${post.body}</textarea></p>
  <p>
    <input type="text" placeholder="File" name="file" size="10" value="${post.file}">
    <input type="submit" value="儲存"/>
  </p>
  </form>
  `, ctx)
}
