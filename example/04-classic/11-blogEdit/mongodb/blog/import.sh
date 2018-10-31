#!/bin/bash
mongoimport --host localhost -d blogmvc --collection posts --drop --file blog.posts.json --jsonArray
mongoimport --host localhost -d blogmvc --collection profiles --drop --file blog.profiles.json --jsonArray
mongoimport --host localhost -d blogmvc --collection boards --drop --file blog.boards.json --jsonArray