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
    - Content-Type: application/json
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

### Get Tasker by ID

Returns Tasker's information by ID

- Require Authentication: false
- Request
  - Method: GET
  - URL: /api/taskers/:taskerId
  - Body: none
- Successful Response:
  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:
    ```json
    {
      "id": 38,
      "firstName": "Itzel",
      "lastName": "Okuneva",
      "about": "About tasker 38",
      "zipCode": "98692",
      "profileImage": "https://www.example.com/image8.png",
      "email": "Itzel3@hotmail.com",
      "phone": "9530448553",
      "Reviews": [
        {
          "id": 8,
          "review": "Review text",
          "stars": 2,
          "date": "2023-03-23",
          "appointmentId": 24,
          "userId": 2,
          "taskerId": 38,
          "categoryId": 15,
          "User": {
            "id": 2,
            "firstName": "Bo",
            "profileImage": "https://www.example.com/image9.png",
            "zipCode": "98058"
          }
        }
      ],
      "Appointments": [
        {
          "id": 541,
          "start": "2022-09-18T18:00:00.000Z",
          "end": "2022-09-18T20:00:00.000Z",
          "task": "Description of the task",
          "taskerId": 38,
          "userId": 32,
          "categoryId": 4
        }
      ],
      "Categories": [
        {
          "id": 1,
          "category": "Handyman",
          "about": "Hire a Tasker for help around the house",
          "url": "https://www.example.com/image10.png",
          "TaskerCategories": {
            "rate": 30.18
          }
        }
      ],
      "Availabilities": [
        {
          "id": 260,
          "day": "Mon",
          "startTime": "09:00:00",
          "endTime": "21:00:00",
          "notAvailable": false,
          "dayIdx": 1,
          "taskerId": 38
        }
      ],
      "Vehicles": [
        {
          "vehicleType": "Sedan"
        }
      ],
      "Tools": [
        {
          "id": 7,
          "toolType": "Axe"
        }
      ]
    }
    ```

### Get a Taskers Availability by ID

Returns the availability of a single Tasker by Id.

- Require Authentication: false,
- Request
  - Method: GET
  - URL: /api/taskers/schedule/:taskerId
  - Body: none
- Successful Response
  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body
    ```json
    {
      "id": 1,
      "firstName": "Kaley",
      "lastName": "Rutherford",
      "about": "About Tasker 1",
      "zipCode": "98404",
      "profileImage": "https://www.example.com/image11.png",
      "email": "Kaley76@yahoo.com",
      "phone": "8096966507",
      "Availabilities": [
        {
          "id": 1,
          "day": "Mon",
          "startTime": "09:00:00",
          "endTime": "21:00:00",
          "notAvailable": false,
          "dayIdx": 1,
          "taskerId": 1
        }
      ]
    }
    ```

## Appointments

### Edit Appointment

Edits an Appointment Based on the Appointment's ID

- Require Authentication: true,
- Request
  - Method: PUT
  - URL: /api/appointments/:apptId
  - Headers
    - Content-Type: application/json
  - Body
    ```json
    {
      "start": "2023-09-19T15:00:00.000Z",
      "end": "2023-09-19T18:00:00.000Z",
      "task": "Description of the task",
      "taskerId": 1,
      "userId": 1,
      "categoryId": 1
    }
    ```

- Successful Response
  - Status Code: 201
  - Headers
    - Content-Type: application/json
  - Body
    ```json
    {
      "id": 1,
      "start": "2023-09-19T15:00:00.000Z",
      "end": "2023-09-19T18:00:00.000Z",
      "task": "Description of the task",
      "taskerId": 1,
      "userId": 1,
      "categoryId": 1
    }
    ```

### Delete Appointment

Allows a user to Delete an Appointment by ID

- Require Authentication: true
- Request
  - Method: DELETE
  - URL: /api/appointments/:apptID
  - Body: none

- Successful Response
  - Status Code: 200
  - Headers
    - Content-Type: application/json
  - Body
    ```json
    {
      "message": "Successfully Deleted"
    }
    ```

### Create Appointment

Allows User to Create a new Appointment and Returns the new Appointment

- Require Authentication: true
- Request
  - Method: POST
  - URL /api/appointments/
  - Headers
    - Content-Type: application/json
  - Body
    ```json
    {
      "start": "2023-10-19T15:00:00.000Z",
      "end": "2023-10-19T18:00:00.000Z",
      "task": "Description of the task",
      "taskerId": 18,
      "userId": 7,
      "categoryId": 14
    }
    ```

- Successful Response
  - Status Code: 201
  - Headers
    - Content-Type: application/json
  - Body
    ```json
    {
      "id": 23,
      "start": "2023-10-19T15:00:00.000Z",
      "end": "2023-10-19T18:00:00.000Z",
      "task": "Description of the task",
      "taskerId": 18,
      "userId": 7,
      "categoryId": 14
    }
    ```

