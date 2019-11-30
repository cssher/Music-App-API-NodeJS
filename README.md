# Zypher-Music-Project

Steps to run this project:

1) git clone <url of this repo>

2) npm install

3) go to a file named config.js and paste this url "mongodb+srv://shera:cssher@cluster0-fubqa.mongodb.net/zypherMusic" within the inverted commas to connect to MongoDB server.

4)npm start

5) Use postman and http://localhost:9890 to make api calls using url links:

Post - add user : http://localhost:9890/music/user

Post - add artist: http://localhost:9890/music/artist

Get- get only famous artist: http://localhost:9890/music/artist/famous

Get- get songs of artist: http://localhost:9890/music/song

Post- 1 user can add only 1 comment: http://localhost:9890/music/song/comment
