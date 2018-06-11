const { Client } = require('pg')

async function main () {
  const client = new Client()
  await client.connect()
  
  const res = await client.query('SELECT $1::text as message', ['Hello world!'])
  console.log(res.rows[0].message) // Hello world!
  await client.end()  
} 

main().catch(function(err) {
  console.log('err=', err)
})
