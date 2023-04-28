# Blogging-Platform

## Project - Blogging-Platform

### Key Points

- In this project I have work feature wise. That means I pick one object like user, blog. I work through it's feature the step was :
  1. I have create it's Model.
  2. I build it's API's.
  3. I test these API's by Postman.

## Feature I - User

### Models

- User Model

{
email: {string, mandatory,unique},
name: {string, mandatory}
password: {string, mandatory}
createdAt: {timestamp},
updatedAt: {timestamp},
}

## User APIs

### POST /registeruser

- Create a user document from request body.
- **Response format** - _**On success**_ - Return HTTP status 201. Also return the user document. The response should be a JSON object like [this](#successful-response-structure) - _**On error**_ - Return a suitable error message with a valid HTTP status code. The response should be a JSON object like [this](#error-response-structure)

```yaml
{
  "status": true,
  "message": "user is created successfully",
  "data":
    {
      "email": "abcdve@gmail.com",
      "name": "yashb",
      "password": "Abcgb@mailcom1",
      "isDeleted": false,
      "deletedAt": null,
      "_id": "644b6b7df82002fd5cb16c8d",
      "createdAt": "2023-04-28T06:45:17.814Z",
      "updatedAt": "2023-04-28T06:45:17.814Z",
      "__v": 0,
    },
}
```

### POST /login

- Allow an user to login with their email and password.
- On a successful login attempt return the JWT
- **Response format**
  - _**On success**_ - Return HTTP status 200 and JWT token in response body. The response should be a JSON object like [this](#successful-response-structure)
  - _**On error**_ - Return a suitable error message with a valid HTTP status code. The response should be a JSON object like [this](#error-response-structure)

```yaml
{
  "status": true,
  "message": "token created",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MTYyODc2YWJkY2I3MGFmZWVhZjljZjUiLCJpYXQiOjE2MzM4NDczNzYsImV4cCI6MTYzMzg4MzM3Nn0.PgcBPLLg4J01Hyin-zR6BCk7JHBY-RpuWMG_oIK7aV8",
}
```

## Get /getuser/:id (Authentication required)

- Must be have x-api-key key in Headers section with jwt token
- User is Allow to fetch details of their profile.
- Make sure that id in url param and in token is same
- **Response format**
  - _**On success**_ - Return HTTP status 200 and returns the user document. The response should be a JSON object like [this](#successful-response-structure)
  - _**On error**_ - Return a suitable error message with a valid HTTP status code. The response should be a JSON object like [this](#error-response-structure)

```yaml
{
  "status": true,
  "message": "user fetch",
  "data":
    {
      "_id": "644a472574edf60e8db87f51",
      "email": "abcde@gmail.com",
      "name": "yash",
      "password": "Abcg@mailcom1",
      "isDeleted": false,
      "deletedAt": null,
      "createdAt": "2023-04-27T09:57:57.858Z",
      "updatedAt": "2023-04-27T09:57:57.858Z",
      "__v": 0,
    },
}
```

## Get /alluser (Authentication required)

- Must be have x-api-key key in Headers section with jwt token
- User is Allow to fetch details of all users.
- **Response format**
  - _**On success**_ - Return HTTP status 200 and returns the user document. The response should be a JSON object like [this](#successful-response-structure)
  - _**On error**_ - Return a suitable error message with a valid HTTP status code. The response should be a JSON object like [this](#error-response-structure)

```yaml
{
  "status": true,
  "message": "user fetch",
  "data":
    [
      {
        "_id": "644a472574edf60e8db87f51",
        "email": "abcde@gmail.com",
        "name": "yash",
        "password": "Abcg@mailcom1",
        "isDeleted": false,
        "deletedAt": null,
        "createdAt": "2023-04-27T09:57:57.858Z",
        "updatedAt": "2023-04-27T09:57:57.858Z",
        "__v": 0,
      },
      {
        "_id": "644a472574edf60e8db87f51",
        "email": "abcde@gmail.com",
        "name": "yash",
        "password": "Abcg@mailcom1",
        "isDeleted": false,
        "deletedAt": null,
        "createdAt": "2023-04-27T09:57:57.858Z",
        "updatedAt": "2023-04-27T09:57:57.858Z",
        "__v": 0,
      },
    ],
}
```

## Feature II - Blog

### Models

- Blog Model

```yaml
{
  title: { string, mandatory },
  author: { name: { string, mandatory }, authorId: { objectId, mandatory } },
  contend: { string, mandatory },
  image: { string, mandatory },
  deletedAt: { Date, when the document is deleted },
  isDeleted: { boolean, default: false },
  createdAt: { timestamp },
  updatedAt: { timestamp },
}
```

## Blog API(Authentication required)

### POST /createblog (Authorization required)

- Create a blog document from request body.
- Upload Blog image to local server and save image location in document.
- User will validate before creating blog
- **Response format**

  - _**On success**_ - Return HTTP status 201. Also return the product document. The response should be a JSON object like [this](#successful-response-structure)
  - _**On error**_ - Return a suitable error message with a valid HTTP status code. The response should be a JSON object like [this](#error-response-structure)

```yaml
{
  "status": true,
  "message": "blog created successfuly",
  "data":
    {
      "title": "this is just only",
      "author": { "name": "yash", "authorId": "644a472574edf60e8db87f51" },
      "contend": "Architecture is a software development concept that focuses on creating",
      "image": "C:/Users/abhis/OneDrive/Desktop/blogging plateform/Blogging-Platform/src/image/BlogImg1682624539188.png",
      "isDeleted": false,
      "deletedAt": null,
      "_id": "644ad01bb426fd82887bfd09",
      "createdAt": "2023-04-27T19:42:19.352Z",
      "updatedAt": "2023-04-27T19:42:19.352Z",
      "__v": 0,
    },
}
```

### GET /getblog/:blogid (Authentication required)

- Must be have x-api-key key in Headers section with jwt token
- User is Allow to fetch details of his or other blogs.
- Make sure that blogid in url param
- **Response format**
  - _**On success**_ - Return HTTP status 200 and returns the user document. The response should be a JSON object like [this](#successful-response-structure)
  - _**On error**_ - Return a suitable error message with a valid HTTP status code. The response should be a JSON object like [this](#error-response-structure)

```yaml
{
  "status": true,
  "message": "blog is fetch by id",
  "data":
    {
      "author": { "name": "yash", "authorId": "644a472574edf60e8db87f51" },
      "_id": "644ad01bb426fd82887bfd09",
      "title": "this is just only",
      "contend": "Architecture is a software development concept that focuses on creating",
      "image": "C:/Users/abhis/OneDrive/Desktop/blogging plateform/Blogging-Platform/src/image/BlogImg1682624539188.png",
      "isDeleted": false,
      "deletedAt": null,
      "createdAt": "2023-04-27T19:42:19.352Z",
      "updatedAt": "2023-04-27T19:42:19.352Z",
      "__v": 0,
    },
}
```


### GET /allblog (Authentication required)
- Must be have x-api-key key in Headers section with jwt token
- User is Allow to fetch all blogs.
- In this api pagination is impleamented if you have to change page you can add page key in query and give number value
-you can get filter blog by data you have to key in query startdata or enddata you have to add only data like 2023-04-28 in any key 
- we have one more key in query keyword you enter any word that will fatch only those document which contain that word in content field
- **Response format**
  - _**On success**_ - Return HTTP status 200 and returns the user document. The response should be a JSON object like [this](#successful-response-structure)
  - _**On error**_ - Return a suitable error message with a valid HTTP status code. The response should be a JSON object like [this](#error-response-structure)

```yaml
{
  "status": true,
  "message": "all blog is fetch",
  "data":[
    {
      "author": { "name": "yash", "authorId": "644a472574edf60e8db87f51" },
      "_id": "644ad01bb426fd82887bfd09",
      "title": "this is just only",
      "contend": "Architecture is a software development concept that focuses on creating",
      "image": "C:/Users/abhis/OneDrive/Desktop/blogging plateform/Blogging-Platform/src/image/BlogImg1682624539188.png",
      "isDeleted": false,
      "deletedAt": null,
      "createdAt": "2023-04-27T19:42:19.352Z",
      "updatedAt": "2023-04-27T19:42:19.352Z",
      "__v": 0,
    }
    ]
}
```


### PUT /:id/updateblog/:blogid (Authorization required)
- Must be have x-api-key key in Headers section with jwt token
- User is Allow to update their blog by blog id.
- User have to provide id that is his id and blog id that is blog id which blog you have to update
- if you have to update your blog user must be provide key and it's value
- image size should be less than or equal to 200kb
- **Response format**
  - _**On success**_ - Return HTTP status 200 and returns the user document. The response should be a JSON object like [this](#successful-response-structure)
  - _**On error**_ - Return a suitable error message with a valid HTTP status code. The response should be a JSON object like [this](#error-response-structure)


```yaml
{
    "status": true,
    "message": "blog is updated ",
    "data": {
        "author": {
            "name": "yash",
            "authorId": "644a472574edf60e8db87f51"
        },
        "_id": "644a8ab15802662d3f272d02",
        "title": "this is just only",
        "contend": "Architecture is a software development concept that focuses on creating",
        "image": "C:/Users/abhis/OneDrive/Desktop/blogging plateform/Blogging-Platform/src/image/BlogImg1682668718036.png",
        "isDeleted": false,
        "deletedAt": "2023-04-28T06:12:21.793Z",
        "createdAt": "2023-04-27T14:46:09.550Z",
        "updatedAt": "2023-04-28T07:58:38.112Z",
        "__v": 0
    }
}
```


### DELETE /:id/deleteblog/:blogid (Authorization required)
- Must be have x-api-key key in Headers section with jwt token
- User is Allow to Delete their blog by blog id.
- User have to provide id that is his id and blog id that is blog id which blog you have to Delete
- **Response format**
  - _**On success**_ - Return HTTP status 200 and returns the user document. The response should be a JSON object like [this](#successful-response-structure)
  - _**On error**_ - Return a suitable error message with a valid HTTP status code. The response should be a JSON object like [this](#error-response-structure)

```yaml
{
    "status": true,
    "message": "blog is deleted "
}
```