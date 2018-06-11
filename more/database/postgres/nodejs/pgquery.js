var pg = require('pg')
var uri = 'postgres://dbuser:dege005@127.0.0.1:5432/exampledb'

pg.connect(uri, function(err, client, done) {
  if (err) console.log('err=', err)
  client.query('SELECT * FROM user_tbl', function(err, result) {
    done()
    if (err) return console.error('select:err=', err)
    console.log(result.rows[0])
  })
})
