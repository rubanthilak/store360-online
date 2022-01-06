# **/products , /products/bulk & /products/:id**

## methods

- GET 
- POST
- PATCH
- DELETE

# model
```json
{
  productId: {
    type: STRING,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  productName: {
    type: STRING,
    allowNull: false
  },
  productImageUrl: {
    type: STRING,
    allowNull: false
  },
  productHscNumber: {
    type: NUMBER,
    allowNull: true
  },
  productBaseUnit: {
    type: STRING,
    allowNull: true
  },
  productSecondaryUnit: {
    type: STRING,
    allowNull: true
  },
  productUnitRatio: {
    type: NUMBER,
    allowNull: true
  },
  productStock: {
    type: NUMBER,
    allowNull: false
  },
  productTaxPercentage: {
    type: FLOAT,
    allowNull: false
  },
  productBuyingPrice: {
    type: FLOAT,
    allowNull: true,
  },
  productMrpPrice: {
    type: FLOAT,
    allowNull: false,
  },
  productSellingPrice: {
    type: FLOAT,
    allowNull: false
  },
  productSecondaryUnitPrice: {
    type: FLOAT,
    allowNull: true
  },
   productDiscount: {
    type: FLOAT,
    allowNull: false
  },
  productBarcode: {
    type: NUMBER,
    allowNull: true
  },
  productArchived: {
    type: BOOLEAN,
    defaultValue: false,
    allowNull: true
  },
  productFeatured:{
    type: BOOLEAN,
    defaultValue: false,
    allowNull: false
  }
}
```
  
## functions

- **getProducts**(sortingOrder:string, priceRange:Object, searchKeyword:string)

  - *priceRange* = {
      minPrice : float,
      maxPrice : float
    }
  - *sortingOrder* = 'ASC' (or) 'DESC'
  - *searchKeyword* (optional)
  
- **getProductById**(id:string)
- **addProduct**(obj:Object)
- **addProductsInBulk**(arr:ArrayOfObjects)
- **updateProduct**(obj:Object)
- **updateProductInBulk**(arr:ArrayOfObjects)
- **deleteProduct**(id:string)
