const V = module.exports = {}

function getUser(ctx) {
  return (ctx.session != null && ctx.session.user !=null)?ctx.session.user:null
}

V.layout = function (ctx, sideHtml, footHtml, bodyHtml, menuHtml='') {
  let user = getUser(ctx) // <i class="fa fa-user"></i>
  return `
  <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
      <link rel="stylesheet" href="/main.css"/>
    </head>
    <body>
    <header>
      <div id="header">
        <div class="navbar" style="float:left">
          <a onclick="Ui.openNav()" style="cursor:pointer">&#9776;</a>
          <a href="#" style="font-family:Verdana; text-shadow: 1px 0px 1px rgb(243, 243, 154); "></a>
          </div>
          <div class="navbar" style="float:right">
          <a href="#title" id="title"></a>
          ${menuHtml}
          <div class="dropdown">
            <button class="dropbtn">
              <label id="userName" style="color:white">
                ${(user == null)?'未登入':user}
              </label>
              <i class="fa fa-caret-down"></i>
            </button>
            <div class="dropdown-content">
              <a href="/login">${(user == null)?'我要登入':'我要登出'}</a>
              ${(user != null)?'<a href="myarea">我的專區</a>':''}
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
          ${sideHtml}
        </div>
      </div>
    </aside>
    <main>
      <div id="main">
        ${bodyHtml}
      </div>
    </main>
    <footer>${footHtml}</footer>
    <script src="/ui.js"></script>
  </body>
  </html>
  `
}

V.bookPage = function (ctx, page) {
  const bodyHtml = `
    <div class="panel" id="viewPanel">
      ${page.mainHtml}
    </div>
    <div class="center panel" id="editPanel" style="display:none">
      <form action="/book/${page.book}/${page.file}" method="post">
        <input type="submit" class="left" value="存檔">
        <textarea name="text">${page.mainText}</textarea>
      </form>
    </div>
  `
  const menuHtml = `
  <div class="dropdown">
    <button class="dropbtn">
      <label style="color:white">書籍頁面</label>
      <i class="fa fa-caret-down"></i>
    </button>
    <div class="dropdown-content">
      <a href="#view" onclick="Ui.showPanel('viewPanel')">檢視</a>
      <a href="#edit" onclick="Ui.showPanel('editPanel')">編輯</a>
      <a href="_Sidebar.md">側欄</a>
      <a href="_Footer.md">腳註</a>
    </div>
  </div>
  `
  return V.layout(ctx, page.sideHtml, page.footHtml, bodyHtml, menuHtml)
}

V.loginPage = function (ctx, op) {
  let user = getUser(ctx)
  let html
  if (user != null) {
    html = `
      <p>您已登入，帳號是 ${user}</p>
      <p>若這不是您的帳號，請先登出！</p>
      <form action="/logout" method="post">
        <input type="submit" value="登出"/>
      </form>
    `
  } else {
    html = `
      <p>
        ${(op==='fail')?'登入失敗，請重新登入！':''}
      </p>
      <form action="/login" method="post">
        <p><input name="user" type="text" class="short" value="" placeholder="user"/></p>
        <p><input name="password" type="password" class="short" value="" placeholder="password"/></p>
        <p>
          <input type="submit" value="登入"/>
          <input type="reset" value="清除"/>
        </p>
      </form>
    `
  }
  return V.layout(ctx, '', '', `
  <div class="center">
    <div style="width:300px;text-align:center">
      ${html}
    </div>
  </div>
  `, '')
}

