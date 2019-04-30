# Initing in the your PC

- For clone the project `git clone https://github.com/gustavoleste/pubslist-server.git`
- Enter in the folder `cd pubslist-server`
- Create .env file with variables `MONGODB_ADDRESS` and `SECRET_KEY`
- To install project dependency: `yarn install`
- To database initialization `docker run --name pubslistDB -d -p 27017:27017  -e AUTH=no mongo`
- Run `yarn start` in the default directory to start the project