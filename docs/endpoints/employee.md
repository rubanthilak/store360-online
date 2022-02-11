# **/employees & /employees/:id**

## methods

- GET
  - /employees - return all the employees
  - /employees/:id - return a specific employee by passing employeeid
- POST
  - /employees - add a new employee to the database
- PATCH
  - /employees/:id - update specific employee details in the database using the object passed
- DELETE
  - /employees/:id - deactivate employee profile in the database by changing the employeeState to "Terminated"

# model

```json
{
  employeeid: {
    type: NUMBER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  employeeName: {
    type: STRING,
    allowNull: false
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

- **getEmployees**(sortingOrder:string, searchKeyword:string)

  - _sortingOrder_ = 'ASC' (or) 'DESC'
  - _searchKeyword_ (optional)

- **getEmployeeById**(id:string)
- **addEmployee**(obj:Object)
- **updateEmployee**(obj:Object)
- **deleteEmployee**(id:string)
