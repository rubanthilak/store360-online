# **/account**

## methods

- GET
  - /account - return a account details
- PUT
  - /account - update account details in the database using the object passed


# model

```json
{
  accountid: {
    type: NUMBER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  accountName: {
    type: STRING,
    allowNull: false
  },
  accountEmail: {
    type: STRING,
    allowNull: false
  },
  accountPhone: {
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
- **getAccountDetails**()
- **updateAccount**(obj:Object)

