var PLUGIN = {}
var MT = {cn2tw: {}, tw2cn: {}}
// var SMT = {}

PLUGIN.load = function () {
  MT.load()
  // SMT.load()
  window.onhashchange()
}

window.onhashchange = function () {
  /*
  var hash = window.location.hash.trim()
  if (hash === '#search') {
    MDB.plugin('search.html')
  } else if (hash === '#sms') {
    SMS.render()
  } else {
  */
    MDB.showBox('viewBox')
  // }
}

MDB.mt = function (msg) {
  var tmsg = msg
  if (msg.indexOf('=') >= 0) {
    var tokens = msg.split('=')
    var locale = MT.locale()
    msg = (locale === 'Global') ? msg
        : (locale === 'English') ? tokens[0]
        : MT.chineseMt(tokens[1])
  }
  return msg
}

MT.getS2t = function () {
  var bookLocale = MDB.setting.locale || ''
  if (MT.locale() === 'Global' || bookLocale === '' ||
     (MT.localeChinese() && ['繁體中文', '简体中文'].indexOf(bookLocale) >= 0) || // 想看的是中文，設定也是中文
     (MT.locale() === 'English' && bookLocale === 'English')) {
     return ''
  } else {
    return (MT.localeChinese()) ? 'e2c' : 'c2e'
  }
}

var mdRewrite0 = MDB.mdRewrite
MDB.mdRewrite = async function (md) {
  var isLocalVersion = false
  if (MT.locale() !== 'Global') {
    var mdParts = md.split(/\nchinese:\n/mi) // 英文文章 \chinese:\ 中文文章
    if (mdParts.length >= 2) {
      md = (MT.localeChinese()) ? mdParts[1] : mdParts[0]
      isLocalVersion = true
    }
  }
  var s2t = MT.getS2t()
  if (isLocalVersion || s2t === '') {
    if (MT.localeChinese()) md = MT.chineseMt(md)
    return mdRewrite0(md)
  } else {
    var mdt = await SMT.serverMt(md, s2t, 'text')
    if (MT.localeChinese()) mdt = MT.chineseMt(mdt)
    return mdRewrite0(mdt)
  }
}

var render0 = MDB.render
MDB.render = function (locale) {
  if (locale != null) window.localStorage.locale = locale
  one('#locale').innerHTML = MT.locale()
  render0()
//  if (window.location.hash === '#sms' && SMS != null) SMS.render() // 會遞迴，因為 plugin => render => SMS.render => plugin
}

// 機器翻譯： Client 端
MT.load = function () {
  MT.loadChinese() // 簡繁轉換字典
  show('#languageMenu')
}

MT.localeChinese = function () {
  return ['繁體中文', '简体中文'].indexOf(MT.locale()) >= 0
}

MT.locale = function () {
  return window.localStorage.locale || MDB.setting.locale || 'English'
}

// ============================= e2c 翻譯中文 ==============================
MT.loadChinese = function () {
  if (window.localStorage.chineseDictionary != null) {
    var chineseDictionary = JSON.parse(window.localStorage.chineseDictionary)
    MT.cn2tw = chineseDictionary.cn2tw
    MT.tw2cn = chineseDictionary.tw2cn
    MDB.bookRender()
    MDB.render()
  } else {
    f6.scriptLoad('../../chinese.js').then(function () {
      window.localStorage.chineseDictionary = JSON.stringify({cn2tw: cn2tw, tw2cn: tw2cn})
      MT.cn2tw = cn2tw
      MT.tw2cn = tw2cn
      MDB.bookRender()
      MDB.render()
    })
  }
}

MT.map = function (s, s2t) {
  return s2t[s] || s
}

MT.chineseMt = function (text) {
  var toText = []
  var s2t = (MT.locale() === '繁體中文') ? MT.cn2tw
          : (MT.locale() === '简体中文') ? MT.tw2cn : {}
  for (var i = 0; i < text.length; i++) {
    toText[i] = MT.map(text[i], s2t)
  }
  return toText.join('')
}

/*
// SMT = Server MT
SMT.onWatchChange = function () {
  window.localStorage.watchOption = one('#watchOption').value
  if (one('#watchOption').value === 'no') {
    hide('#watch')
  } else {
    show('#watch')
  }
}

SMT.load = function () { // 伺服端翻譯
  if (window.localStorage.watchOption != null) {
    one('#watchOption').value = window.localStorage.watchOption
    SMT.onWatchChange()
  }
  one('#watchOption').addEventListener('change', SMT.onWatchChange, false)
  one('#editText').addEventListener('click', SMT.editCursorMove, false)
  one('#editText').addEventListener('keyup', SMT.editCursorMove, false)
  one('#editText').addEventListener('focus', SMT.editCursorMove, false)
}

SMT.serverMt = async function (source, s2t, format) {
  var mtText = await f6.ojax({method: 'POST', url: '../../mt/' + s2t + '/' + format + '/'}, {source: source})
  return mtText.replace(/_/gi, '-')
}

SMT.cursorMove = function (box) {
  var s2t = one('#watchOption').value
  if (s2t === 'no') return
  var pos = box.selectionStart
  var text = ' ' + box.value
  for (var i = pos + 1; i > 0; i--) {
    if (/[，。？,;.!\n]/.test(text[i])) break
  }
  i = Math.max(i, 0)
  var m = text.substring(i + 1).match(/^.*?[，。？,;.!\n]/)
  if (m !== null) {
    var sentence = m[0]
    SMT.serverMt(sentence, s2t, 'ruby').then(function (html) {
      one('#watch').innerHTML = html
    })
  }
  return pos
}

SMT.editCursorMove = function () {
  SMT.cursorMove(one('#editText'))
}
*/