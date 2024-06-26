# Blueprint Manager

## DB Diagram
![database schema design here!](/dbDiagram.png)

## USER AUTHENTICATION/AUTHORIZATION

### All endpoints that require authentication

All endpoints that require a current user to be logged in.

* Request: endpoints that require authentication
* Error Response: Require authentication
  * Status Code: 401
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Authentication required"
    }
    ```

### All endpoints that require proper authorization

All endpoints that require authentication and the current user does not have the
correct role(s) or permission(s).

* Request: endpoints that require proper authorization
* Error Response: Require proper authorization
  * Status Code: 403
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Forbidden"
    }
    ```

### Get the Current PM

Returns the information about the current Project Manager that is logged in.

* Require Authentication: true
* Request
  * Method: GET
  * URL: /api/pm/session
  * Body: none

* Successful Response when there is a logged in Project Manager
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "projectManager": {
        "id": 1,
        "firstName": "John",
        "lastName": "Smith",
        "email": "john.smith@gmail.com",
        "username": "JohnSmith"
      } 
    }
    ```

* Successful Response when there is no logged in Project Manager
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "projectManager": null
    }
    ```

### Log In a PM

Logs in a current Project Manager with valid credentials and returns the current Project Manager's
information.

* Require Authentication: false
* Request
  * Method: GET
  * URL: /api/pm/session
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "credential": "john.smith@gmail.com",
      "password": "secret password"
    }
    ```

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "projectManager": {
        "id": 1,
        "firstName": "John",
        "lastName": "Smith",
        "email": "john.smith@gmail.com",
        "username": "JohnSmith"
      } 
    }
    ```

* Error Response: Invalid credentials
  * Status Code: 401
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Invalid credentials"
    }
    ```

* Error response: Body validation errors
  * Status Code: 400
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Bad Request", 
      "errors": {
        "credential": "Email or username is required",
        "password": "Password is required"
      }
    }
    ```

### Sign Up a PM

Creates a new Project Manager, logs them in as the current Project Manager, and returns the current
Project Manager's information.

* Require Authentication: false
* Request
  * Method: POST
  * URL: /api/pms
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "firstName": "John",
      "lastName": "Smith",
      "email": "john.smith@gmail.com",
      "username": "JohnSmith",
      "password": "secret password"
    }
    ```

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "projectManager": {
        "id": 1,
        "firstName": "John",
        "lastName": "Smith",
        "email": "john.smith@gmail.com",
        "username": "JohnSmith",
        "companyName": "ACME",
        "industrySector": "Construction"
      }
    }
    ```

* Error response: User already exists with the specified email
  * Status Code: 500
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "User already exists",
      "errors": {
        "email": "User with that email already exists"
      }
    }
    ```

* Error response: User already exists with the specified username
  * Status Code: 500
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "User already exists",
      "errors": {
        "username": "User with that username already exists"
      }
    }
    ```

* Error response: Body validation errors
  * Status Code: 400
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Bad Request",
      "errors": {
        "email": "Invalid email",
        "username": "Username is required",
        "firstName": "First Name is required",
        "lastName": "Last Name is required",
        "companyName": "Name of the comapny is required",
        "industrySector": "Industry Sector is required",
        "password": "Password is required"
      }
    }


## Project

### Get All Active Projects

When PM clicks on the Active Projects button in the Home Page it should display a grid with all of the current active projects

* Require Authentication: true
* Request
  * Method: GET
  * URL: /api/projects/active
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "ActiveProjects": [
        {
          "id": 1,
          "projectName": "Roofing",
          "clientName": "Carlos Perez",
          "description": "Roofing needs to be replaced",
          "budget": 15000,
          "projectStaff": [
            {
                "firstName": "Jose",
                "lastName": "Perez",
                "hireDate": "04/03/2022",
                "picture": "imgurl",
                "role": "Supervisor",
                "salary": 70000
            },
            {
                "firstName": "Juan",
                "lastName": "Perez",
                "hireDate": "04/03/2022",
                "picture": "imgurl",
                "role": "Laborer",
                "salary": 50000
            }
          ],
          "projectImages": [
            {
                "id": 1,
                "url": "image url"
            },
            {
                "id": 2,
                "url": "image url"
            }
          ],
          "commencementDate": "04/04/2024",
          "completionDate": "04/10/2024"
        }
      ]
    }
    ```

### Get A Project by Id

Returns the details of a Project specified by its id.

* Require Authentication: true
* Request
  * Method: GET
  * URL: /api/projects/:projectId
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
        "id": 1,
        "projectName": "Roofing",
        "clientName": "Carlos Perez",
        "description": "Roofing needs to be replaced",
        "budget": 15000,
        "projectStaff": [
        {
            "firstName": "Jose",
            "lastName": "Perez",
            "hireDate": "04/03/2022",
            "picture": "imgurl",
            "role": "Supervisor",
            "salary": 70000
        },
        {
            "firstName": "Juan",
            "lastName": "Perez",
            "hireDate": "04/03/2022",
            "picture": "imgurl",
            "role": "Laborer",
            "salary": 50000
        }
        ],
        "projectImages": [
        {
            "id": 1,
            "url": "image url"
        },
        {
            "id": 2,
            "url": "image url"
        }
        ],
        "commencementDate": "04/04/2024",
        "completionDate": "04/10/2024"
    }
    ```

