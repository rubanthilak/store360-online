//Enum 
Enum enum_state {
  active
  verified
  deactive
}

//Table
Table users {
  id int [pk, increment] // auto-increment
  username varchar [not null]
  state_id int [not null]
  email varchar [not null]
  phone varchar [not null]
  password varchar [not null]
  created_at timestamp [default:`CURRENT_TIMESTAMP`, not null]
  updated_at timestamp 
}

Table states {
  id int [pk, increment]
  state_name enum_state [not null]
  created_at timestamp [default:`CURRENT_TIMESTAMP`, not null]
  updated_at timestamp 
}

Table employees {
  id int [pk, increment] // auto-increment
  employee_name varchar [not null]
  employee_group_id int [not null]
  reporting_to int 
  state_id int [not null]
  email varchar [not null]
  phone varchar [not null]
  password varchar [not null]
  created_at timestamp [default:`CURRENT_TIMESTAMP`, not null]
  updated_at timestamp 
}

Table employee_groups{
  id int [pk, increment]
  group_name varchar [not null] // [admin, employee, manager]
  created_at timestamp [default:`CURRENT_TIMESTAMP`, not null]
  updated_at timestamp 
}

Table models {
  id int [pk, increment]
  model_name varchar [not null] // [product, orders, customers(users), employee, employee_group]
  description varchar
  created_at timestamp [default:`CURRENT_TIMESTAMP`, not null]
  updated_at timestamp 
}

Table permissions{
  id int [pk, increment]
  employee_group_id int [not null]
  model_id int [not null]
  read_permission boolean [not null]
  create_permission boolean [not null]
  update_permission boolean [not null]
  delete_permission boolean [not null]
  created_at timestamp [default:`CURRENT_TIMESTAMP`, not null]
  updated_at timestamp 
}

Table user_address{
  id int [pk,increment]
  userid int [not null]
  address_line1 varchar [not null]
  address_line2 varchar 
  city varchar [not null]
  postal_code varchar [not null]
  country varchar [not null]
  contact varchar [not null]
  created_at timestamp [default:`CURRENT_TIMESTAMP`, not null]
  updated_at timestamp 
}

Table user_payments{
  id int [pk, increment]
  userid int [not null]
  payment_type varchar [not null]
  provider varchar [not null]
  account_no varchar [not null, note:'Both Bank/Paypal Account Number & Credit/Debit Card Number'] 
  expiry date [note:'Only in case of Card Payment']
  created_at timestamp [default:`CURRENT_TIMESTAMP`, not null]
  updated_at timestamp 
}


Table products{
  id int [pk, increment]
  product_name varchar [not null]
  product_image_url varchar
  product_selling_price float [not null]
  product_buying_price float
  product_mrp_price float [not null]
  product_tax_percent float [not null]
  product_hsc_code varchar
  product_barcode varchar
  product_brand varchar
  inventory_id int [not null]
  discount_id int
  is_featured boolean
  is_active boolean
  created_by int [note: 'employee_id of the employee who created the product', not null]
  last_modified_by int [note: 'employee_id of the employee who last updated/deleted the product']
  created_at timestamp [default:`CURRENT_TIMESTAMP`, not null]
  updated_at timestamp 
  deleted_at timestamp [note: 'Instead of deleting the product, we just update this field']
}

Table category{
  id int [pk, increment]
  name varchar [not null]
  description varchar
  created_at timestamp [default:`CURRENT_TIMESTAMP`, not null]
  updated_at timestamp 
  deleted_at timestamp [note: 'Instead of deleting, we just update this field']
}

Table category_subcategory {
  id int [pk, increment]
  parent_category_id int [not null]
  child_category_id int
}

Table product_inventory{
  id int [pk, increment]
  quantity int [not null]
  created_at timestamp [default:`CURRENT_TIMESTAMP`, not null]
  updated_at timestamp 
  deleted_at timestamp [note: 'Instead of deleting, we just update this field']
}

Table discount{
  id int [pk, increment]
  name varchar [not null]
  desc varchar
  discount_percent float [not null]
  active boolean [not null]
  created_at timestamp [default:`CURRENT_TIMESTAMP`, not null]
  updated_at timestamp 
  deleted_at timestamp [note: 'Instead of deleting, we just update this field']
}

Table category_product_relations{
  id int [pk, increment]
  category_id int [not null]
  product_id int [not null]
  created_at timestamp [default:`CURRENT_TIMESTAMP`, not null]
  updated_at timestamp 
  deleted_at timestamp [note: 'Instead of deleting, we just update this field']
}

Table cart_items {
  id int [pk, increment]
  user_id int [not null]
  product_id int [not null]
  quantity int [not null]
  created_at timestamp [default:`CURRENT_TIMESTAMP`, not null]
  updated_at timestamp 
}

Table order_details {
  id int [pk, increment]
  payment_id int [not null]
  user_id int [not null]
  billing_address_id int [not null]
  delivery_address_id int [not null]
  billed_by int 
  bill_modified_by int 
  total float [not null]
  status varchar [note: 'delivered, ordered, returned, canceled, dispatched , Payment failed', not null]
  tracking_id int
  created_at timestamp [default:`CURRENT_TIMESTAMP`, not null]
  updated_at timestamp 
}

Table order_items{
  id int [pk, increment]
  order_id int [not null]
  product_id int [not null]
  quantity int [not null]
  created_at timestamp [default:`CURRENT_TIMESTAMP`, not null]
  updated_at timestamp 
}

Table payment_details{
  id int [pk, increment]
  order_id int [not null]
  amount float [not null]
  status varchar [not null]
  razorpayOrderCreationId varchar
  razorpayPaymentId varchar
  razorpayOrderId varchar
  razorpaySignature varchar
  created_at timestamp [default:`CURRENT_TIMESTAMP`, not null]
  updated_at timestamp 
}

Table tracking_details{
  id int [pk, increment]
  carrier_name varchar [not null]
  carrier_tracking_id varchar [not null]
  created_at timestamp [default:`CURRENT_TIMESTAMP`, not null]
  updated_at timestamp 
}

// Table Relationship

// > many-to-one
// < one-to-many
// - one-to-one

Ref: users.state_id > states.id

Ref: employees.state_id > states.id

Ref: user_address.userid > users.id

Ref: users.id < user_payments.id

Ref: employees.employee_group_id > employee_groups.id

Ref: employee_groups.id < permissions.employee_group_id

Ref: models.id < permissions.model_id

Ref: products.id < category_product_relations.product_id

Ref: category.id < category_product_relations.product_id

Ref: category.id < category_subcategory.parent_category_id

Ref: employees.id < products.created_by

Ref: employees.id < products.last_modified_by

Ref: products.inventory_id - product_inventory.id

Ref: products.discount_id > discount.id

Ref: cart_items.user_id > users.id

Ref: cart_items.product_id > products.id

Ref: order_details.user_id > users.id

Ref: order_details.billing_address_id > user_address.id

Ref: order_details.delivery_address_id > user_address.id

Ref: order_details.billed_by > employees.id

Ref: order_details.bill_modified_by > employees.id

Ref: order_items.order_id > order_details.id

Ref: order_items.product_id > products.id

Ref: order_details.payment_id < payment_details.id

Ref: order_details.tracking_id - tracking_details.id