## Categories

### Get all Categories

Returns all of the Categories and Their Subcategories

- Requires Authentication: false
- Request
  - Method: GET
  - URL: /api/categories
  - Body: None

- Successful Response
  - Status Code: 200
  - Headers
    - Content-Type: application/json
  - Body
    ```json
    [
      {
        "id": 1,
        "category": "Handyman",
        "about": "Hire a Tasker for help around the house",
        "url": "https://www.example.com/image12.png",
        "Subcategories": [
          {
            "id": 121,
            "subcategory": "Baby Proofing"
          }
        ]
      }
    ]
    ```

### Get Category by ID

Returns a Category by ID and Includes all Taskers Associated With That Category

- Requires Authentication: false
- Request
  - Method: GET
  - URL: /api/categories/:categoryId
  - Body: None

- Successful Response
  - Status Code: 200
  - Headers
    - Content-Type: application/json
  - Body
    ```json
    {
      "id": 1,
      "category": "Handyman",
      "about": "Hire a Tasker for help around the house",
      "url": "https://www.example.com/image12.png",
      "Subcategories": [
        {
          "id": 2,
          "subcategory": "Home Repair"
        }
      ],
      "Taskers": [
        {
          "id": 38,
          "firstName": "Itzel",
          "lastName": "Okuneva",
          "about": "About this tasker",
          "zipCode": "98692",
          "profileImage": "https://www.example.com/image8.png",
          "email": "Itzel3@hotmail.com",
          "phone": "9530448533",
          "TaskerCategories": {
            "rate": 30.18
          },
          "Reviews": [
            {
              "id": 76,
              "review": "Review text",
              "stars": 4,
              "date": "2023-07-22",
              "appointmentId": 226,
              "userId": 13,
              "taskerId": 38,
              "categoryId": 1
            }
          ],
          "Appointments": [
            {
              "id": 7,
              "start": "2023-11-20T02:00:00.000Z",
              "end": "2023-11-20T03:00:00.000Z",
              "task": "Task description",
              "taskerId": 38,
              "userId": 1,
              "categoryId": 1
            }
          ]
        }
      ]
    }
    ```

## Reviews

### Edit Review

Edits an Existing Review Based on That Review's ID

- Requires Authentication: true
- Request
  - Method: PUT
  - URL: /api/reviews/:reviewId
  - Headers
    - Content-Type: application/json
  - Body
    ```json
    {
      "review": "Review text",
      "stars": 3,
      "date": "2023-09-18",
      "appointmentId": 23,
      "userId": 14,
      "taskerId": 26,
      "categoryId": 7
    }
    ```
- Successful Response
  - Status Code: 201
  - Headers
    - Content-Type: application/json
  - Body
    ```json
    {
      "id": 33,
      "review": "Review text",
      "stars": 3,
      "date": "2023-09-18",
      "appointmentId": 23,
      "userId": 14,
      "taskerId": 26,
      "categoryId": 7
    }
    ```

### Delete Review

Deletes a Review Based on it's ID

- Require Authentication: true
- Request
  - Method: DELETE
  - URL: /api/reviews/:reviewId
  - Body: None

- Successful Response
  - Status Code: 200
  - Headers
    - Content-Type: application/json
  - Body
    ```json
    {
      "message": "Successfully Deleted"
    }
    ```

### Create Review

Creates a new Review and Returns That Review

- Require Authentication: true,
- Request
  - Method: POST
  - URL: /api/reviews
  - Headers
    - Content-Type: application/json
  - Body
    ```json
    {
      "review": "Review text",
      "stars": 4,
      "date": "2023-08-18",
      "appointmentId": 42,
      "userId": 4,
      "taskerId": 6,
      "categoryId": 10
    }
    ```

- Successful Response
  - Status Code: 201
  - Headers
    - Content-Type: application/json
  - Body
    ```json
    {
      "id": 83,
      "review": "Review text",
      "stars": 4,
      "date": "2023-08-18",
      "appointmentId": 42,
      "userId": 4,
      "taskerId": 6,
      "categoryId": 10
    }
    ```

## Payments

### Get User's Payment Methods

Returns all of the users saved payment methods.

- Requires Authentication: true
- Request
  - Method: GET
  - URL: /api/payments
  - Body: None

- Successful Response
  - Status Code: 200
  - Headers
    - Content-Type: application/json
  - Body
    ```json
    [
      {
        "id": 1,
        "cardNumber": "1234567890123456",
        "cardType": "visa",
        "cvv": "111",
        "expires": "08/2026",
        "userId": 1
      }
    ]
    ```

### Edit Payment

Edit a payment's information based on that payment's ID.