* Error response: Couldn't find a Project with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Project couldn't be found"
    }
    ```

### Create a Project

Creates and returns a new project.

* Require Authentication: true
* Request
  * Method: POST
  * URL: /api/active/projects
  * Headers:
    * Content-Type: application/json
  * Body:

  ```json
    {
        "id": 1,
        "projectName": "Roofing",
        "clientName": "Carlos Perez",
        "description": "Roofing needs to be replaced",
        "budget": 15000,
        "projectStaff": [
        {
            "firstName": "Jose",
            "lastName": "Perez",
            "picture": "imgurl",
            "hireDate": "04/03/2022",
            "role": "Supervisor",
            "salary": 70000
        },
        {
            "firstName": "Juan",
            "lastName": "Perez",
            "picture": "imgurl",
            "hireDate": "04/03/2022",
            "role": "Laborer",
            "salary": 50000
        }
        ],
        "projectImages": [
        {
            "id": 1,
            "url": "image url"
        },
        {
            "id": 2,
            "url": "image url"
        }
        ],
        "commencementDate": "04/04/2024",
        "completionDate": "04/10/2024"
    }
    ```

* Successful Response
  * Status Code: 201
  * Headers:
    * Content-Type: application/json
  * Body:
     ```json
    {
       "id": 1,
        "projectName": "Roofing",
        "clientName": "Carlos Perez",
        "description": "Roofing needs to be replaced",
        "budget": 15000,
         "projectStaff": [
        {
            "firstName": "Jose",
            "lastName": "Perez",
            "picture": "imgurl",
            "hireDate": "04/03/2022",
            "role": "Supervisor",
            "salary": 70000
        },
        {
            "firstName": "Juan",
            "lastName": "Perez",
            "picture": "imgurl",
            "hireDate": "04/03/2022",
            "role": "Laborer",
            "salary": 50000
        }
        ],
        "projectImages": [
        {
            "id": 1,
            "url": "image url"
        },
        {
            "id": 2,
            "url": "image url"
        }
        ],
        "commencementDate": "04/04/2024",
        "completionDate": "04/10/2024"
    }
    ```

* Error Response: Body validation error
  * Status Code: 400
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Bad Request", 
      "errors": {
        "projectName": "Project Name is required",
        "clientName": "Client Name is required",
        "description": "Description is required",
        "budget": "Budget is required",
        "projectStaff": "Staff is neccessary, unless you're doing the whole project by yourslef",
        "commencementDate": "Start Date Required",
        "completionDate": "Completion Date Required"
      }
    }
    ```

### Edit a Project

