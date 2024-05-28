-- Creating the Customer table
CREATE TABLE Customer (
    CustomerID SERIAL PRIMARY KEY,
    FirstName VARCHAR(50) NOT NULL,
    LastName VARCHAR(50) NOT NULL,
    ContactNumber VARCHAR(20),
    Email VARCHAR(100) UNIQUE NOT NULL,
    Address TEXT
);

-- Creating the Order table
CREATE TABLE "Order" (
    OrderID SERIAL PRIMARY KEY,
    CustomerID INT NOT NULL,
    OrderDate TIMESTAMP NOT NULL,
    PickupDate TIMESTAMP NOT NULL,
    DeliveryDate TIMESTAMP NOT NULL,
    Status VARCHAR(20) NOT NULL CHECK (Status IN ('received', 'in progress', 'completed')),
    TotalAmount DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (CustomerID) REFERENCES Customer(CustomerID) ON DELETE CASCADE
);

-- Creating the Item table
CREATE TABLE Item (
    ItemID SERIAL PRIMARY KEY,
    ItemType VARCHAR(50) NOT NULL,
    Description TEXT,
    Price DECIMAL(10, 2) NOT NULL
);

-- Creating the OrderItem table
CREATE TABLE OrderItem (
    OrderItemID SERIAL PRIMARY KEY,
    OrderID INT NOT NULL,
    ItemID INT NOT NULL,
    Quantity INT NOT NULL,
    Subtotal DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (OrderID) REFERENCES "Order"(OrderID) ON DELETE CASCADE,
    FOREIGN KEY (ItemID) REFERENCES Item(ItemID) ON DELETE CASCADE
);

-- Creating the Employee table
CREATE TABLE Employee (
    EmployeeID SERIAL PRIMARY KEY,
    FirstName VARCHAR(50) NOT NULL,
    LastName VARCHAR(50) NOT NULL,
    Position VARCHAR(50) NOT NULL CHECK (Position IN ('washer', 'delivery personnel'))
);

-- Creating the PickupDropoffLocation table
CREATE TABLE PickupDropoffLocation (
    LocationID SERIAL PRIMARY KEY,
    LocationName VARCHAR(100) NOT NULL,
    Address TEXT NOT NULL,
    ContactNumber VARCHAR(20)
);

-- Creating the Payment table
CREATE TABLE Payment (
    PaymentID SERIAL PRIMARY KEY,
    OrderID INT NOT NULL,
    Amount DECIMAL(10, 2) NOT NULL,
    PaymentDate TIMESTAMP NOT NULL,
    PaymentMethod VARCHAR(50) NOT NULL,
    FOREIGN KEY (OrderID) REFERENCES "Order"(OrderID) ON DELETE CASCADE
);

-- Creating the Service table
CREATE TABLE Service (
    ServiceID SERIAL PRIMARY KEY,
    ServiceName VARCHAR(50) NOT NULL,
    Description TEXT,
    Price DECIMAL(10, 2) NOT NULL
);

-- Creating the OrderService table
CREATE TABLE OrderService (
    OrderServiceID SERIAL PRIMARY KEY,
    OrderID INT NOT NULL,
    ServiceID INT NOT NULL,
    Quantity INT NOT NULL,
    Subtotal DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (OrderID) REFERENCES "Order"(OrderID) ON DELETE CASCADE,
    FOREIGN KEY (ServiceID) REFERENCES Service(ServiceID) ON DELETE CASCADE
);

-- Creating the Review table
CREATE TABLE Review (
    ReviewID SERIAL PRIMARY KEY,
    CustomerID INT NOT NULL,
    OrderID INT NOT NULL,
    Rating INT NOT NULL CHECK (Rating BETWEEN 1 AND 5),
    Comment TEXT,
    ReviewDate TIMESTAMP NOT NULL,
    FOREIGN KEY (CustomerID) REFERENCES Customer(CustomerID) ON DELETE CASCADE,
    FOREIGN KEY (OrderID) REFERENCES "Order"(OrderID) ON DELETE CASCADE
);

-- Creating the Invoice table
CREATE TABLE Invoice (
    InvoiceID SERIAL PRIMARY KEY,
    OrderID INT NOT NULL,
    InvoiceDate TIMESTAMP NOT NULL,
    DueDate TIMESTAMP NOT NULL,
    Amount DECIMAL(10, 2) NOT NULL,
    Status VARCHAR(20) NOT NULL CHECK (Status IN ('pending', 'paid', 'overdue')),
    FOREIGN KEY (OrderID) REFERENCES "Order"(OrderID) ON DELETE CASCADE
);

-- Creating the EmployeeTask table
CREATE TABLE EmployeeTask (
    EmployeeTaskID SERIAL PRIMARY KEY,
    EmployeeID INT NOT NULL,
    OrderID INT NOT NULL,
    TaskDescription TEXT NOT NULL,
    TaskDate TIMESTAMP NOT NULL,
    FOREIGN KEY (EmployeeID) REFERENCES Employee(EmployeeID) ON DELETE CASCADE,
    FOREIGN KEY (OrderID) REFERENCES "Order"(OrderID) ON DELETE CASCADE
);

