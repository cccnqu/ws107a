// node.js, "classic" way:
var MarkdownIt = require('markdown-it'),
    md = new MarkdownIt();

var result = md.render(`
# Title 1

## Title 1.1

[YouTube](https://tw.youtube.com)


![](https://www.google.com.tw/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png)


### Title 1.1.1

## Title 1.2
`);

console.log('result=', result)