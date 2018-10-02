const V = module.exports = {}

V.sideMain = function (sideHtml, mainHtml, footHtml, mainText) {
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
          </div>
        </div>
        <div class="dropdown">
          <button class="dropbtn">
            <label style="color:white">檢視</label>
            <i class="fa fa-caret-down"></i>
          </button>
          <div class="dropdown-content">
            <a href="#view" onclick="Ui.showPanel('viewPanel')">檢視</a>
            <a href="#edit" onclick="Ui.showPanel('editPanel')">編輯</a>
          </div>
        </div>
        <div class="dropdown">
          <button class="dropbtn">
            <label style="color:white">本頁</label>
            <i class="fa fa-caret-down"></i>
          </button>
          <div class="dropdown-content">
            <a href="#main" onclick="">本頁</a>
            <a href="#footer" onclick="">側欄</a>
            <a href="#header" onclick="">腳註</a>
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
      <div class="center panel" id="viewPanel">
        ${mainHtml}
      </div>
      <div class="center panel" id="editPanel" style="display:none">
        <button class="left">存檔</button>
        <textarea>${mainText}</textarea>
      </div>
  </div>
  </main>
  <footer>
    ${footHtml}
  </footer>
  <script src="/ui.js"></script>
  <!--
  <script src="/page.js"></script>
  <script src="/main.js"></script>
  -->
</body>
</html>
`
}