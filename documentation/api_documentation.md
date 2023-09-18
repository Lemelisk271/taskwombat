# API Documentation

## USER Authentication/Authorization

### All endpoints that require authentication

All endpoints that require a current user to be logged in.

- Request: endpoints that require authentication
- Error Response: Require authentication
  - Status Code: 401
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Authentication required"
    }
    ```

### All endpoints that require proper authorization

All endpoints that require authentication and the current user does not have the correct role(s) or permission(s)

- Request: endpoints that require proper authorization
- Error Response: Require proper authorization
  - Status Code: 403
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Forbidden"
    }
    ```

### Get the Current User

Returns the information about the current user that is logged in.

- Require Authentication: true
  - Method: GET
  - URL: /api/session
  - Body: none
- Successful response when there is a logged in user
  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:
    ```json
    {
      "user": {
        "id": 1,
        "firstName": "Demo",
        "lastName": "User",
        "email": "demo@user.io",
        "zipCode": "98029",
        "profileImage": "https://avatars.githubusercontent.com/u/8659473",
        "phone": "6976583976"
      }
    }
    ```
- Successful response when there is no logged in user.
  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:
    ```json
    {
      "user": null
    }
    ```

### Log In a User

Logs in a current user with valid credentials and returns the current user's information.

- Require Authentication: false
- Request
  - Method: POST
  - URL: /api/session
  - Headers:
    - Content-Type: application/json
  - Body:
    ```json
    {
      "credential": "demo@user.io",
      "password": "user's password"
    }
    ```
- Successful Response
  - Status Code: 200
  - Headers:
    - Content Type: application/json
  - Body:
    ```json
    {
      "user": {
        "id": 1,
        "firstName": "Demo",
        "lastName": "User",
        "email": "demo@user.io",
        "zipCode": "98029",
        "profileImage": "https://avatars.githubusercontent.com/u/8659473",
        "phone": "6976583976"
      }
    }
    ```
- Error Response: Invalid Credentials
  - Status Code: 401
  - Headers:
    - Content-Type: application/json
  -Body:
  ```json
  {
    "message": "Login failed",
    "errors": {
      "credential": "The provided credentials were invalid"
    }
  }
  ```
- Error Response: Body Validation Errors
  - Status Code: 400
  - Headers:
    - Content-Type: application/json
  - Body:
    ```json
    {
      "message": "Bad Request",
      "errors": {
        "credential": "Please provide a valid email",
        "password": "Please Provide a password"
      }
    }
    ```

### Sign Up a User

Creates a new user, logs them in as a current user, and returns the current user's information.

- Require Authentication: false
- Request
  - Method: POST
  - URL: /api/users
  - Headers:
    - Content-Type: application/json
  - Body:
    ```json
    {
      "firstName": "John",
      "lastName": "Doe",
      "email": "john@doe.com",
      "password": "user's password",
      "zipCode": "98045",
      "profileImage": null,
      "phone": "2065551212"
    }
    ```
- Successful Response
  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - body:
    ```json
    {
      "user": {
        "id": 1,
        "firstName": "John",
        "lastName": "Doe",
        "email": "john@doe.com",
        "zipCode": "98045",
        "profileImage": null,
        "phone": "2065551212"
      }
    }
    ```
- Error Response: Body Validation Errors
  - Status Code: 400
  - Headers:
    - Content-Type: application/json
  - Body:
    ```json
      {
        "message": "Bad Request",
        "errors": {
          "firstName": "Please provide a valid first name",
          "lastName": "Please provide a valid last name",
          "email": "Please provide a valid email",
          "password": "Password must be 6 characters or more.",
          "zipCode": "Please enter a zip code.",
          "profileImage": "Please enter a valid URL for the image"
        }
      }
    ```

## Users

### Get User by ID

Returns user information by ID.

- Require Authentication: false
- Request
  - Method GET
  - URL: /api/users/:userId
  - Body: none
- Successful Response
  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:
    ```json
    {
      "id": 1,
      "firstName": "Demo",
      "lastName": "User",
      "email": "demo@user.io",
      "zipCode": "98542",
      "profileImage": "https://www.example.com/image1.png",
      "phone": "2065551212",
      "Reviews": [
        {
          "id": 1,
          "review": "Text for review 1",
          "stars": 1,
          "date": "2023-09-18",
          "appointmentId": 1,
          "userId": 1,
          "taskerId": 21,
          "categoryId": 7,
          "Tasker": {
            "id": 21,
            "firstName": "John",
            "lastName": "Doe",
            "about": "About tasker 21",
            "zipCode": "98056",
            "profileImage": "https://www.example.com/image2.png",
            "email": "john@doe.com",
            "phone": "2535551212"
          },
          "Category": {
            "id": 7,
            "category": "Yardwork Services",
            "about": "Hire a Tasker to help with yardwork & landscaping!",
            "url": "https://www.example.com/image3.png"
          },
          "ReviewImages": {
            "id": 3,
            "url": "https://www.example.com/image4.png",
            "reviewId": 1,
            "userId": 1
          }
        }
      ],
      "Appointments": [
        {
          "id": 18,
          "start": "2022-10-05T16:00:00.000Z",
          "end": "2022-10-05T18:00:00.000Z",
          "task": "Description of the scheduled task",
          "taskerId": 50,
          "userId": 1,
          "categoryId": 14,
          "Tasker": {
            "id": 50,
            "firstName": "Alberta",
            "lastName": "Kunde",
            "about": "About Tasker 50",
            "zipCode": "98323",
            "profileImage": "https://www.example.com/image5.png",
            "email": "Alberta44@gmail.com",
            "phone": "9920268519"
          },
          "Category": {
            "id": 14,
            "category": "Office Services",
            "about": "Hire a Tasker to help around the office!",
            "url": "https://www.example.com/image6.png"
          },
          "Review": {
            "id": 5,
            "review": "Review for this appointment",
            "stars": 5,
            "date": "2022-10-06",
            "appointmentId": 18,
            "userId": 1,
            "taskerId": 50,
            "categoryId": 14,
            "Tasker": {
              "id": 50,
              "firstName": "Alberta",
              "lastName": "Kunde",
              "about": "About Tasker 50",
              "zipCode": "98323",
              "profileImage": "https://www.example.com/image5.png",
              "email": "Alberta44@gmail.com",
              "phone": "9920268519"
            },
            "Category": {
              "id": 14,
              "category": "Office Services",
              "about": "Hire a Tasker to help around the office!",
              "url": "https://www.example.com/image6.png"
            },
            "ReviewImages": [
              {
                "id": 14,
                "url": "https://www.example.com/image7.png",
                "userId": 1
              }
            ]
          }
        }
      ]
    }
    ```

### Edit User Information

Updates the user's information and returns the new information

- Require Authentication: true
- Request
  - Method: PUT
  - URL: /api/users/:userId
  - Headers:
    - Content-type: application/json
  - Body:
    ```json
    {
      "firstName": "Jane",
      "lastName": "Doe",
      "email": "jane@doe.com",
      "phone": "3605551212",
      "zipCode": "98584"
    }
    ```

- Successful Response
  - Status Code: 201
  - Headers:
    -Content-Type: application/json
  - Body:
    ```json
    {
      "user": {
        "id": 1,
        "firstName": "Jane",
        "lastName": "Doe",
        "email": "jane@doe.com",
        "zipCode": "98584",
        "profileImage": "http://www.example.com/image7.png",
        "phone": "3605551212"
      }
    }
    ```

## Taskers
