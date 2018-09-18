const V = module.exports = {}

V.layout = function (sideHtml, footHtml, bodyHtml) {
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
          <div class="dropdown">
            <button class="dropbtn">
              <label id="userName" style="color:white"><i class="fa fa-user"></i></label>
              <i class="fa fa-caret-down"></i>
            </button>
            <div class="dropdown-content">
              <a href="/login">登入</a>
              <a href="/logout">登出</a>
            </div>
          </div>
          <div class="dropdown">
            <button class="dropbtn">
              <label style="color:white">執行動作</label>
              <i class="fa fa-caret-down"></i>
            </button>
            <div class="dropdown-content">
              <a href="#view" onclick="Ui.showPanel('viewPanel')">檢視</a>
              <a href="#edit" onclick="Ui.showPanel('editPanel')">編輯</a>
              <a href="_Sidebar.md" onclick="">修改側欄</a>
              <a href="_Footer.md" onclick="">修改腳註</a>
            </div>
          </div>
        </div>
      </div>
    </header>
    <aside>
      <div id="leftNav" class="sidenav">
        <a href="javascript:void(0)" class="closebtn" onclick="Ui.closeNav()">&times;</a>
        <a href="Home">Home</a><br/>
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

V.mainPage = function (page) {
  const bodyHtml = `
    <div class="panel" id="viewPanel">
      ${page.mainHtml}
    </div>
    <div class="center panel" id="editPanel" style="display:none">
      <form action="/book/${page.book}/${page.file}" method="post">
        <input type="submit" class="left" value="存檔">
        <!-- <button class="left">存檔</button> -->
        <textarea name="text">${page.mainText}</textarea>
      </form>
    </div>
  `
  return V.layout(page.sideHtml, page.footHtml, bodyHtml)
}

V.loginPage = function (op, user) {
  return V.layout('', '', `
  ${op==='fail'?'<p>登入失敗，請重新登入！</p>'
   :op==='success'?'<p>您已登入成功，帳號是' + user + '</p>'
   :op==='logout'?'<p>您已登出，請重新登入！</p>': ''}
  <form action="/login" method="post">
    <input name="user" type="text" class="short" value="" placeholder="user"/>
    <input name="password" type="password" class="short" value="" placeholder="password"/>
    <input type="submit" value="登入"/>
  </form>
  `)
}
