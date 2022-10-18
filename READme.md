# Quotes Service

This is the documentation for SBSC Quotes API test.

## Installation

Clone the repository

`git clone https://github.com/elvis-onobo/quotes-api.git`

Navigate the the directory and install packages

`yarn install`

Traditionally you would be required to created your own **.env** file but since this is a test application and no sensitive content exist in the .env file, it has been pushed with the repo.

Kindly note the while you will be able to make successful **signup** and **login** calls, you require **Docker** or more precisely **Redis** in order to be able to make calls to the quotes endpoint.

So, run `docker-compose up -d` to bring up Redis.

And lastly, run the devlopement server:

`yarn dev`

## Endpoints

To make calls to the API endpoint, you would need a rest client like Postman, Insomnia or Thunder Client on VSCode.

Also, for ease, the API collection has been included with the project. You can find it at the root directory of the project. It is name **thunder-collection_sbsc.json**.

> Auth Endpoints

**Sign Up:**

`POST localhost:4000/auth/signup`

Body:

```
{
  "firstName":"Elvis",
  "lastName":"Onobo",
  "email":"elvis@dev.com",
  "password":"123456"
}
```

**Login:**

`POST localhost:4000/auth/login`

Body:

```
{
  "email":"elvis@dev.com",
  "password":"123456"
}
```

> Quotes

**Quote**

`GET localhost:4000/quote/fetch`

`-H Authorization: Bearer <token>`
