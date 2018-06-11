# Node.js + PostgreSQL

以下為在 win10 的 linux 當中的操作


## 啟動

```
ccckmit@DESKTOP-96FRN6B:/mnt/d/test/node_postgresql$ sudo service postgresql start
 * Starting PostgreSQL 9.3 database server                                                              [ OK ]
```

## 創建 misagodb 資料庫

```
postgres@DESKTOP-96FRN6B:~$ psql
psql (9.3.21)
Type "help" for help.

postgres=# CREATE USER misago WITH PASSWORD 'ogasim005';
CREATE ROLE
postgres=# CREATE DATABASE misagodb OWNER misago
postgres-# ;
postgres=# GRANT ALL PRIVILEGES ON DATABASE misagodb to misago
postgres-# ;
GRANT
\q
misagodb=> CREATE TABLE users (name VARCHAR(20), uid VARCHAR(20), email VARCHAR(50));
CREATE TABLE
misagodb=> INSERT INTO users (name, uid, email) VALUES ('ccc', '123',
'ccckmit@gmail.com'
misagodb(> );
INSERT 0 1
misagodb=> SELECT * FROM users
misagodb-> ;
 name | uid |       email
------+-----+-------------------
 ccc  | 123 | ccckmit@gmail.com
(1 row)
```

## 使用 postgreSQL

```
ccckmit@DESKTOP-96FRN6B:/mnt/d/test/node_postgresql$ sudo service postgresql start
 * Starting PostgreSQL 9.3 database server                                                              [ OK ]
ccckmit@DESKTOP-96FRN6B:/mnt/d/test/node_postgresql$ sudo su - postgres
postgres@DESKTOP-96FRN6B:~$ psql
psql (9.3.21)
Type "help" for help.

postgres=# \password postgres
Enter new password:
Enter it again:
postgres=# CREATE USER dbuser WITH PASSWORD 'password';
CREATE ROLE
postgres=# CREATE DATABASE exampledb OWNER dbuser;
CREATE DATABASE
postgres=# GRANT ALL PRIVILEGES ON DATABASE exampledb to dbuser;
GRANT
postgres=# \q
postgres@DESKTOP-96FRN6B:~$ psql -U dbuser -d exampledb -h 127.0.0.1 -p 5432
Password for user dbuser:
psql: FATAL:  password authentication failed for user "dbuser"
FATAL:  password authentication failed for user "dbuser"
postgres@DESKTOP-96FRN6B:~$ psql -U dbuser -d exampledb -h 127.0.0.1 -p 5432
Password for user dbuser:
psql (9.3.21)
SSL connection (cipher: DHE-RSA-AES256-GCM-SHA384, bits: 256)
Type "help" for help.

exampledb=> psql exampledb
exampledb-> CREATE TABLE user_tbl(name VARCHAR(20), signup_date DATE);
ERROR:  syntax error at or near "psql"
LINE 1: psql exampledb
        ^
exampledb=> CREATE TABLE user_tbl(name VARCHAR(20), signup_date DATE);
CREATE TABLE
exampledb=> UPDATE user_tbl set name='snoopy' WHERE name='ccc'
exampledb-> ;
UPDATE 1
exampledb=> SELECT * FROM user_tbl
exampledb-> ;
  name  | signup_date
--------+-------------
 snoopy | 2013-12-22
(1 row)

exampledb=> DELETE FROM user_tbl WHERE name='snoopy'
exampledb-> ;
DELETE 1
exampledb=> ALTER TABLE user_tbl ADD email VARCHAR(40)
exampledb-> ;
ALTER TABLE
exampledb=> ALTER TABLE user_tbl ALTER COLUMN signup_date SET NOT NULL
exampledb-> ;
ALTER TABLE
exampledb=> SELECT * FROM user_tbl; ='s name | signup_date | email
------+-------------+-------
(0 rows)

exampledb=> SELECT * FROM user_tbl;
 name | signup_date | email
------+-------------+-------
(0 rows)

exampledb=> ALTER TABLE user_tbl RENAME COLUMN signup_date TO signup;
ALTER TABLE
exampledb=> SELECT * FROM user_tbl;NAME name | signup | email
------+--------+-------
(0 rows)

exampledb=> ALTER TABLE user_tbl DROP COLUMN email;
ALTER TABLE
exampledb=> SELECT * FROM user_tbl;
 name | signup
------+--------
(0 rows)
```

## 全紀錄

```
  473  ls
  474  sudo apt-get update
  475  sudo apt-get install postgresql postgresql-contrib
  476  node --version
  477  sudo npm cache clean -f
  478  sudo npm install -g n
  479  sudo n stable
  480  node --version
  481  sudo ln -sf /usr/local/n/versions/node/9.6.1/bin/node /usr/bin/nodejs
  482  node --version
  483  history
```