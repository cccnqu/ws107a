const V = module.exports = {}

V.sideMain = function (sideHtml, mainHtml, footHtml) {
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
        <a onclick="Shop.mainPage()" href="#LaPos" style="font-family:Verdana; text-shadow: 1px 0px 1px rgb(243, 243, 154); "></a>
        </div>
        <div class="navbar" style="float:right">
        <a href="#title" id="title"></a>
        <div class="dropdown">
          <button class="dropbtn">
            <label id="userName" style="color:white"><i class="fa fa-user"></i></label>
            <i class="fa fa-caret-down"></i>
          </button>
          <div class="dropdown-content">
            <a href="#login" onclick="login()">登入</a>
            <a href="#logout" onclick="logout()">登出</a>
            <a href="#save" onclick="edit()">編輯</a>
            <a href="#save" onclick="save()">存檔</a>
          </div>
        </div>
        <div class="dropdown">
          <button class="dropbtn">
            <label style="color:white">編輯</label>
            <i class="fa fa-caret-down"></i>
          </button>
          <div class="dropdown-content">
            <a href="#page" onclick="">本頁</a>
            <a href="#sidebar" onclick="">側欄</a>
            <a href="#footer" onclick="">腳註</a>
            <a href="#header" onclick="">標題</a>
          </div>
        </div>
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
    <div id="main" class="table" style="text-align:center">
      <div class="center" style="text-align:left; margin: 20px;">
        ${mainHtml}
      </div>
    </div>
  </main>
  <footer>
    ${footHtml}
  </footer>
  <script src="/Ui.js"></script>
</body>
</html>
`
}