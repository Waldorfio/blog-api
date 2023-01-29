# Blog API

The API component of the blog-client, developed using Express, NodeJS and MongoDB.

Refer to the main front-end [README.md](https://github.com/Waldorfio/blog-client#readme) for information on setting up the app.

## API Endpoints
The API has the following endpoints:
### Posts
- `GET /posts`: Retrieve all posts
- `GET /posts/:id`: Retrieve a specific post by ID
- `POST /posts`: Create a new post
- `PUT /posts/:id`: Update a specific post by ID
- `DELETE /posts/:id`: Delete a specific post by ID
### Messages
- `GET /posts/:id`: Retrieve all messages on a specific post by ID
- `POST /posts/:id/msg/create`: Create a new message
- `PUT /posts/:id/msg/:id`: Update a specific message by ID
- `DELETE /posts/:id/msg/:id`: Delete a specific message by ID
### Users
- `GET /users`: Retrieve all users
- `GET /users/:id`: Retrieve a specific user by ID
- `POST /users`: Create a new user
- `PUT /users/:id`: Update a specific user by ID
- `DELETE /users/:id`: Delete a specific user by ID

## API URL
The public [API URL](https://blog-api-production-6aeb.up.railway.app/)