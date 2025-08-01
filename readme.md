# guide to use
1. clone this repository in your system
2. start mongodb server
3. add .env.local file with MONGODB_URL=your mongodb url in string('')
4. use npm install to install dependencies
5. run "npm run dev" command
# steps for hosting on any vm
1. create a vm instance with ubuntu 20.04 os and enable request through port 3000.Also enable http,https requests
2. install docker
3. On start connect to mongoDb using docker
4. clone this repository
5. cd into it and add mongoDb url in a separate .env.local file
6. use command npm run dev for development
7. use npm run build and then start using pm2(recommended) or use command npm start
