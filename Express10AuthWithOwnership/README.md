[![General Assembly Logo](https://camo.githubusercontent.com/1a91b05b8f4d44b5bbfb83abac2b0996d8e26c92/687474703a2f2f692e696d6775722e636f6d2f6b6538555354712e706e67)](https://generalassemb.ly/education/web-development-immersive)

# Express Authentication

## Prerequisites

- [express-api-crud](https://git.generalassemb.ly/ga-wdi-boston/express-api-crud)
- [express-api-relationships](https://git.generalassemb.ly/ga-wdi-boston/express-api-relationships)

## Objectives

By the end of this, developers should be able to:

- Use Passport.js to add authentication to an Express application.
- Add authenticated routes to an Express application.
- Add user ownership to resources in an Express application.

## Preparation

1. Fork and clone this repository.
 [FAQ](https://github.com/ga-wdi-boston/meta/wiki/ForkAndClone)
1. Create a new branch, `training`, for your work.
1. Checkout to the `training` branch.

## Overview

> The general concept behind a token-based authentication system is simple.
> Allow users to enter their username and password in order to obtain a token
> which allows them to fetch a specific resource - without using their username
> and password. Once their token has been obtained, the user can offer the
> token - which offers access to a specific resource for a time period - to
> the remote site. Using some form of authentication: a header, GET or POST
> request, or a cookie of some kind, the site can then determine what level of
> access the request in question should be afforded.
>
> - [token based authentication](https://www.w3.org/2001/sw/Europe/events/foaf-galway/papers/fp/token_based_authentication/)

### Goal: Authentication & Authorization

**Create API routes that only logged-in users can access. All other
"unauthenticated" requests are denied.**

<img width="355" alt="Screen Shot 2020-04-01 at 12 47 50 PM" src="https://media.git.generalassemb.ly/user/3667/files/accac700-741f-11ea-8af9-5d67c82e9255"><br>

**A client must first sign in and if they sign in successfully, then our API
will send them a token.**

<img width="379" alt="Screen Shot 2020-04-01 at 12 47 41 PM" src="https://media.git.generalassemb.ly/user/3667/files/af2d2100-741f-11ea-8ffc-6e8e3dca234b"><br>

**The client can include the token with its next requests to prove to the API
that they are the logged in user.**

<img width="355" alt="Screen Shot 2020-04-01 at 12 47 29 PM" src="https://media.git.generalassemb.ly/user/3667/files/9886ca00-741f-11ea-9ea8-5df4c81097cb">

## Set Up Express Application

### Lab: Create Application Folder

Let's build out a minimal API in a folder named `events_api` and the file `server.js`.

```sh
mkdir events_api

cd events_api

touch server.js
```

Our folder structure should now be:

```bash
events_api/
└── server.js
```

### Code Along: Create Express Application

Then we can instantiate a new `npm` project and complete the prompts.

```sh
npm init
```

Install the Express npm package.

```sh
npm install express
```

Create our Express application in `server.js`

```js
// require express module
const express = require('express')

// create new express application
const app = express()

// define route GET to / that responds with Hello World!
app.get('/', (req, res) => res.send('Hello World!'))

// start application on port 4741
app.listen(4741, () => console.log('Example app listening on port 4741!'))
```

In the `package.json`, let's add a `server` script, to run our application with `nodemon`.

```js
"scripts": {
  "test": "echo \"Error: no test specified\" && exit 1",
  "server": "nodemon server.js"
},
```

We can now run our application with

```sh
npm run server
```

We can make a GET request to our server by visiting [http://localhost:4741/](http://localhost:4741/) in the browser.

We can also cURL to make a GET request to the server

```sh
curl http://localhost:4741/
```

## Code Along: Add Middleware to Express API

### CORS

CORS stands for "Cross-Origin-Resource-Sharing" and is a concept that
exists in the HTTP protocol. Basically what this comes down to is
that we cannot share resources such as static files (images, JSON, etc.)
"across origins", aka across different domains.

> An example of a cross-origin request: the front-end JavaScript code
> served from https://domain-a.com uses XMLHttpRequest to make a
> request for https://domain-b.com/data.json.
> [MDN CORS Documentation](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)

![CORS diagram showing image from domain-a being used domain-b in a cross origin request](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS/cors_principle.png)

By default, CORS is not allowed for security reasons, but we want to
build an API that anyone can talk to to request data! We'll need
to enable CORS to do this.

Let's add the [cors](https://github.com/expressjs/cors) package to our
application to enable these requests.

### Error Handling

GA wrote a custom error handling middleware for you to use found in
[lib/error_handler.js](lib/error_handler.js).

Let's add it to our application.

### Request Logger

GA wrote a custom request logger middleware for you to use found in
[lib/request_logger.js](lib/request_logger.js).

Let's add it to our application.

### Mongoose

Let's add [Mongoose](https://mongoosejs.com/docs/) to our application.

### JSON

Let's add the ability for our app to accept JSON. Express' [`.json` method](https://expressjs.com/en/api.html#express.json) will
accomplish this for us.

### URL Encoding

Let's add the ability for our app to be connected to a browser-based client that
is using `$.ajax` to make requests. Express' built-in [`urlendcoded` middleware](https://expressjs.com/en/api.html#express.urlencoded)
will help us do this.

## Code Along: User Schema and Model

A user will be our first resource.  User will need `email`, `hashedPassword`,
and `timestamps` that are all required and `email` should be unique.  Let's
create a user schema and model

## Code Along: User Model Transform

You may have noticed that when you created a new user, you got back a user
document with the user's password. That's a huge security hole in our API right
now. We can fix it using Mongoose Virtuals pretty easily though. Virtuals are
used to transform data without persisting the transformation in MongoDB. We'll
create a virtual that will automatically remove the password field any time we
use a toJSON method (including `JSON.stringify()`, Mongoose's `.toJSON()`
method or Express' `.json()` method). Even though the field is being deleted by
the virtual, it remains safe and sound in our database.

```js
{
  timestamps: true,
  toJSON: {
    // `user` is the returned Mongoose document
    // named `user` because it will be a `User` object
    transform: (_doc, user) => {
      delete user.hashedPassword
      return user
    }
  }
}
```

## Code Along: User Routes

Our user routes will not be our RESTful routes.  Instead, we will write custom
routes for `sign-up`, `sign-in`, `change-password`, and `sign-out`.

- POST `/sign-up` create a user
- POST `/sign-in` create a token
- PATCH `/change-password` update a user
- DELETE `/sign-out` destroy a token

### Sign Up

We may be tempted to define our `/sign-up` similar to a regular create action.

```js
router.post('/sign-up', (req, res, next) => {
  User.create(req.body.credentials)
    .then(user => res.status(201).json({ user }))
    .catch(next)
})
```

However, this would store the user's password in our database which is not
secure.  Instead we should store a hash of the password. Hashing is a one-way
function, so the hashed value cannot be reversed to obtain the original input
value. If you apply the same hashing algorithm to the same value you'll always
get the same hash though. That means we can store the hash of the password and
when users sign into the system, we can hash the password they send and compare
it with the hash in the database to verify that they provided the correct
password.

#### bcrypt

We'll use a popular npm package called [bcrypt](https://github.com/kelektiv/node.bcrypt.js)
to hash our passwords, so in the Terminal run:

```sh
npm install bcrypt
```

To hash the password, we'll use the `bcrypt.hash()` method which takes two
arguments. The first argument is the value we want to hash and the second is
the number of salt rounds.

Salting is a way to make the hash stronger. Each time the value is salted, it
is transformed in some way by adding another value to it. The more times you
salt, the more the original value is changed and obscured. We're going to use
10 salt rounds.

Hashing and salting takes time so bcrypt's `.hash()` method is asynchronous
(also has a hashSync method).

```js
const bcrypt = require('bcrypt')

// ...

router.post('/sign-up', (req, res, next) => {
  const credentials = req.body.credentials
  // create hash with password
  bcrypt.hash(credentials.password, 10)
    .then(hash => {
      // build user object with new hashed password
      const user = {
        email: credentials.email,
        hashedPassword: hash
      }
      // save user to database
      return User.create(user)
    })
    // send the new user object back with status 201
    .then(user => res.status(201).json({ user }))
    // pass any errors along to the error handler
    .catch(next)
})
```

#### Validation

We should also add some validation to make sure that the client sent us the
correct information. Our API expects a `credentials` object with a `password`
and `password_confirmation` that match.

```js
if (!credentials ||
  !credentials.password ||
  credentials.password !== credentials.password_confirmation) {
        throw new Error('A required parameter was omitted or invalid')
}
```

### Sign In

For a sign in request, we will need to first find the user by their email then
compare their password and if email and password are valid then respond with a
valid token.

```js
router.post('/sign-in', (req, res, next) => {
  // get password from request
  const password = req.body.credentials.password
  // declare user to access in the promise chain
  let user
  // find the user by email
  User.findOne({ email: req.body.credentials.email })
    .then(record => {
      // if no user then throw error
      if (!record) {
        throw new Error('Document not found')
      }
      // if we find a record save to our user variable
      user = record
      // compare password and stored password
      return bcrypt.compare(password, user.hashedPassword)
    })
    .then(correctPassword => {
      // if password does not match
      if (!correctPassword) {
        //  then throw a BadCredentialsError
        throw new Error('Email or password is invalid')
      }

      // create a token
      // https://nodejs.org/api/crypto.html#crypto_crypto_randombytes_size_callback
      const token = crypto.randomBytes(16).toString('hex')

      // add token to user
      user.token = token

      // save user
      return user.save()
    })
    // respond with user and the token
    .then(user => {
      res.status(201).json({ user })
    })
    .catch(next)
})
```

### Change Password

To accomplish change password, we will need the ability for our API to accept
the token from the client, validate it is a valid token, and then give us
access to the user so that we may complete their request.  To do this, we will
leverage [passport.js](http://www.passportjs.org/) library.

#### Passport.js

> Passport is authentication middleware for Node. It is designed to serve a
> singular purpose: authenticate requests. When writing modules, encapsulation
> is a virtue, so Passport delegates all other functionality to the
> application. This separation of concerns keeps code clean and maintainable,
> and makes Passport extremely easy to integrate into an application.
>
> Authenticating requests is as simple as calling passport.authenticate() and
> specifying which strategy to employ. authenticate()'s function signature is
> standard Connect middleware, which makes it convenient to use as route
> middleware in Express applications.
>
> ```js
> app.post('/login', passport.authenticate('local'), (req, res) => {
>     // If this function gets called, authentication was successful.
>     // `req.user` contains the authenticated user.
>     res.redirect('/users/' + req.user.username)
> })
> ```
>
> - [passport.js](http://www.passportjs.org/)

Passport allows us to choose from over 500 strategies for authentication.

Each Passport strategy has to be configured for your specific app. Basically,
Passport gives us a callback and we fill it in with any logic needed to get the
user from our database that matches some bit of data that Passport extracts
from a request. After configuring the strategy with the code to retrieve the
user from the database, we register the strategy, and initialize Passport.

Once initialized, weʼll run the passport strategy that we configured and
registered as route middleware. When run as middleware, Passport receives the
request, extracts and decrypts the user’s token, adds it to the request object
and then passes the request with the user object in it on to the controller in
route that called it (or the next route middleware).

We will use the [HTTP Bearer Authentication Strategy](http://www.passportjs.org/packages/passport-http-bearer/).

##### Configure Passport Strategy

In the documentation, we see the following example:

```js
const passport = require('passport')
const bearer = require('passport-http-bearer')

passport.use(new BearerStrategy( function(token, done) {
    User.findOne({ token: token }, function (err, user) {
      if (err) { return done(err) }
      if (!user) { return done(null, false) }
      return done(null, user, { scope: 'all' })
    })
  }
))
```

Let's implement this strategy in our application.

##### Add Authenticated Route

To authenticate a route, the documentation says we can pass it as middleware to
the specific route we want to authenticate:

```js
const requiresToken = passport.authenticate('bearer', { session: false })

// ...

app.get('/change-password', requiresToken, (req, res) => {
    res.json(req.user)
})
```

Now that we can verify the token is valid and access the user, we can finish
our change password feature.

```js
router.patch('/change-password', requireToken, (req, res, next) => {
  // declare user to access in the promise chain
  let user
  // find user by their id
  User.findById(req.user.id)
    // if we find a record save to our user variable
    .then(record => {
      user = record
      // compare old password and stored password
      return bcrypt.compare(req.body.passwords.old, user.hashedPassword)
    })
    .then(correctPassword => {
      // if the password is incorrect or there is no new password
      if (!correctPassword || !req.body.passwords.new) {
        throw new Error('A required parameter was omitted or invalid')
      }
      // if password is correct then encrypt new password
      return bcrypt.hash(req.body.passwords.new, 10)
    })
    .then(hash => {
      // add new has as hashed password for user
      user.hashedPassword = hash
      // save user
      return user.save()
    })
    // respond with 204
    .then(() => res.sendStatus(204))
    .catch(next)
})
```

### Sign Out

For sign out, we want to make sure the user is authenticated and then
invalidate their token.

```js
router.delete('/sign-out', requireToken, (req, res, next) => {
  //create new token
  req.user.token = crypto.randomBytes(16)
  req.user.save()
    // do not send new token back to client
    .then(() => res.sendStatus(204))
    .catch(next)
})
```

## Code-Along: Custom Errors

We have some repetitive code that could be made more DRY.

```js
new Error('A required parameter was omitted or invalid')
```

```js
new Error('Email or password is invalid')
```

```js
new Error('Document Not Found')
```

Let's refactor these into the following:
- `DocumentNotFoundError` class
- `BadParamsError` class
- `BadCredentialsError` class
- `handle404` method

### Require Ownership

Speaking of errors, we'll soon need to handle ownership on our resources. If a
user doesn't own a certain resource, they shouldn't be able to update or delete
it.

We'll write a method that compares the resource's `owner` key against the
incoming user's ID.

## Resource Ownership

Similar to yesterday, we'll be adding in a new model that will be "owned" by a
`User`. Using Express, we can secure this relationship a bit, and ensure that
whoever creates data owns it, and only they can modify that data once created.
This will be a one-to-many relationship, with `Event`s being owned by a `User`.

`User` -|--< `Event`

### Lab: An Event Model

Let's add a event model and schema, then we'll build routes that interact with
that model & manage it's relationship to the user.

An `Event` should have:
- `name` (string)
- `scheduled` (date)
- `owner` (a reference relationship to the `User` model)

### Code Along: Managing Owned Events

#### Create

Let's add a simple route to create `Event`s. It will use the data on the request
object to determine who is the "currently signed in user" and set them as the
`owner` of the `Event`.

> Note: We should **never send the `owner` in the request body**. Instead, we
> will send the user's token and let the route logic set the `owner` field
> manually. This way, users can't create data and say someone else created it.

#### Destroy

Now that we have owned data, let's make sure that only the owner of that data
can modify it, or in this case, delete it. We will use the error helper function
we wrote earlier, `requireOwnership` to help us here.

### Lab: Finishing Ownership CRUD

Now that you've seen how we can use `req.user` to help us manage this relationship,
let's finish up the Index, Show, and Update pieces of our CRUD.

1. (R)ead all Events (owned by the signed in user)
   > Hint: We can make queries with Mongoose `MyModel.find({ field: 'value' })`
   > How can we use the `req.user` to help us locate all the events owned by the
   > user making the request?
2. (R)ead a Event (owned by the signed in user)
3. (U)pdate an Event (owned by the signed in user)

## Additional Resources

- [PassportJS Authenticate](http://www.passportjs.org/docs/authenticate/)
- [PassportJS HTTP Bearer](http://passportjs.org/packages/passport-http-bearer/)

## [License](LICENSE)

1. All content is licensed under a CC­BY­NC­SA 4.0 license.
1. All software code is licensed under GNU GPLv3. For commercial use or
    alternative licensing, please contact legal@ga.co.