- Requires Authentication: true
- Request
  - Method: PUT
  - URL: /api/payments/:paymentId
  - Headers
    - Content-Type: application/json
  - Body
    ```json
    {
      "cardNumber": "567890123456789",
      "cardType": "mastercard",
      "cvv": "222",
      "expires": "09/2030",
      "userId": 1
    }
    ```
- Successful Response
  - Status Code: 201
  - Headers
    - Content-Type: application/json
  - Body
    ```json
    {
      "id": 21,
      "cardNumber": "567890123456789",
      "cardType": "mastercard",
      "cvv": "222",
      "expires": "09/2030",
      "userId": 1
    }
    ```

### Delete a Payment

Deletes a payment based on the payment's ID.

- Require Authentication: true
- Request
  - Method: DELETE
  - URL: /api/payments/:paymentId
  - Body: None

- Successful Response
  - Status Code: 200
  - Headers
    - Content-Type: application/json
  - Body
    ```json
    {
      "message": "Successfully Deleted"
    }
    ```

### Create a Payment

Creates a new payment method for the user.

- Requires Authentication: true
- Request
  - Method: POST
  - URL: /api/payments
  - Body
    ```json
    {
      "cardNumber": "7890123456789",
      "cardType": "american_express",
      "cvv": "333",
      "expires": "10/2030",
      "userId": 15
    }
    ```
- Successful Response
  - Status Code: 201
  - Headers
    - Content-Type: application/json
  - Body
    ```json
    {
      "id": 38,
      "cardNumber": "7890123456789",
      "cardType": "american_express",
      "cvv": "333",
      "expires": "10/2030",
      "userId": 15
    }
    ```

## Invoices

### Get all Invoices for a User

Returns all the invoices for a user

Requires Authentication: true
- Request
  - Method: GET
  - URL: /api/invoices
  - Body: none

- Successful Response
  - Status Code: 200
  - Headers
    - Content-Type: application/json
  - Body
    ```json
    [
      {
        "id": 5,
        "amountPaid": 0,
        "appointmentId": 5,
        "fees": 11.68,
        "fullPaid": false,
        "hours": 2,
        "rate": 35.38,
        "taskerId": 10,
        "totalDue": 82.44,
        "userId": 1,
        "Appointment": {
          "id": 5,
          "categoryId": 4,
          "end": "2022-11-05T18:00:00.000Z",
          "start": "2022-11-05T16:00:00.000Z",
          "task": "Description of the task",
          "taskerId": 10,
          "userId": 1
        }
      }
    ]
    ```

### Edit Invoice Paid Amount

Updates the paid amount for an invoice based on the invoice Id.

Requires Authentication: true
- Request
  - Method: PUT
  - URL: /api/invoices/:invoiceId
  - Headers
    - Content-Type: application/json
  - Body:
    ```json
    {
      "amountPaid": 24.63,
      "fullPaid": false
    }
    ```
- Successful Response
  - Status Code: 201
  - Headers
    - Content-Type: application/json
  - Body
    ```json
    {
      "id": 5,
      "amountPaid": 24.63,
      "appointmentId": 5,
      "fees": 11.68,
      "fullPaid": false,
      "hours": 2,
      "rate": 35.38,
      "taskerId": 10,
      "totalDue": 82.44,
      "userId": 1,
    }
    ```

### Create Invoice

Creates a new invoice

- Requires Authentication: true
- Request
  - Method: POST
  - URL: /api/invoices
  - Headers
    - Content-Type: application/json
  - Body
    ```json
    {
      "amountPaid": 0,
      "appointmentId": 11,
      "fees": 16.13,
      "fullPaid": false,
      "hours": 3,
      "rate": 53.76,
      "taskerId": 17,
      "totalDue": 177.41,
      "userId": 3,
    }
    ```

- Successful Response
  - Status Code: 201
  - Headers
    - Content-Type: application/json
  - Body
    ```json
    {
      "id": 23,
      "amountPaid": 0,
      "appointmentId": 11,
      "fees": 16.13,
      "fullPaid": false,
      "hours": 3,
      "rate": 53.76,
      "taskerId": 17,
      "totalDue": 177.41,
      "userId": 3,
    }
    ```

### Edit Invoice Hours and Total Due

Changes the duration (hours) of an appointment and total due based on the appointmentId.

- Requires Authentication: true
- Request
  - Method: PUT
  - URL: /api/invoices/appointment/:apptId
  - Headers
    - Content-Type: application/json
  - Body
    ```json
    {
      "hours": 2
    }
    ```

- Successful Response
  - Status Code: 201
  - Headers
    - Content-Type: application/json
  - Body
    ```json
    {
      "id": 23,
      "amountPaid": 0,
      "appointmentId": 11,
      "fees": 16.13,
      "fullPaid": false,
      "hours": 2,
      "rate": 53.76,
      "taskerId": 17,
      "totalDue": 123.65,
      "userId": 3,
    }
    ```
