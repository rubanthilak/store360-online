# **/users & /users/:id**

## methods

- GET
  - /users - return all the users
  - /users/:id - return a specific user by passing userid
- POST
  - /users - add a new user to the database
- PATCH
  - /users/:id - update specific user details in the database using the object passed
- DELETE
  - /users/:id - deactivate user profile in the database by changing the userState to "Terminated"

# model

```json
{
  userid: {
    type: NUMBER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  userName: {
    type: STRING,
    allowNull: false
  },
  userState: {
    type: STRING - [Active , Verified, Terminated],
    allowNull: false,
    defaultValue: "Active"
  },
  email: {
    type: STRING,
    allowNull: false
  },
  phone: {
    type: STRING,
    allowNull: false
  },
  password: {
    type: STRING (Encrypted),
    allowNull: false
  },
}
```

## functions

- **getUsers**(sortingOrder:string, searchKeyword:string)

  - _sortingOrder_ = 'ASC' (or) 'DESC'
  - _searchKeyword_ (optional)

- **getUserById**(id:string)
- **addUser**(obj:Object)
- **updateUser**(obj:Object)
- **deleteUser**(id:string)
