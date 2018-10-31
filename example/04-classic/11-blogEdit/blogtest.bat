REM START /B mongod --dbpath db
REM sleep 5
cd ./mongodb/blog
call import.bat
cd ../../
npm run test
REM mongo --eval "db.getSiblingDB('admin').shutdownServer()"