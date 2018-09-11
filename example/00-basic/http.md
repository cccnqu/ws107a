# HTTP

* https://mdbookspace.com/view/jsw/README.md
* [m@rcus 學習筆記: Http GET、POST Method](https://dotblogs.com.tw/marcus116/archive/2011/05/29/26428.aspx) (讚!)


## 用 chrome 開發人員工具看封包


Chrome 開發人員工具/Network

有上下兩層，開大一點，選線軸上有資料的部分，看下半部視窗的封包。




## 行動裝置

* [你也會的 Web HTTP 封包除錯技巧（Client 篇）](https://blog.toright.com/posts/3432/%E4%BD%A0%E4%B9%9F%E6%9C%83%E7%9A%84-web-http-%E5%B0%81%E5%8C%85%E9%99%A4%E9%8C%AF%E6%8A%80%E5%B7%A7%EF%BC%88client-%E7%AF%87%EF%BC%89.html)

## Curl

* http://evelynnote.blogspot.com/2011/03/curl.html
* http://blog.kent-chiu.com/2013/08/14/testing-rest-with-curl-command.html
* https://www.eebreakdown.com/2016/10/curl-http.html
* [鯊魚咬電纜：30天玩Wireshark](https://ithelp.ithome.com.tw/users/20107304/ironman/1258)
  * https://ithelp.ithome.com.tw/articles/10193287


```
$ curl -i http://localhost:3000/
HTTP/1.1 200 OK
Content-Length: 192
Last-Modified: Mon, 10 Sep 2018 01:53:15 GMT
Cache-Control: max-age=0
Content-Type: text/html; charset=utf-8
Date: Mon, 10 Sep 2018 04:05:24 GMT
Connection: keep-alive

﻿<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-7" />
</head>
<body>
<a href="hello.htm">hello.htm</a><br/>
<img src="ccc.jpg"></a>
</body>
</html>
```

爬本校網頁

```
$ curl -i http://www.nqu.edu.tw
HTTP/1.1 302 Found
Date: Mon, 10 Sep 2018 04:12:24 GMT
Server: Apache
Location: https://www.nqu.edu.tw/
Content-Length: 271
Content-Type: text/html; charset=iso-8859-1

<!DOCTYPE HTML PUBLIC "-//IETF//DTD HTML 2.0//EN">
<html><head>
<title>302 Found</title>
</head><body>
<h1>Found</h1>
<p>The document has moved <a href="https://www.nqu.edu.tw/">here</a>.</p>
<hr>
<address>Apache Server at www.nqu.edu.tw Port 80</address>
</body></html>
```