* Require Authentication: true
* Require proper authorization: Project must belong to the current PM and must be an active project
* Request
  * Method: PUT
  * URL: /api/projects/active/:projectId
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
       "id": 1,
        "projectName": "Roofing",
        "clientName": "Carlos Perez",
        "description": "Roofing needs to be replaced",
        "budget": 15000,
         "projectStaff": [
        {
            "firstName": "Jose",
            "lastName": "Perez",
            "picture": "imgurl",
            "hireDate": "04/03/2022",
            "role": "Supervisor",
            "salary": 70000
        },
        {
            "firstName": "Juan",
            "lastName": "Perez",
            "picture": "imgurl",
            "hireDate": "04/03/2022",
            "role": "Laborer",
            "salary": 50000
        }
        ],
        "projectImages": [
        {
            "id": 1,
            "url": "image url"
        },
        {
            "id": 2,
            "url": "image url"
        }
        ],
        "commencementDate": "04/04/2024",
        "completionDate": "04/10/2024"
    }
    ```

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

     ```json
    {
       "id": 1,
        "projectName": "Roofing",
        "clientName": "Carlos Perez",
        "description": "Roofing needs to be replaced",
        "budget": 15000,
         "projectStaff": [
        {
            "firstName": "Jose",
            "lastName": "Perez",
            "picture": "imgurl",
            "hireDate": "04/03/2022",
            "role": "Supervisor",
            "salary": 70000
        },
        {
            "firstName": "Juan",
            "lastName": "Perez",
            "picture": "imgurl",
            "hireDate": "04/03/2022",
            "role": "Laborer",
            "salary": 50000
        }
        ],
        "projectImages": [
        {
            "id": 1,
            "url": "image url"
        },
        {
            "id": 2,
            "url": "image url"
        }
        ],
        "commencementDate": "04/04/2024",
        "completionDate": "04/10/2024",
        "updatedAt": "04/06/2024"
    }
    ```

### Delete a Project

Deletes existing Project

* Require Authentication: true
* Require proper authorization: Project must belong to the current PM
* Request
  * Method: DELETE
  * URL: /api/projects/:projectId
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Project Successfully deleted"
    }
    ```

* Error response: Couldn't find a Project with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Project couldn't be found"
    }
    ```

## Employees
### Create new Employee

Creates and returns a new project.

* Require Authentication: true
* Request
  * Method: POST
  * URL: /api/employees
  * Headers:
    * Content-Type: application/json
  * Body:

  ```json
    {
      "firstName": "Jose",
      "lastName": "Perez",
      "picture": "imgurl",
      "hireDate": "04/03/2022",
      "role": "Supervisor",
      "salary": 70000
    }
    ```

* Successful Response
  * Status Code: 201
  * Headers:
    * Content-Type: application/json
  * Body:   
   ```json
    {
      "id": 1,
      "firstName": "Jose",
      "lastName": "Perez",
      "picture": "imgurl",
      "hireDate": "04/03/2022",
      "role": "Supervisor",
      "salary": 70000
    }
    ```

* Error Response: Body validation error
  * Status Code: 400
  * Headers:
    * Content-Type: application/json
  * Body:
   ```json
    {
      "firstName": "First Name is required",
      "lastName": "Last Name is required",
      "picture": "Picrure is required",
      "hireDate": "Date is required",
      "role": "Role is required",
      "salary": "salary is required"
    }
    ```

### Edit an Employee

* Require Authentication: true
* Require proper authorization: Employee must be part of the PM's project and the project must be active
* Request
  * Method: PUT
  * URL: /api/projects/active/:projectId/:employeeId
  * Headers:
    * Content-Type: application/json
  * Body:
   ```json
    {
      "id": 1,
      "firstName": "Jose",
      "lastName": "Perez",
      "picture": "imgurl",
      "hireDate": "04/03/2022",
      "role": "Supervisor",
      "salary": 70000,
      "updatedAt": "05/01/2024"
    }
    ```

### Delete an Employee

Removes Employee from existing Project

* Require Authentication: true
* Require proper authorization: Employee must be part of the PM's project and the project must be active
* Request
  * Method: DELETE
  * URL: /api/projects/:projectId/:employeeId
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Employee Removed from current project"
    }
    ```

* Error response: Couldn't find a Project with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Project couldn't be found"
    }
    ```# Blueprint-Manager

## Clients
### Get the Current Client

Returns the information about the current Client that is logged in.

* Require Authentication: true
* Request
  * Method: GET
  * URL: /api/client/session
  * Body: none

* Successful Response when there is a logged in Project Manager
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "client": {
        "id": 1,
        "firstName": "John",
        "lastName": "Smith",
        "currentProjectId": 1
      } 
    }
    ```

* Successful Response when there is no logged in Project Manager
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "projectManager": null
    }
    ```

### Log In a Client

Logs in a current Client with valid credentials and returns the current Client's
information.

* Require Authentication: false
* Request
  * Method: GET
  * URL: /api/client/session
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "credential": "john.smith@gmail.com",
      "password": "secret password"
    }
    ```

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "client": {
        "id": 1,
        "firstName": "John",
        "lastName": "Smith",
        "currentProjectId": 1
      } 
    }
    ```

* Error Response: Invalid credentials
  * Status Code: 401
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Invalid credentials"
    }
    ```

