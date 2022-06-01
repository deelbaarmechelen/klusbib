# Klusbib

Web application to facilitate the lending of work tools

[![Build Status](https://travis-ci.org/renardeau/klusbib.svg?branch=master)](https://travis-ci.org/renardeau/klusbib)

This application is part of the Klusbib setup, which is composed of:
* Web frontend (this application)
* [Klusbib API](https://github.com/deelbaarmechelen/klusbibapi)
* [Inventory](https://github.com/deelbaarmechelen/snipe-it)

## Running tests

**Start environment**  
Make sure API and inventory environments are started and available
```
start "MailCatcher" cmd /c "mailcatcher"
(update app.env.js settings to link environment to API)
yarn start-dev
```
Reset database
```
set API_PATH=<path-to-api-root-dir>
npm run db:reset && npm run db:migrate && npm run db:seed (API database)
php artisan migrate:fresh --seed (optional: complete reset of inventory database)
php artisan module:seed Klusbib (Inventory database)
```

Start Cypress
```
npm run cypress:open
```
