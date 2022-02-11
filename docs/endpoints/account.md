# **/account**

## description
We will create the account manually, by entering the account details in the mysql database as query. Client will be able to login and update his/her profile (or) account details.
## methods

- GET
  - /account - return a account details
- PUT
  - /account - checks the token & updates the account details in the database using the object passed
- POST
  - /account - this will act as login endpoint for the account
  - Also create similar endpoints /account/forgotpassword & /account/resetpassword.



## functions
- **getAccountDetails**()
- **updateAccountDetails**(obj:Object)



# model

```json
{
  accountId: {
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