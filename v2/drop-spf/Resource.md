## Customer
- CustomerID (Primary Key)
- FirstName
- LastName
- ContactNumber
- Email
- Address

## Order
- OrderID (Primary Key)
- CustomerID (Foreign Key referencing Customer)
- OrderDate
- PickupDate
- DeliveryDate
- Status (e.g., received, in progress, completed)
- TotalAmount

## Item
- ItemID (Primary Key)
- ItemType (e.g., shirt, pants, bedsheet)
- Description
- Price

## OrderItem
- OrderItemID (Primary Key)
- OrderID (Foreign Key referencing Order)
- ItemID (Foreign Key referencing Item)
- Quantity
- Subtotal

## Employee
- EmployeeID (Primary Key)
- FirstName
- LastName
- Position (e.g., washer, delivery personnel)

## PickupDropoffLocation
- LocationID (Primary Key)
- LocationName
- Address
- ContactNumber

## Payment
- PaymentID (Primary Key)
- OrderID (Foreign Key referencing Order)
- Amount
- PaymentDate
- PaymentMethod