* Error response: Body validation errors
  * Status Code: 400
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Bad Request", 
      "errors": {
        "credential": "Email or username is required",
        "password": "Password is required"
      }
    }
    ```

### Sign Up a Client

Creates a new Client, logs them in as the current Client and returns the current
Client's information.

* Require Authentication: false
* Request
  * Method: POST
  * URL: /api/clients
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "firstName": "John",
      "lastName": "Smith",
      "email": "john.smith@gmail.com",
      "username": "JohnSmith",
      "password": "secret password"
    }
    ```

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
        "client": {
          "id": 1,
          "firstName": "John",
          "lastName": "Smith",
          "currentProjectId": 1
        } 
      }
    ```

* Error response: User already exists with the specified email
  * Status Code: 500
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "User already exists",
      "errors": {
        "email": "User with that email already exists"
      }
    }
    ```

* Error response: User already exists with the specified username
  * Status Code: 500
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "User already exists",
      "errors": {
        "username": "User with that username already exists"
      }
    }
    ```

* Error response: Body validation errors
  * Status Code: 400
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Bad Request",
      "errors": {
        "email": "Invalid email",
        "username": "Username is required",
        "firstName": "First Name is required",
        "lastName": "Last Name is required",
        "password": "Password is required"
      }
    }

## Messages
### Get The Messages By Project Id

Returns all the messages that belong to a project specified by id.

* Require Authentication: false
* Request
  * Method: GET
  * URL: /api/projects/:projectId/messages
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:
  ```json
  {
    "Messages" :[
      {
        "id": 1,
        "projectId": 1,
        "clientName": "John Smith",
        "projectManagerId": 1,
        "message": "Roof needs to be repaired",
      }
    ]
  }
  ```
* Error response: Couldn't find a Prpject with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Project couldn't be found"
    }
    ```

### User creates a message based on project's id
Create and return a new message for a project specified by id.

* Require Authentication: true
* Request
  * Method: POST
  * URL: /api/projects/:projectId/messages
  * Headers:
    * Content-Type: application/json
  * Body:
  ```json
     {
        "message": "Roof needs to be repaired"
      }
  ```

* Successful Response
  * Status Code: 201
  * Headers:
    * Content-Type: application/json
  * Body:
  ```json
  {
    "id": 1,
    "userId": 1,
    "projectId": 1,
    "projectManagerId": 1,
    "message": "Roof needs to be repaired",
    "createdAt": "2021-11-19 20:39:36",
    "updatedAt": "2021-11-19 20:39:36"
  }
  ```
* Error Response: Body validation errors
  * Status Code: 400
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Bad Request",
      "error": "Message text is required",
    }
    ```

* Error response: Couldn't find a Project with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Project couldn't be found"
    }
    ```
  
  ### Add an Image to a Message based on the Message's id

Create and return a new image for a Message specified by id.

* Require Authentication: true
* Require proper authorization: Message must belong to the current user
* Request
  * Method: POST
  * URL: /api/messages/:messageId/images
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "url": "image url"
    }
    ```

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "id": 1,
      "url": "image url"
    }
    ```

* Error response: Couldn't find a Message with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Message couldn't be found"
    }
    ```

* Error response: Cannot add any more images because there is a maximum of 10
  images per resource
  * Status Code: 403
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Maximum number of images for this resource was reached"
    }
    ```

### Edit a Message
Update and return an existing message.

* Require Authentication: true
* Require proper authorization: Message must belong to the current user
* Request
  * Method: PUT
  * URL: /api/messages/:messageId
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Great Job!"
    }
    ```

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
        "id": 1,
        "projectId": 1,
        "clientName": "John Smith",
        "projectManagerId": 1,
        "message": "Roof needs to be repaired",
        "reply": "Working on it"
      }
    ```

* Error Response: Body validation errors
  * Status Code: 400
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Bad Request", 
      "error": "Message text is required",
    }
    ```

* Error response: Couldn't find a Message with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Message couldn't be found"
    }
    ```

### Delete a Message

Delete an existing Message.

* Require Authentication: true
* Require proper authorization: Message must belong to the current user
* Request
  * Method: DELETE
  * URL: /api/messages/:messageId
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Successfully deleted"
    }
    ```

* Error response: Couldn't find a Message with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Message couldn't be found"
    }
    ```