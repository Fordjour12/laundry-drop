CREATE TABLE "Customer" (
  "CustomerID" SERIAL PRIMARY KEY,
  "FirstName" VARCHAR(50) NOT NULL,
  "LastName" VARCHAR(50) NOT NULL,
  "ContactNumber" VARCHAR(20),
  "Email" VARCHAR(100) UNIQUE NOT NULL,
  "Address" TEXT
);

CREATE TABLE "Order" (
  "OrderID" SERIAL PRIMARY KEY,
  "CustomerID" INT NOT NULL,
  "OrderDate" TIMESTAMP NOT NULL,
  "PickupDate" TIMESTAMP NOT NULL,
  "DeliveryDate" TIMESTAMP NOT NULL,
  "Status" VARCHAR(20) NOT NULL,
  "TotalAmount" DECIMAL(10,2) NOT NULL
);

CREATE TABLE "Item" (
  "ItemID" SERIAL PRIMARY KEY,
  "ItemType" VARCHAR(50) NOT NULL,
  "Description" TEXT,
  "Price" DECIMAL(10,2) NOT NULL
);

CREATE TABLE "OrderItem" (
  "OrderItemID" SERIAL PRIMARY KEY,
  "OrderID" INT NOT NULL,
  "ItemID" INT NOT NULL,
  "Quantity" INT NOT NULL,
  "Subtotal" DECIMAL(10,2) NOT NULL
);

CREATE TABLE "Employee" (
  "EmployeeID" SERIAL PRIMARY KEY,
  "FirstName" VARCHAR(50) NOT NULL,
  "LastName" VARCHAR(50) NOT NULL,
  "Position" VARCHAR(50) NOT NULL
);

CREATE TABLE "PickupDropOffLocation" (
  "LocationID" SERIAL PRIMARY KEY,
  "LocationName" VARCHAR(100) NOT NULL,
  "Address" TEXT NOT NULL,
  "ContactNumber" VARCHAR(20)
);

CREATE TABLE "Payment" (
  "PaymentID" SERIAL PRIMARY KEY,
  "OrderID" INT NOT NULL,
  "Amount" DECIMAL(10,2) NOT NULL,
  "PaymentDate" TIMESTAMP NOT NULL,
  "PaymentMethod" VARCHAR(50) NOT NULL
);

CREATE TABLE "Service" (
  "ServiceID" SERIAL PRIMARY KEY,
  "ServiceName" VARCHAR(50) NOT NULL,
  "Description" TEXT,
  "Price" DECIMAL(10,2) NOT NULL
);

CREATE TABLE "OrderService" (
  "OrderServiceID" SERIAL PRIMARY KEY,
  "OrderID" INT NOT NULL,
  "ServiceID" INT NOT NULL,
  "Quantity" INT NOT NULL,
  "Subtotal" DECIMAL(10,2) NOT NULL
);

CREATE TABLE "Review" (
  "ReviewID" SERIAL PRIMARY KEY,
  "CustomerID" INT NOT NULL,
  "OrderID" INT NOT NULL,
  "Rating" INT NOT NULL,
  "Comment" TEXT,
  "ReviewDate" TIMESTAMP NOT NULL
);

CREATE TABLE "Invoice" (
  "InvoiceID" SERIAL PRIMARY KEY,
  "OrderID" INT NOT NULL,
  "InvoiceDate" TIMESTAMP NOT NULL,
  "DueDate" TIMESTAMP NOT NULL,
  "Amount" DECIMAL(10,2) NOT NULL,
  "Status" VARCHAR(20) NOT NULL
);

CREATE TABLE "EmployeeTask" (
  "EmployeeTaskID" SERIAL PRIMARY KEY,
  "EmployeeID" INT NOT NULL,
  "OrderID" INT NOT NULL,
  "TaskDescription" TEXT NOT NULL,
  "TaskDate" TIMESTAMP NOT NULL
);

ALTER TABLE "Order" ADD FOREIGN KEY ("CustomerID") REFERENCES "Customer" ("CustomerID") ON DELETE CASCADE;

ALTER TABLE "OrderItem" ADD FOREIGN KEY ("OrderID") REFERENCES "Order" ("OrderID") ON DELETE CASCADE;

ALTER TABLE "OrderItem" ADD FOREIGN KEY ("ItemID") REFERENCES "Item" ("ItemID") ON DELETE CASCADE;

ALTER TABLE "Payment" ADD FOREIGN KEY ("OrderID") REFERENCES "Order" ("OrderID") ON DELETE CASCADE;

ALTER TABLE "OrderService" ADD FOREIGN KEY ("OrderID") REFERENCES "Order" ("OrderID") ON DELETE CASCADE;

ALTER TABLE "OrderService" ADD FOREIGN KEY ("ServiceID") REFERENCES "Service" ("ServiceID") ON DELETE CASCADE;

ALTER TABLE "Review" ADD FOREIGN KEY ("CustomerID") REFERENCES "Customer" ("CustomerID") ON DELETE CASCADE;

ALTER TABLE "Review" ADD FOREIGN KEY ("OrderID") REFERENCES "Order" ("OrderID") ON DELETE CASCADE;

ALTER TABLE "Invoice" ADD FOREIGN KEY ("OrderID") REFERENCES "Order" ("OrderID") ON DELETE CASCADE;

ALTER TABLE "EmployeeTask" ADD FOREIGN KEY ("EmployeeID") REFERENCES "Employee" ("EmployeeID") ON DELETE CASCADE;

ALTER TABLE "EmployeeTask" ADD FOREIGN KEY ("OrderID") REFERENCES "Order" ("OrderID") ON DELETE CASCADE;
