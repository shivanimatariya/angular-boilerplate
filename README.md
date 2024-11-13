# AngularNgrx

This project is made for the Get started of any Angular Project
## This project contains
 - CRUD Operations using Ngrx Store, Action, Reducers and effects
 - We have used localstorage for storing all the users data
 - Auth guard is used for not showing dashboard or inner pages to non login user
 - It has 3 pages
  ## 1. Register
  - User can register them selves to access the project
  - Register page also has required and password match validations
  - We have also implemented the unique username validation
  ## 2. Login
  - In this page user can login into system with given username and password combination
  - After success login user will be redirected to Dashboard page
  ## 3. Dashboard
  - Dashboard page has a Header component which will be always displayed when user is logged in
  - Header component stays in shared folder which has also some other common things
  - We have displayed a table with CRUD operation in it
  - All CRUD operations is managed by Ngrx

# Ngrx

 ## Actions
 - Actions will be used to every single operation made on the ngrx state data (Stored data)
 - we can also pass the parameters to Actions and can be used for operations made on the Data

 ## Reducers
 - Reducers used to return updated data based on the Given action
 - we can define multiple reducers for multiple data
 - We can use single reducer for multiple actions
 - To handle multiple action we will use switch case inside reducer defination

 ## Effects
 - Effects is used to make API call based on the Action
 - If any action requires the API Interaction then Effects can be used for it
 - If you are using effect then it will require 2 Actions
 - First action will be used for when should we trigger effect or API call so whenever first action will be called effect will be executed
 - The second action will be used for API success results so whenever API call is done and it returns the results the second action will return the result to the user


## Custom Angular Pipe
 - Have added 1 Pipe example in the project (in [header](https://github.com/khushbu-maurya/angular-dummy/blob/c0897a1dbb98ad809d2bccd1c058d8be43159a93/src/app/shared/components/header/header.component.html#L23) component)
 - that Pipe will display first 2 initial letters of Username and password
 - we can make our custom pipes based on our requirement

## Custom Angular Directive
 - Have added 1 Directive example in the project (in [header](https://github.com/khushbu-maurya/angular-dummy/blob/c0897a1dbb98ad809d2bccd1c058d8be43159a93/src/app/shared/components/header/header.component.html#L16) component)
 - that custom Directive will Hide 1 Admin menu if logged in user is not admin (username = admin)
 - And will only show that if username is admin
 - we can make our custom Directive based on our requirement

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
