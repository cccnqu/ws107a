# curl

* 參考 : [教你學用CURL --- 命令行瀏覽器](http://blog.xuite.net/asd.wang/alog/268420-%E6%95%99%E4%BD%A0%E5%AD%B8%E7%94%A8CURL+---+%E5%91%BD%E4%BB%A4%E8%A1%8C%E7%80%8F%E8%A6%BD%E5%99%A8+)
* http://evelynnote.blogspot.com/2011/03/curl.html

GET模式什麼option都不用，只需要把變量寫在url裡面就可以了
比如：
curl http://www.yahoo.com/login.cgi?user=nickwolfe&password=12345

而POST模式的option則是 -d

比如，curl -d "user=nickwolfe&password=12345" http://www.yahoo.com/login.cgi
就相當於向這個站點發出一次登陸申請~~~~~