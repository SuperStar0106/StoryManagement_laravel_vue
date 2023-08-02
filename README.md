# Story Management System

A laravel-vue app with built-in role-based authentication.
You can manage your stories in this app.


## Demo

`Email: admin@example.com`
`password: secret`

`Email: user@example.com`
`password: secret`


## Installation

#### Client side
```bash
  cd client-side
  npm install
```
#### Server side
```bash
  cd server-side
  composer install
  cp .env.example .env
  php artisan key:generate
  php artisan migrate --seed
  php artisan passport:install
```
#### If you can't access app with provided credential please follow.
```bash
  php artisan cache:clear
  php artisan passport:install
```
  You can get the 'Client ID' and 'Client secret' from terminal
  Copy and past these data to vue-client\src\config\env.js


## Authors

- [@Yuka Mokata](https://github.com/SuperStar0106)

  
## Screenshots
