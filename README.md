# Konverse

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.2.5.

## Development  server

Run `cd ./MISoko_UX && npm run start` for a dev server. Navigate to `http://127.0.0.1:4201/`. The app will automatically reload if you change any of the source files.

***make sure the client match the one set in the convex env variables, for CORS to work.***

Configure API Endpoints in  `./MISoko_UX/src/environments/environment.dev.ts && ./MISoko_UX/src/environments/environment.prod.ts && ./MISoko_UX/src/environments/environment.ts`

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `cd ./Konverse_UX && ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `cd ./Konverse_UX &&ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `cd ./Konverse_UX && ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `cd ./Konverse_UX && ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

# Start Convex 

Initalize convex by running `cd ./Konverse_API && npm install && npx convex dev ` replace `./Konverse_API/.env.local` with values from your convex project.
Follow [Convex development docs](https://docs.convex.dev/home) for configuration and further help.


## Start Flask Server

Initalize convex by running `cd ./Konverse_Python && pip install -r requirements.txt ` replace `./Konverse_API/.env` with values from your values.
Follow [Flask development docs](https://flask.palletsprojects.com/) for configuration and further help.

## Authorization && Authentication

Replace `./Konverse_UX/src/environments` values with your own as they are subject to change.
